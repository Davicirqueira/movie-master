import { excluirFilme } from "../../repository/filmeRepository.js";
import { validarExclusao } from "../../validation/filme/filmeValidation.js";

export default async function excluirFilmeService(id){

    let linhasAfetadas = await excluirFilme(id);

    validarExclusao(linhasAfetadas);
}