import { horario } from "./datetime.js";

global.criarErro = function criarErro(err){
    let obj = {
        erro: err.message
    }

    return obj;
}

global.logErro = function logErro(err){
    console.log(horario() + ' ERROR --> ' + err.message);
}
