# Data sources and integration notes

## Current status

`backend/data/sample_market_data.csv` is entirely **sample/mock data**. It is not live market data and must not be presented as such to users.

## Required market fields

- `market_name`
- `crop`
- `location`
- `date` (ISO-8601)
- `price_per_kg`
- `arrival_kg` (optional)
- `transport_cost_per_kg` (or the route data needed to calculate it)
- `handling_cost_per_kg` (optional; defaults to zero in this prototype)

## Future integrations

Validated mandi/APMC or FPO datasets can replace the CSV through the data layer. Transport providers, warehouses, and assaying systems are future integrations; none are connected by this MVP. Credentials for any future integrations must be supplied through environment variables, never source code or committed `.env` files.

## Limitations

The demonstration dataset has limited markets, crops, locations, and dates. It cannot establish real demand, price accuracy, quality grades, availability, or actual transport and storage capacity.

