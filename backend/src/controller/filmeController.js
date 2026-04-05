import { Router } from "express";
const endpoitns = Router();

import multer from 'multer';

import salvarFilmeService from "../services/filme/salvarFilmeService.js";
import consultarFilmesService from "../services/filme/consultarFilmesService.js";
import consultarFilmesIdService from "../services/filme/consultarFilmesIdService.js";
import editarFilmeService from "../services/filme/editarFilmeService.js";
import excluirFilmeService from "../services/filme/excluirFilmeService.js";
import uploadImgService from "../services/filme/uploadImgService.js";


endpoitns.post('/filme', async (req, resp) => {
    
    try {

        let filmeObj = req.body;
        let id = await salvarFilmeService(filmeObj);
    
        resp.send({
            id: id
        });
        
    } 
    catch (err) {
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


endpoitns.get('/buscarFilmesId/:id', async (req, resp) => {

    try {
        let id = req.params.id;
        let infosConsultaId = await consultarFilmesIdService(id);

        resp.send(infosConsultaId);
    }
    catch(err){
        logErro(err);
        resp.status(400).send(criarErro(err));        
    }

});


endpoitns.put('/editarFilme/:id', async (req, resp) => {

    try {
        let id = req.params.id;
        let filmeObj = req.body;

        await editarFilmeService(filmeObj, id);

        //204, no content.
        resp.status(204).send();
    }
    catch(err){
        logErro(err);
        resp.status(400).send(criarErro(err)); 
    }

});


endpoitns.delete('/excluirFilme/:id', async (req, resp) => {

    try {
        let id = req.params.id;
        await excluirFilmeService(id);
        resp.status(204).send();

    }
    catch(err){
        logErro(err);
        resp.status(400).send(criarErro(err));     
    }

});


let uploadImg = multer({ dest: './storage/capa'});
endpoitns.put('/uploadImg/:id/imagem', uploadImg.single('imagem'), async (req, resp) => {

    try {
        let id = req.params.id;
        let pathWay = req.file.path;

        //lógica de negócio
        await uploadImgService(id, pathWay);

        resp.status(204).send();
        
    }catch(err){
        logErro(err);
        resp.status(400).send(criarErro(err)); 
    }
});

export default endpoitns;