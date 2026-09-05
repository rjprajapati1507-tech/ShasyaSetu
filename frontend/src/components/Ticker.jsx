import { TICKER_CROPS } from '../data/mockData';

export default function Ticker() {
  const items = [];
  TICKER_CROPS.forEach((crop) => {
    crop.mandis.forEach((m) => {
      const up = m.trend >= 0;
      items.push(
        <span key={`${crop.name}-${m.name}`}>
          {crop.name} · {m.name}: <b>₹{m.price.toLocaleString('en-IN')}</b>{' '}
          <span className={up ? 'tick-up' : 'tick-down'}>{up ? '▲' : '▼'} {Math.abs(m.trend)}%</span>
        </span>
      );
    });
  });
  return (
    <div className="ticker-wrap">
      <div className="ticker">{items}{items}</div>
    </div>
  );
}
