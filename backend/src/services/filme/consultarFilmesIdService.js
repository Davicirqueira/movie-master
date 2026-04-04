import { consultarFilmesId } from "../../repository/filmeRepository.js";
import { validarFilmeUnico } from "../../validation/filme/filmeValidation.js";

export default async function consultarFilmesIdService(id){

    let infosConsultaId = await consultarFilmesId(id);

    validarFilmeUnico(infosConsultaId);

    let infosConsulta = infosConsultaId[0];

    return infosConsulta;

}