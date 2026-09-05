// Demo/mock data for the parts of MandiSetu that don't have a real backend yet
// (lots, offers, orders, buyers). None of this is persisted or served by an API —
// it lives only in React state for the duration of the session, exactly like the
// original HTML prototype it was ported from.

import { SAMPLE_ORIGIN, SAMPLE_MARKETS } from './marketData';

// Ticker + legacy "price intelligence"-style mock rows — kept only for the
// scrolling ticker strip, which is decorative and out of scope for the real
// ShasyaSetu integration. Clearly not live data (see the ticker's own styling).
export const TICKER_CROPS = [
  { name: 'Wheat', mandis: [
      { name: 'Rajkot Mandi', price: 2340, trend: 1.8 },
      { name: 'Gondal Mandi', price: 2290, trend: -0.5 },
      { name: 'Ahmedabad Mandi', price: 2410, trend: 2.4 } ] },
  { name: 'Cotton', mandis: [
      { name: 'Rajkot Mandi', price: 7150, trend: 0.9 },
      { name: 'Junagadh Mandi', price: 7080, trend: -1.2 },
      { name: 'Jamnagar Mandi', price: 7220, trend: 1.5 } ] },
  { name: 'Groundnut', mandis: [
      { name: 'Rajkot Mandi', price: 6420, trend: 3.1 },
      { name: 'Gondal Mandi', price: 6510, trend: 1.0 } ] },
  { name: 'Tomato', mandis: [
      { name: 'Mumbai APMC', price: 2858, trend: 5.2 },
      { name: 'Pune APMC', price: 2564, trend: 4.4 } ] },
];

export const BUYERS = [
  { id: 'b1', name: 'AgroFresh Processors Pvt Ltd', gst: '24AAAAP1234B1Z5', rating: 4.6, verified: true },
  { id: 'b2', name: 'National Grain Traders', gst: '24BBBGT5678C1Z2', rating: 4.2, verified: true },
  { id: 'b3', name: 'FreshHarvest Exports', gst: '24CCCFE9012D1Z8', rating: 4.8, verified: true },
];

export const CURRENT_BUYER = BUYERS[0];

export const STATUS_STEPS = ['Escrow funded', 'Picked up', 'In transit', 'Delivered', 'Payment released'];

let lotSeq = 100;
export function nextLotId() {
  lotSeq += 1;
  return `L${lotSeq}`;
}

let orderSeqValue = 400;
export function nextOrderId() {
  orderSeqValue += 1;
  return `ORD${orderSeqValue}`;
}

function makeSampleLot(crop, qty, price, grade, market) {
  return {
    id: nextLotId(),
    crop,
    qty,
    unit: 'quintal',
    price,
    grade,
    status: 'Listed',
    fpo: 'Saurashtra Farmers FPO',
    originLocation: SAMPLE_ORIGIN,
    market,
    isSample: true,
    priceIntel: null,
    offers: [],
    order: null,
    created: new Date(),
  };
}

// Pre-seeded demo lots shown before the farmer creates anything themselves.
// Locations use the REAL sample markets from the ShasyaSetu backend dataset
// (see marketData.js) instead of an unrelated hardcoded place — these are
// still demo/sample lots (isSample: true), not real backend records.
export const INITIAL_LOTS = [
  makeSampleLot('Wheat', 60, 2350, 'A', SAMPLE_MARKETS[1]),   // Pune APMC
  makeSampleLot('Cotton', 30, 7200, 'B', SAMPLE_MARKETS[2]),  // Nagpur APMC
  makeSampleLot('Groundnut', 45, 6480, 'A', SAMPLE_MARKETS[0]), // Mumbai APMC
];

export const STATUS_CLASS = {
  Listed: 'st-Listed',
  'Offer received': 'st-Offer',
  'Deal locked': 'st-Locked',
  'In transit': 'st-Transit',
  Delivered: 'st-Delivered',
  'Payment released': 'st-Released',
  Dispute: 'st-Dispute',
};

export function gradeNote(grade) {
  if (grade === 'A') return 'Premium quality — few defects';
  if (grade === 'B') return 'Good quality — minor defects';
  return 'Standard quality';
}
