import { getApiBaseUrl } from '../lib/apiBase';
import type { CriarFilmeResponse, FilmeDetalhe, FilmeListaItem, FilmePayload } from '../types/filme';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function base(): string {
  return getApiBaseUrl();
}

async function parseErro(res: Response): Promise<string> {
  const text = await res.text();
  if (!text) return `Erro ${res.status}`;
  try {
    const data = JSON.parse(text) as { erro?: string };
    return data.erro ?? `Erro ${res.status}`;
  } catch {
    return text;
  }
}

export async function listarFilmes(nome?: string): Promise<FilmeListaItem[]> {
  const q = nome != null && nome.trim() !== '' ? `?nome=${encodeURIComponent(nome.trim())}` : '';
  const res = await fetch(`${base()}/buscarFilmes${q}`);
  if (!res.ok) throw new ApiError(await parseErro(res), res.status);
  return res.json() as Promise<FilmeListaItem[]>;
}

export async function buscarFilmePorId(id: string): Promise<FilmeDetalhe> {
  const res = await fetch(`${base()}/buscarFilmesId/${encodeURIComponent(id)}`);
  if (!res.ok) throw new ApiError(await parseErro(res), res.status);
  return res.json() as Promise<FilmeDetalhe>;
}

export async function criarFilme(payload: FilmePayload): Promise<number> {
  const res = await fetch(`${base()}/filme`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new ApiError(await parseErro(res), res.status);
  const data = (await res.json()) as CriarFilmeResponse;
  return data.id;
}

export async function atualizarFilme(id: string, payload: FilmePayload): Promise<void> {
  const res = await fetch(`${base()}/editarFilme/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new ApiError(await parseErro(res), res.status);
}

export async function excluirFilme(id: string): Promise<void> {
  const res = await fetch(`${base()}/excluirFilme/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new ApiError(await parseErro(res), res.status);
}

export async function uploadCapa(id: string, arquivo: File): Promise<void> {
  const fd = new FormData();
  fd.append('imagem', arquivo);
  const res = await fetch(`${base()}/uploadImg/${encodeURIComponent(id)}/imagem`, {
    method: 'PUT',
    body: fd,
  });
  if (!res.ok) throw new ApiError(await parseErro(res), res.status);
}
