import { getApiBaseUrl } from '../lib/apiBase';

/**
 * Converte caminho gravado pelo multer (ex.: storage/capa/arquivo) em URL HTTP.
 */
export function resolvePosterUrl(img: string | null | undefined): string | null {
  if (img == null || String(img).trim() === '') return null;

  const normalized = String(img).replace(/\\/g, '/').trim();

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  const base = getApiBaseUrl();
  if (normalized.startsWith('storage/')) {
    return `${base}/${normalized}`;
  }

  return `${base}/storage/${normalized.replace(/^\/+/, '')}`;
}
