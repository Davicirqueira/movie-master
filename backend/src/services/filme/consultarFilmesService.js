import { consultarFilmes } from "../../repository/filmeRepository.js"

export default async function consultarFilmesService(nome){
    
    if(!nome){
        nome = '';
    }

    let infosConsulta = await consultarFilmes(nome);
    return infosConsulta;

}