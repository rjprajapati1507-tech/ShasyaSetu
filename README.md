# ShasyaSetu

ShasyaSetu is an MVP for agricultural market decision support. Given a crop, quantity, and origin, it predicts a baseline selling price for matching markets, subtracts sample transport and handling costs, and recommends the market with the highest expected net realisation.

## MVP scope

`Farmer input → sample market data → baseline price prediction → transport cost → net realisation → market ranking → recommendation`

This is a prototype only. It does not provide live market data, buyer matching, quality testing, storage availability, logistics coordination, transaction tracking, payment processing, or guarantees about price accuracy.

## Architecture

```
backend/app/api       HTTP request and response layer
backend/app/services  recommendation business logic
backend/app/ml        baseline training and model loading
backend/app/data      sample data access
backend/data          clearly labelled sample market CSV
```

## Demo data

All values in `backend/data/sample_market_data.csv` are fictional, sample records. They are included solely to demonstrate the workflow and must be replaced by a validated source before operational use. See [data-sources.md](data-sources.md) for the required fields and integration boundaries.

## Setup and run

### Backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
```

The API is available at `http://127.0.0.1:8000`; interactive documentation is at `/docs`.

### Frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). The Farmer Dashboard sends its form input to the backend and renders the response; it does not reproduce price or ranking calculations in the browser.

During local development, Vite proxies `/api` requests to `http://127.0.0.1:8000`, avoiding browser CORS issues. To change that target, copy `frontend/.env.example` to `frontend/.env.local` and set `VITE_API_PROXY_TARGET`. For a separately hosted API, set `VITE_API_BASE_URL` to its public base URL; then set the backend `CORS_ORIGINS` environment variable to a comma-separated allowlist of the frontend origin.

Example:

```powershell
Invoke-RestMethod -Method Post http://127.0.0.1:8000/api/v1/recommendations `
  -ContentType 'application/json' `
  -Body '{"crop":"Tomato","quantity_kg":500,"location":"Nashik"}'
```

## How it works

The model uses a time-ordered train/test split (the newest 20% of sample observations are held out) and reports MAE and RMSE when trained. Its prediction is a baseline estimate, not a production forecast.

For each matching market:

`expected net realisation per kg = expected selling price per kg − transport cost per kg − handling cost per kg`

The API ranks markets by this computed amount and selects the first-ranked market. Total net realisation is the per-kg amount multiplied by the submitted quantity.

## Tests

```powershell
pytest
```

For the frontend, run `npm run build` from `frontend`.

## Demo workflow

1. Start the backend and frontend.
2. Enter a crop, quantity, and location (the demo defaults are Tomato, 500 kg, and Nashik).
3. Select **Get Recommendation**.
4. Review the recommended market, per-kg calculation, and ranked market comparison.

The dashboard always identifies the current dataset as sample/mock data rather than live market information.

## Current limitations and future modules

The sample dataset is small and fictional, so model metrics are illustrative only. Future work can introduce validated mandi/APMC data feeds, quality signals from authorised assaying sources, storage options, and logistics coordination as separately integrated factors. Buyer matching, payments, storage booking, grievance handling, and advanced logistics are outside this MVP.
