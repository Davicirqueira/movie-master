/** Base da API (sem barra final). Alinhe com PORTA no backend. */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';
  return raw.replace(/\/$/, '');
}
