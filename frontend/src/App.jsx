import { useEffect, useMemo, useRef, useState } from 'react';
import Ticker from './components/Ticker';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import CreateLotModal from './components/modals/CreateLotModal';
import MakeOfferModal from './components/modals/MakeOfferModal';
import RateModal from './components/modals/RateModal';
import DisputeModal from './components/modals/DisputeModal';
import PriceIntelligence from './views/PriceIntelligence';
import MyLots from './views/MyLots';
import Offers from './views/Offers';
import OrdersPayments from './views/OrdersPayments';
import Marketplace from './views/Marketplace';
import MyOffers from './views/MyOffers';
import Help from './views/Help';
import { INITIAL_LOTS, CURRENT_BUYER, nextOrderId } from './data/mockData';

export default function App() {
  const [role, setRole] = useState('fpo');
  const [view, setView] = useState('fpo-prices');
  const [lots, setLots] = useState(INITIAL_LOTS);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const [createLotOpen, setCreateLotOpen] = useState(false);
  const [createLotPrefill, setCreateLotPrefill] = useState(null);
  const [offerModalLotId, setOfferModalLotId] = useState(null);
  const [rateOrderId, setRateOrderId] = useState(null);
  const [disputeOrderId, setDisputeOrderId] = useState(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message, icon) => {
    setToast({ message, icon });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setView(nextRole === 'fpo' ? 'fpo-prices' : 'buyer-market');
  };

  const lotCount = lots.filter((l) => l.status === 'Listed' || l.status === 'Offer received').length;
  const offerCount = lots.reduce((sum, l) => sum + l.offers.filter((o) => o.status === 'Pending').length, 0);
  const orders = useMemo(() => lots.filter((l) => l.order).map((l) => l.order), [lots]);

  // ---- Price Intelligence -> Create Lot handoff ----
  const handleContinueToCreateLot = (selectedMarket) => {
    setCreateLotPrefill({
      crop: selectedMarket.crop,
      market: selectedMarket.market,
      quantityKg: selectedMarket.quantityKg,
      expectedPricePerKg: selectedMarket.expectedPricePerKg,
      transportCostPerKg: selectedMarket.transportCostPerKg,
      expectedNetPerKg: selectedMarket.expectedNetPerKg,
    });
    setCreateLotOpen(true);
  };

  const handleCreateLot = (draft) => {
    const newLot = {
      id: `L${100 + lots.length + 1}`,
      crop: draft.crop,
      qty: draft.qty,
      unit: 'quintal',
      price: draft.price,
      grade: draft.grade,
      status: 'Listed',
      fpo: 'Saurashtra Farmers FPO',
      originLocation: draft.originLocation,
      market: draft.market,
      isSample: false,
      priceIntel: draft.priceIntel,
      offers: [],
      order: null,
      created: new Date(),
    };
    setLots((current) => [...current, newLot]);
    setCreateLotOpen(false);
    setCreateLotPrefill(null);
    showToast(`Lot created — sample grading: Grade ${draft.grade}, now live to buyers`, '🌾');
    setView('fpo-lots');
  };

  // ---- Offers ----
  const handleAcceptOffer = (lotId, offerId) => {
    setLots((current) => current.map((lot) => {
      if (lot.id !== lotId) return lot;
      const offer = lot.offers.find((o) => o.id === offerId);
      const order = {
        id: nextOrderId(),
        lot,
        buyer: offer.buyer,
        price: offer.price,
        qty: offer.qty,
        stepIndex: 0,
        disputed: false,
        rated: false,
        createdAt: new Date(),
      };
      showToast(`Offer accepted — ₹${(offer.price * offer.qty).toLocaleString('en-IN')} locked in simulated escrow`, '🔒');
      return {
        ...lot,
        status: 'Deal locked',
        order,
        offers: lot.offers.map((o) => (o.id === offerId ? { ...o, status: 'Accepted' } : o)),
      };
    }));
  };

  const handleRejectOffer = (lotId, offerId) => {
    setLots((current) => current.map((lot) => (
      lot.id !== lotId ? lot : { ...lot, offers: lot.offers.map((o) => (o.id === offerId ? { ...o, status: 'Rejected' } : o)) }
    )));
    showToast('Offer declined', '✖️');
  };

  // ---- Marketplace / Make offer ----
  const offerTargetLot = lots.find((l) => l.id === offerModalLotId) || null;
  const handleSubmitOffer = ({ price, qty }) => {
    setLots((current) => current.map((lot) => {
      if (lot.id !== offerModalLotId) return lot;
      const newOffer = { id: `OF${Math.floor(Math.random() * 100000)}`, buyer: CURRENT_BUYER, price, qty, status: 'Pending' };
      return { ...lot, status: lot.status === 'Listed' ? 'Offer received' : lot.status, offers: [...lot.offers, newOffer] };
    }));
    setOfferModalLotId(null);
    showToast(`Offer sent to ${offerTargetLot.fpo}`, '📨');
    setView('buyer-offers');
  };

  // ---- Orders: advance / rate / dispute ----
  const handleAdvanceOrder = (orderId) => {
    setLots((current) => current.map((lot) => {
      if (!lot.order || lot.order.id !== orderId) return lot;
      const nextStep = Math.min(lot.order.stepIndex + 1, 4);
      if (nextStep === 4) showToast(`₹${(lot.order.price * lot.order.qty).toLocaleString('en-IN')} released from simulated escrow to FPO`, '💰');
      else showToast(`Order updated`, '📦');
      return { ...lot, order: { ...lot.order, stepIndex: nextStep } };
    }));
  };

  const handleSubmitRating = (stars) => {
    setLots((current) => current.map((lot) => (
      lot.order && lot.order.id === rateOrderId ? { ...lot, order: { ...lot.order, rated: true } } : lot
    )));
    setRateOrderId(null);
    showToast(`Thanks — ${stars}★ rating recorded`, '⭐');
  };

  const handleSubmitDispute = () => {
    setLots((current) => current.map((lot) => (
      lot.order && lot.order.id === disputeOrderId ? { ...lot, order: { ...lot.order, disputed: true } } : lot
    )));
    setDisputeOrderId(null);
    showToast(`Grievance #${Math.floor(1000 + Math.random() * 9000)} raised — payment frozen pending review`, '⚠️');
  };

  return (
    <>
      <Ticker />
      <TopBar role={role} onRoleChange={handleRoleChange} />
      <div className="app">
        <Sidebar role={role} view={view} onNavigate={setView} lotCount={lotCount} offerCount={offerCount} />
        <div className="content">
          {role === 'fpo' && view === 'fpo-prices' && <PriceIntelligence onContinueToCreateLot={handleContinueToCreateLot} />}
          {role === 'fpo' && view === 'fpo-lots' && <MyLots lots={lots} onCreateNew={() => { setCreateLotPrefill(null); setCreateLotOpen(true); }} />}
          {role === 'fpo' && view === 'fpo-offers' && <Offers lots={lots} onAccept={handleAcceptOffer} onReject={handleRejectOffer} />}
          {role === 'fpo' && view === 'fpo-orders' && <OrdersPayments orders={orders} isFpoView onAdvance={handleAdvanceOrder} onRate={setRateOrderId} onDispute={setDisputeOrderId} />}
          {role === 'fpo' && view === 'fpo-help' && <Help />}
          {role === 'buyer' && view === 'buyer-market' && <Marketplace lots={lots} onMakeOffer={setOfferModalLotId} />}
          {role === 'buyer' && view === 'buyer-offers' && <MyOffers lots={lots} currentBuyerId={CURRENT_BUYER.id} />}
          {role === 'buyer' && view === 'buyer-orders' && <OrdersPayments orders={orders} isFpoView={false} onAdvance={handleAdvanceOrder} onRate={setRateOrderId} onDispute={setDisputeOrderId} />}
        </div>
      </div>

      <CreateLotModal
        open={createLotOpen}
        prefill={createLotPrefill}
        onClose={() => { setCreateLotOpen(false); setCreateLotPrefill(null); }}
        onCreate={handleCreateLot}
      />
      <MakeOfferModal
        open={!!offerModalLotId}
        lot={offerTargetLot}
        onClose={() => setOfferModalLotId(null)}
        onSubmit={handleSubmitOffer}
      />
      <RateModal open={!!rateOrderId} onClose={() => setRateOrderId(null)} onSubmit={handleSubmitRating} />
      <DisputeModal open={!!disputeOrderId} onClose={() => setDisputeOrderId(null)} onSubmit={handleSubmitDispute} />

      <Toast toast={toast} />
    </>
  );
}
