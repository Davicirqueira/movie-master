/** Resposta de listagem (GET /buscarFilmes) */
export type FilmeListaItem = {
  id: number;
  nome: string;
  avaliacao: number;
  lancamento: string;
  disponivel: number | boolean;
};

/** Detalhe (GET /buscarFilmesId/:id) */
export type FilmeDetalhe = FilmeListaItem & {
  sinopse: string;
  img: string | null;
};

/** Corpo POST /filme e PUT /editarFilme */
export type FilmePayload = {
  nome: string;
  sinopse: string;
  avaliacao: number;
  lancamento: string;
  disponivel: boolean;
};

export type CriarFilmeResponse = {
  id: number;
};
