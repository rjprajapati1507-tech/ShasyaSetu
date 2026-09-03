import { useState } from 'react';
import FarmerForm from './components/FarmerForm';
import RecommendationResults from './components/RecommendationResults';
import { getRecommendation } from './services/recommendationApi';

const demoInput = { crop: 'Tomato', quantity_kg: '500', location: 'Nashik' };

export default function App() {
  const [values, setValues] = useState(demoInput);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const recommendation = await getRecommendation({ ...values, quantity_kg: Number(values.quantity_kg) });
      setResult(recommendation);
    } catch (requestError) {
      setResult(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header className="hero">
        <p className="brand"><span>✦</span> ShasyaSetu</p>
        <h1>Better market decisions, grounded in clear calculations.</h1>
        <p className="hero-copy">AI-powered agricultural market intelligence for a focused, demo-ready selling recommendation.</p>
        <p className="sample-badge">Prototype using demo/sample market data — not live data</p>
      </header>
      <div className="workflow"><span>Farmer input</span><i>→</i><span>Price prediction</span><i>→</i><span>Net realisation</span><i>→</i><span>Market ranking</span></div>
      <FarmerForm values={values} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
      {error && <div className="error-message" role="alert"><strong>Recommendation unavailable.</strong> {error}</div>}
      {result && <RecommendationResults result={result} />}
    </main>
  );
}
