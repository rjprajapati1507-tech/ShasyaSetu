// In development, an empty base URL uses Vite's proxy and avoids cross-origin
// browser restrictions. Set VITE_API_BASE_URL for a separately hosted API.
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function getRecommendation(input) {
  let response;
  try {
    response = await fetch(`${apiBaseUrl}/api/v1/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error('Unable to reach the recommendation service. Start the FastAPI backend and try again.');
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Unable to reach the recommendation service. Start the FastAPI backend and try again.');
    }
    throw new Error(body?.detail || 'Unable to create a recommendation. Please check the entered values.');
  }
  return body;
}
