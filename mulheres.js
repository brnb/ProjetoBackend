const express = require('express'); //iniciando o express
const router = express.Router();//configurar primeira parte da rota
const {v4: uuidv4} = require('uuid');

const app = express(); //iniciando o app
app.use(express.json());
const porta = 3333; // criar porta

//criando lista inicial de mulheres
const mulheres = [
    {
        Id: '1',
        Nome: 'Simara Conceição',
        Imagem: 'https://github.com/simaraconceicao.png',
        MiniBio: 'Desenvolvedora e instrutora.'
    },
    {
        Id: '2',
        Nome: 'Iana Chan',
        Imagem: 'https://github.com/simaraconceicao.png',
        MiniBio: 'Fundadora PrograMaria.'
    },
    {
        Id: '3',
        Nome: 'Nina da Hora',
        Imagem: 'https://github.com/simaraconceicao.png',
        MiniBio: 'Hacker antirracista.'
    },
];

//GET
function mostraMulheres (request, response) {
    response.json(mulheres);
};

// POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher);
    response.json(mulheres);
}

//PORTA
function mostraPorta () {
    console.log('Servidor criado e rodando na porta', porta);
};

app.use(router.get('/mulheres', mostraMulheres)); //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configuração da rota POST /mulheres
app.listen(porta, mostraPorta); //servidor escuta a PORTA