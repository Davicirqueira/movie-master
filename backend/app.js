import express from "express";
import cors from 'cors';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

servidor.get('/helloworld', (req, resp) => {

    resp.send('Foco.');

});

// Parâmetro Rota //
servidor.get('/calculadora/:n1/:n2', (req, resp) => {

    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    resp.send(n1 + n2);

});


// Parâmetro Query //
servidor.get('/calculadora/somar', (req, resp) => {

    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    resp.send(n1 + n2);

});

// Parâmetro Query //
servidor.get('/mensagem/ola', (req, resp) => {

    let person = req.query.nome ?? "Alguém";
    resp.send(`Olá ${person}`);

});

//Parâmetro Body/Json
servidor.post('/media', (req, resp) => {

    let nota1 = req.body.n1;
    let nota2 = req.body.n2;

    let media = (nota1 + nota2) / 2;
    resp.send('A média é ' + media);

});


//Parâmetro Body/Vetor
servidor.post('/dobro', (req, resp) => {

    let nums = req.body.numeros;

    let nums2 = [];
    for (let i = 0; i < nums.length; i++){
        nums2[i] = nums[i] * 2;
    }
    
    resp.send('Os dobros dos números são ' + nums2);

});


servidor.post('/loja/pedido', (req, resp) => {

    let total = req.body.total;
    let parcelas = req.body. parcelas;
    let cupom = req.query.cupom;

    if(parcelas > 1){

        let juros = total * 0.05;
        total += juros;

    }

    if(cupom == "QUERO100"){
        total -= 100;
    }
    
    resp.send(`O total do pedido ficou R$${total}`);

});

servidor.listen(5001, () => console.log(`Api conectada com sucesso.`))