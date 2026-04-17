import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MovieFormPage from './pages/MovieFormPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="filme/novo" element={<MovieFormPage mode="create" />} />
        <Route path="filme/:id/editar" element={<MovieFormPage mode="edit" />} />
        <Route path="filme/:id" element={<MovieDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
