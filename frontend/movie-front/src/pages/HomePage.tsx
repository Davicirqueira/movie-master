import { useEffect, useState } from 'react';
import { ApiError, listarFilmes } from '../api/filmes';
import MovieCard from '../components/MovieCard';
import type { FilmeListaItem } from '../types/filme';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [filmes, setFilmes] = useState<FilmeListaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 400);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      listarFilmes(debounced)
        .then((data) => {
          if (!cancelled) setFilmes(data);
        })
        .catch((e: unknown) => {
          if (!cancelled)
            setError(e instanceof ApiError ? e.message : 'Não foi possível carregar os filmes.');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  return (
    <main className="app-main" role="main">
      <div className="page-head stack">
        <div>
          <span className="caption">Explorar</span>
          <h1 className="page-head__title">Catálogo de filmes</h1>
          <p className="card__text page-head__lead">
            Busque por título ou navegue por todos os títulos cadastrados.
          </p>
        </div>

        <div className="search-field">
          <label htmlFor="busca-filmes" className="label">
            Buscar
          </label>
          <input
            id="busca-filmes"
            type="search"
            className="input"
            placeholder="Nome do filme…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      {error ? (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="state state--center">
          <div className="spinner" aria-hidden />
          <p className="caption">Carregando…</p>
        </div>
      ) : filmes.length === 0 ? (
        <div className="empty-state card">
          <div className="card__body">
            <h2 className="card__title">Nenhum filme encontrado</h2>
            <p className="card__text">
              Tente outro termo de busca ou cadastre um novo filme.
            </p>
          </div>
        </div>
      ) : (
        <ul className="movie-grid">
          {filmes.map((f) => (
            <li key={f.id}>
              <MovieCard filme={f} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
