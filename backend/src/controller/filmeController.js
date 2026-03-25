import { Router } from "express";
const endpoitns = Router();

import { salvarFilme } from "../repository/filmeRepository.js";

endpoitns.post('/filme', async (req, resp) => {
    
    try {

        let filmeObj = req.body;
        let idFilme = await salvarFilme(filmeObj);
    
        resp.send({
            id: idFilme
        });
        
    } catch (error) {
        
    }
});

export default endpoitns;