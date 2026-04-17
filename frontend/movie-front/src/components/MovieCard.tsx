import { Link } from 'react-router-dom';
import type { FilmeListaItem } from '../types/filme';

function formatAno(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 4);
  return d.getFullYear().toString();
}

function disponivelLabel(v: number | boolean): string {
  return v === true || v === 1 ? 'Disponível' : 'Indisponível';
}

type Props = {
  filme: FilmeListaItem;
};

export default function MovieCard({ filme }: Props) {
  const inicial = filme.nome?.trim().charAt(0).toUpperCase() || '?';

  return (
    <Link to={`/filme/${filme.id}`} className="movie-card">
      <div className="movie-card__poster" aria-hidden>
        <span className="movie-card__initial">{inicial}</span>
      </div>
      <div className="movie-card__body">
        <h2 className="movie-card__title">{filme.nome}</h2>
        <p className="movie-card__meta">
          {formatAno(filme.lancamento)} · ★ {Number(filme.avaliacao).toFixed(1)}
        </p>
        <span
          className={
            filme.disponivel === true || filme.disponivel === 1
              ? 'badge badge--ok'
              : 'badge badge--muted'
          }
        >
          {disponivelLabel(filme.disponivel)}
        </span>
      </div>
    </Link>
  );
}
