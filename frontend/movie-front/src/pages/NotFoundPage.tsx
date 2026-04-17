import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="app-main">
      <div className="empty-state card">
        <div className="card__body stack">
          <span className="caption">Erro 404</span>
          <h1 className="card__title">Página não encontrada</h1>
          <p className="card__text">
            O endereço não existe ou foi removido. Volte ao catálogo para continuar.
          </p>
          <Link to="/" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
            Ir ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
