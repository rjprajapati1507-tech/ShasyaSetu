import argparse, csv, json, re, time
from pathlib import Path
from typing import Any
import requests

API_URL = "https://api.agmarknet.gov.in/v1/price-trend/wholesale-prices-weekly"
HEADERS = {
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://agmarknet.gov.in",
    "Referer": "https://agmarknet.gov.in/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36",
}

MONTHS = {1:"jan",2:"feb",3:"mar",4:"apr",5:"may",6:"jun",7:"jul",8:"aug",9:"sep",10:"oct",11:"nov",12:"dec"}

def norm(x): return re.sub(r"[^a-z0-9]", "", str(x).lower())

def number(x):
    if x is None: return None
    s = str(x).strip().replace(",", "").replace("₹", "").replace("%", "")
    if not s or s.lower() in {"na","n/a","null","none","-","--","nan"}: return None
    m = re.search(r"-?\d+(?:\.\d+)?", s)
    return float(m.group()) if m else None

def rows_from_json(obj):
    found = []
    def walk(x):
        if isinstance(x, list):
            r = [v for v in x if isinstance(v, dict)]
            if r: found.append(r)
            for v in x: walk(v)
        elif isinstance(x, dict):
            for v in x.values(): walk(v)
    walk(obj)
    return max(found, key=len) if found else []

def market_key(rows):
    for r in rows:
        for k in r:
            n = norm(k)
            if n in {"market","marketname","apmc","apmcname"} or "marketname" in n or "apmcname" in n:
                return k
    return None

def price_keys(rows):
    keys=[]
    for r in rows:
        for k in r:
            if k not in keys and "price" in norm(k): keys.append(k)
    return keys

def detect_price_columns(rows, year, month):
    keys = price_keys(rows)
    return (
        keys[0] if len(keys) > 0 else None,
        keys[1] if len(keys) > 1 else None,
        keys[2] if len(keys) > 2 else None,
        keys[3] if len(keys) > 3 else None,
    )

def change_keys(rows):
    out=[None,None,None]
    for r in rows:
        for k in r:
            n=norm(k)
            if "change" not in n: continue
            if "previousweek" in n or "overpreviousweek" in n: out[0]=k
            elif "previousmonth" in n or "overpreviousmonth" in n: out[1]=k
            elif "previousyear" in n or "overpreviousyear" in n: out[2]=k
    return out

def get_week(session, args, month, week):
    p={"report_mode":"Marketwise","commodity":args.commodity,"year":args.year,
       "month":month,"week":week,"state":args.state,"district":args.district,"export":"false"}
    for attempt in range(3):
        try:
            r=session.get(API_URL,params=p,timeout=30)
            if r.status_code in (404,204): return None
            r.raise_for_status()
            return r.json()
        except (requests.RequestException,ValueError) as e:
            if attempt==2:
                print(f"  FAILED {month:02d}-W{week}: {e}")
                return None
            time.sleep(2*(attempt+1))

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--commodity",type=int,default=23)
    ap.add_argument("--year",type=int,default=2025)
    ap.add_argument("--state",type=int,default=20)
    ap.add_argument("--district",type=int,default=361)
    ap.add_argument("--output",default="data/agmarknet_onion_nashik_2025_weekly.csv")
    ap.add_argument("--raw-dir",default="data/agmarknet_raw_2025")
    a=ap.parse_args()
    out=Path(a.output); raw=Path(a.raw_dir)
    out.parent.mkdir(parents=True,exist_ok=True); raw.mkdir(parents=True,exist_ok=True)
    s=requests.Session(); s.headers.update(HEADERS)
    all_rows=[]; success=[]
    for month in range(1,13):
        for week in range(1,6):
            print(f"Requesting {a.year}-{month:02d}, Week {week}...")
            payload=get_week(s,a,month,week)
            if payload is None:
                print("  no data")
                continue
            (raw/f"{a.year}_{month:02d}_week{week}.json").write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")
            rows=rows_from_json(payload)
            if not rows:
                print("  no rows detected"); continue
            mk=market_key(rows); cp,pw,pm,py=detect_price_columns(rows,a.year,month); ck=change_keys(rows)
            print(f"  price columns: current={cp!r}, previous_week={pw!r}, previous_month={pm!r}, previous_year={py!r}")
            if not mk:
                print("  market column not detected; raw JSON retained"); continue
            for r in rows:
                market=r.get(mk)
                if market is None or str(market).strip()=="": continue
                all_rows.append({
                    "year":a.year,"month":month,"week":week,"commodity_id":a.commodity,
                    "state_id":a.state,"district_id":a.district,"market":str(market).strip(),
                    "current_price_rs_per_quintal":number(r.get(cp)) if cp else None,
                    "previous_week_price_rs_per_quintal":number(r.get(pw)) if pw else None,
                    "previous_month_price_rs_per_quintal":number(r.get(pm)) if pm else None,
                    "previous_year_price_rs_per_quintal":number(r.get(py)) if py else None,
                    "change_previous_week":number(r.get(ck[0])) if ck[0] else None,
                    "change_previous_month":number(r.get(ck[1])) if ck[1] else None,
                    "change_previous_year":number(r.get(ck[2])) if ck[2] else None})
            success.append(f"{month:02d}-W{week}")
            time.sleep(.5)
    if not all_rows: raise SystemExit("No rows collected.")
    with out.open("w",newline="",encoding="utf-8-sig") as f:
        w=csv.DictWriter(f,fieldnames=list(all_rows[0])); w.writeheader(); w.writerows(all_rows)
    meta=out.with_suffix(".metadata.json")
    meta.write_text(json.dumps({"source":"AGMARKNET","api_endpoint":API_URL,
        "commodity_id":a.commodity,"state_id":a.state,"district_id":a.district,"year":a.year,
        "reports_with_rows":len(success),"successful_week_slots":success,"row_count":len(all_rows),
        "price_unit":"Rs per quintal"},indent=2),encoding="utf-8")
    print(f"\nDONE: {len(all_rows)} rows")
    print(f"CSV: {out}")
    print(f"Metadata: {meta}")
    print(f"Raw JSON: {raw}")

if __name__=="__main__": main()
