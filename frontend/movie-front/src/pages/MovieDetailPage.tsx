import { useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ApiError, buscarFilmePorId, excluirFilme, uploadCapa } from '../api/filmes';
import type { FilmeDetalhe } from '../types/filme';
import { resolvePosterUrl } from '../utils/imageUrl';

function formatData(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function disponivelLabel(v: number | boolean): string {
  return v === true || v === 1 ? 'Disponível para exibição' : 'Indisponível';
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [filme, setFilme] = useState<FilmeDetalhe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      buscarFilmePorId(id)
        .then((data) => {
          if (!cancelled) setFilme(data);
        })
        .catch((e: unknown) => {
          if (!cancelled)
            setError(e instanceof ApiError ? e.message : 'Filme não encontrado.');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleExcluir() {
    if (!id || !filme) return;
    const ok = window.confirm(`Excluir "${filme.nome}" permanentemente?`);
    if (!ok) return;
    try {
      await excluirFilme(id);
      navigate('/', { replace: true });
    } catch (e: unknown) {
      alert(e instanceof ApiError ? e.message : 'Erro ao excluir.');
    }
  }

  async function handleCapa(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    setUploadErr(null);
    setUploading(true);
    try {
      await uploadCapa(id, file);
      const atualizado = await buscarFilmePorId(id);
      setFilme(atualizado);
    } catch (err: unknown) {
      setUploadErr(err instanceof ApiError ? err.message : 'Falha no envio da capa.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  if (!id) {
    return (
      <main className="app-main">
        <p className="alert alert--error">ID inválido.</p>
        <Link to="/" className="btn btn--ghost">
          Voltar ao catálogo
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="app-main">
        <div className="state state--center">
          <div className="spinner" aria-hidden />
          <p className="caption">Carregando…</p>
        </div>
      </main>
    );
  }

  if (error || !filme) {
    return (
      <main className="app-main stack">
        <div className="alert alert--error" role="alert">
          {error ?? 'Filme não encontrado.'}
        </div>
        <Link to="/" className="btn btn--ghost">
          Voltar ao catálogo
        </Link>
      </main>
    );
  }

  const poster = resolvePosterUrl(filme.img);

  return (
    <main className="app-main">
      <div className="detail-toolbar">
        <Link to="/" className="btn btn--ghost">
          ← Catálogo
        </Link>
        <div className="detail-toolbar__actions">
          <Link to={`/filme/${id}/editar`} className="btn btn--secondary">
            Editar
          </Link>
          <button type="button" className="btn btn--danger" onClick={handleExcluir}>
            Excluir
          </button>
        </div>
      </div>

      <article className="detail">
        <div className="detail__poster-wrap">
          {poster ? (
            <img
              src={poster}
              alt=""
              className="detail__poster"
              loading="eager"
            />
          ) : (
            <div className="detail__poster detail__poster--empty" aria-hidden>
              <span className="detail__poster-placeholder">
                {filme.nome.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="detail__upload">
            <label className="label" htmlFor="capa-input">
              Capa do filme
            </label>
            <input
              id="capa-input"
              type="file"
              accept="image/*"
              className="input input--file"
              onChange={handleCapa}
              disabled={uploading}
            />
            {uploading ? <p className="caption">Enviando…</p> : null}
            {uploadErr ? (
              <p className="alert alert--error alert--compact" role="alert">
                {uploadErr}
              </p>
            ) : null}
          </div>
        </div>

        <div className="detail__content stack">
          <span className="caption">Filme</span>
          <h1 className="detail__title">{filme.nome}</h1>
          <p className="detail__facts">
            <span>{formatData(filme.lancamento)}</span>
            <span aria-hidden> · </span>
            <span>★ {Number(filme.avaliacao).toFixed(1)}</span>
            <span aria-hidden> · </span>
            <span
              className={
                filme.disponivel === true || filme.disponivel === 1 ? 'text-ok' : 'text-muted-strong'
              }
            >
              {disponivelLabel(filme.disponivel)}
            </span>
          </p>
          <section className="stack" aria-labelledby="sinopse-heading">
            <h2 id="sinopse-heading" className="label">
              Sinopse
            </h2>
            <p className="detail__sinopse">{filme.sinopse}</p>
          </section>
        </div>
      </article>
    </main>
  );
}
