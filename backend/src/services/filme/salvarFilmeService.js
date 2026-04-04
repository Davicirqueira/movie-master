import { salvarFilme, consultarFilmesNome } from "../../repository/filmeRepository.js";
import { validarNovoFilme, validarFilmeIgual } from "../../validation/filme/filmeValidation.js";

export default async function salvarFilmeService(filmeObj){
    
    //campos obrigatórios
    validarNovoFilme(filmeObj);

    //busca o filmes com o mesmo nome
    let infosConsulta = await consultarFilmesNome(filmeObj.nome);

    //valida se existe filme com o mesmo nome
    validarFilmeIgual(infosConsulta);

    let id = await salvarFilme(filmeObj);
    return id;

}