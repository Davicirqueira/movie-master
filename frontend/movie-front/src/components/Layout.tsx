import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header" role="banner">
        <div className="app-header__inner">
          <Link to="/" className="app-brand app-brand--link">
            <p className="caption">Catálogo</p>
            <span className="app-brand__title">
              Movie<span className="app-brand__accent">Master</span>
            </span>
          </Link>
          <nav className="app-nav" aria-label="Principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'app-nav__link' + (isActive ? ' app-nav__link--active' : '')
              }
            >
              Início
            </NavLink>
            <NavLink
              to="/filme/novo"
              className={({ isActive }) =>
                'app-nav__link app-nav__link--cta' +
                (isActive ? ' app-nav__link--cta-active' : '')
              }
            >
              Novo filme
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
