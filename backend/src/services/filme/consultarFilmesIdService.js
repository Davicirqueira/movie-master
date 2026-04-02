import { consultarFilmesId } from "../../repository/filmeRepository.js";

export default async function consultarFilmesIdService(id){

    let infosConsultaId = await consultarFilmesId(id);

    if(infosConsultaId == 0){
        throw new Error('Nenhum filme encontrado.')
    }

    let infosConsulta = infosConsultaId[0];

    return infosConsulta;

}