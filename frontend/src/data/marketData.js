// Single source of truth for the sample markets/origin used across the demo UI.
// These values are mirrored EXACTLY from backend/data/sample_market_data.csv
// (market_name / location columns) — do not invent names that aren't in that file.
//
// Lots created through Price Intelligence never use this file: they carry the
// market name returned directly by POST /api/v1/recommendations. This constant
// is only used to give the small number of pre-seeded demo lots (created before
// any recommendation was ever requested) a location that is still consistent
// with the real sample dataset, instead of an unrelated hardcoded place.

export const SAMPLE_ORIGIN = 'Nashik';

export const SAMPLE_MARKETS = ['Mumbai APMC', 'Pune APMC', 'Nagpur APMC'];
