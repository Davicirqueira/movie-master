import { Router } from "express";
const endpoitns = Router();

import salvarFilmeService from "../services/filme/salvarFilmeService.js";
import consultarFilmesService from "../services/filme/consultarFilmesService.js";


endpoitns.post('/filme', async (req, resp) => {
    
    try {

        let filmeObj = req.body;
        let id = await salvarFilmeService(filmeObj);
    
        resp.send({
            id: id
        });
        
    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }

});


endpoitns.get('/buscarFilmes', async (req, resp) => {

    try {
        let nome = req.query.nome;
        let infosConsulta = await consultarFilmesService(nome);

        resp.send(infosConsulta);
    }
    catch(err){
        logErro(err);
        resp.status(400).send(criarErro(err));        
    }

});

export default endpoitns;