import { editarFilme } from "../../repository/filmeRepository.js";
import { validarCamposObrigatorios, validarEdicao } from "../../validation/filme/filmeValidation.js";

export default async function editarFilmeService(filmeObj, id){
    validarCamposObrigatorios(filmeObj);

    let linhasAfetadas = await editarFilme(filmeObj, id);

    validarEdicao(linhasAfetadas);

}