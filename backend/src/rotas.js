import filmeController from './controller/filmeController.js';

export default function adicionarRotas(servidor) {
    
    servidor.use(filmeController);

}