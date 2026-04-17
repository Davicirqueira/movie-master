import './utils/global.js'
import 'dotenv/config.js';
import path from 'path';
import express from 'express';
import cors from 'cors';
import adicionarRotas from './rotas.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

const pastaStorage = path.join(process.cwd(), 'storage');
servidor.use('/storage', express.static(pastaStorage));

adicionarRotas(servidor);

const PORTA = process.env.PORTA;
servidor.listen(PORTA, () => console.log(`api ativa na porta ${PORTA}`));


