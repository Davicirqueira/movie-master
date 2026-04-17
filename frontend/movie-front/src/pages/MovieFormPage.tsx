import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ApiError, atualizarFilme, buscarFilmePorId, criarFilme } from '../api/filmes';
import type { FilmePayload } from '../types/filme';

function toDateInput(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const empty: FilmePayload = {
  nome: '',
  sinopse: '',
  avaliacao: 0,
  lancamento: '',
  disponivel: true,
};

type Props = {
  mode: 'create' | 'edit';
};

export default function MovieFormPage({ mode }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FilmePayload>(empty);
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== 'edit' || !id) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      buscarFilmePorId(id)
        .then((f) => {
          if (cancelled) return;
          setForm({
            nome: f.nome,
            sinopse: f.sinopse,
            avaliacao: Number(f.avaliacao),
            lancamento: toDateInput(f.lancamento),
            disponivel: f.disponivel === true || f.disponivel === 1,
          });
        })
        .catch((e: unknown) => {
          if (!cancelled)
            setError(e instanceof ApiError ? e.message : 'Não foi possível carregar o filme.');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [mode, id]);

  function update<K extends keyof FilmePayload>(key: K, value: FilmePayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (mode === 'create') {
        const newId = await criarFilme(form);
        navigate(`/filme/${newId}`, { replace: true });
      } else if (id) {
        await atualizarFilme(id, form);
        navigate(`/filme/${id}`, { replace: true });
      }
    } catch (err: unknown) {
      setError(err instanceof ApiError ? err.message : 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  if (mode === 'edit' && !id) {
    return (
      <main className="app-main">
        <p className="alert alert--error">ID inválido.</p>
        <Link to="/" className="btn btn--ghost">
          Voltar
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

  const titulo = mode === 'create' ? 'Novo filme' : 'Editar filme';

  return (
    <main className="app-main">
      <div className="page-head">
        <Link to={mode === 'edit' && id ? `/filme/${id}` : '/'} className="btn btn--ghost">
          ← Voltar
        </Link>
        <h1 className="page-head__title" style={{ marginTop: 'var(--space-6)' }}>
          {titulo}
        </h1>
      </div>

      <form className="form card" onSubmit={handleSubmit}>
        <div className="card__body stack form__fields">
          {error ? (
            <div className="alert alert--error" role="alert">
              {error}
            </div>
          ) : null}

          <div className="field">
            <label className="label" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              className="input"
              value={form.nome}
              onChange={(e) => update('nome', e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="sinopse">
              Sinopse
            </label>
            <textarea
              id="sinopse"
              className="input input--textarea"
              rows={5}
              value={form.sinopse}
              onChange={(e) => update('sinopse', e.target.value)}
              required
            />
          </div>

          <div className="form__row">
            <div className="field">
              <label className="label" htmlFor="avaliacao">
                Avaliação (0–10)
              </label>
              <input
                id="avaliacao"
                type="number"
                className="input"
                min={0}
                max={10}
                step={0.1}
                value={form.avaliacao}
                onChange={(e) => update('avaliacao', Number(e.target.value))}
                required
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="lancamento">
                Lançamento
              </label>
              <input
                id="lancamento"
                type="date"
                className="input"
                value={form.lancamento}
                onChange={(e) => update('lancamento', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field field--checkbox">
            <input
              id="disponivel"
              type="checkbox"
              checked={form.disponivel}
              onChange={(e) => update('disponivel', e.target.checked)}
            />
            <label className="label label--inline" htmlFor="disponivel">
              Disponível no catálogo
            </label>
          </div>

          <div className="form__actions">
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
            <Link
              to={mode === 'edit' && id ? `/filme/${id}` : '/'}
              className="btn btn--ghost"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
