export default function Help() {
  return (
    <div>
      <div className="page-head">
        <h1>Voice & WhatsApp access</h1>
        <p>For members without a smartphone, or who prefer speaking in their own language.</p>
      </div>
      <div className="grid grid-3">
        <div className="card">
          <h3>📞 Toll-free IVR</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 8 }}>
            Call <b className="mono">1800-121-4000</b> — press 1 for today's price, press 2 to list a crop, press 3 to speak to your FPO coordinator.
          </p>
        </div>
        <div className="card">
          <h3>💬 WhatsApp bot</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 8 }}>
            Send a voice note or crop photo to <b className="mono">+91 98765 43210</b> — get price and matched buyers as a voice reply.
          </p>
        </div>
        <div className="card">
          <h3>🏢 Village kiosk (CSC)</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 8 }}>
            Visit your nearest Common Service Centre — the operator lists your crop on this portal for you.
          </p>
        </div>
      </div>
      <div className="hint-banner" style={{ marginTop: 16 }}>These channels are illustrative for the demo — no real telephony or messaging integration is connected.</div>
    </div>
  );
}
