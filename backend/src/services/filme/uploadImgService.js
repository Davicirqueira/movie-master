import { uploadImg } from "../../repository/filmeRepository.js";
import { validarEdicao } from "../../validation/filme/filmeValidation.js";

export default async function uploadImgService(id, pathWay){

    let linhasAfetadas = await uploadImg(id, pathWay);
    validarEdicao(linhasAfetadas);

}