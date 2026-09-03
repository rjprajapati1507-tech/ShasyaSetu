export default function FarmerForm({ values, onChange, onSubmit, loading }) {
  return (
    <section className="panel input-panel" aria-labelledby="farmer-input-title">
      <div className="section-heading">
        <p className="eyebrow">Step 1</p>
        <h2 id="farmer-input-title">Farmer input</h2>
        <p>Tell us what you want to sell and where you are located.</p>
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Crop
          <input name="crop" value={values.crop} onChange={onChange} required placeholder="e.g. Tomato" />
        </label>
        <label>
          Quantity (kg)
          <input name="quantity_kg" type="number" min="1" step="1" value={values.quantity_kg} onChange={onChange} required />
        </label>
        <label>
          Farmer location
          <input name="location" value={values.location} onChange={onChange} required placeholder="e.g. Nashik" />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Finding markets…' : 'Get recommendation'}
        </button>
      </form>
      <p className="demo-note">Demo currently supports the sample route from Nashik.</p>
    </section>
  );
}
