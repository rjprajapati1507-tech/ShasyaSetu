const currency = (value) => `₹${Number(value).toFixed(2)}`;

function Metric({ label, value, emphasised = false }) {
  return <div className={emphasised ? 'metric metric-emphasised' : 'metric'}><span>{label}</span><strong>{value}</strong></div>;
}

export default function RecommendationResults({ result }) {
  const recommended = result.recommendation;
  return (
    <section className="results" aria-live="polite" aria-labelledby="results-title">
      <div className="data-disclaimer">{result.data_source}</div>
      <div className="result-grid">
        <article className="panel recommended-market">
          <p className="eyebrow">Recommended market</p>
          <h2 id="results-title">{recommended.market}</h2>
          <p className="recommendation-copy">It has the highest expected net realisation after the sample transport and handling costs are deducted.</p>
          <div className="metrics">
            <Metric label="Expected price / kg" value={currency(recommended.expected_price_per_kg)} />
            <Metric label="Transport / kg" value={currency(recommended.transport_cost_per_kg)} />
            <Metric label="Expected net / kg" value={currency(recommended.expected_net_realisation_per_kg)} emphasised />
          </div>
        </article>
        <article className="panel calculation">
          <p className="eyebrow">Calculation</p>
          <h2>Expected net realisation</h2>
          <div className="calculation-row"><span>Expected selling price</span><strong>{currency(recommended.expected_price_per_kg)} / kg</strong></div>
          <div className="calculation-row"><span>− Transportation cost</span><strong>{currency(recommended.transport_cost_per_kg)} / kg</strong></div>
          <div className="calculation-row"><span>− Relevant costs</span><strong>{currency(recommended.handling_cost_per_kg)} / kg</strong></div>
          <div className="calculation-total"><span>= Expected net realisation</span><strong>{currency(recommended.expected_net_realisation_per_kg)} / kg</strong></div>
        </article>
      </div>

      <article className="panel comparison">
        <div className="section-heading">
          <p className="eyebrow">Step 3</p>
          <h2>Market comparison</h2>
          <p>Markets are ranked by expected net realisation for {result.quantity_kg} kg.</p>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Market</th><th>Expected price</th><th>Transport cost</th><th>Expected net realisation</th></tr></thead>
            <tbody>
              {result.markets.map((market) => (
                <tr key={market.market} className={market.market === recommended.market ? 'recommended-row' : ''}>
                  <td>{market.market}{market.market === recommended.market && <span className="best-tag">Recommended</span>}</td>
                  <td>{currency(market.expected_price_per_kg)} / kg</td>
                  <td>{currency(market.transport_cost_per_kg)} / kg</td>
                  <td><strong>{currency(market.expected_net_realisation_per_kg)} / kg</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
