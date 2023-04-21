const express = require('express');
const router = express.Router();//criar a rota

const app = express();
const porta = 3333;
const mulheres = [
    {
        Nome: 'Simara Conceição',
        Imagem: 'https://github.com/simaraconceicao.png',
        MiniBio: 'Desenvolvedora e instrutora.'
    },
    {
        Nome: 'Iana Chan',
        Imagem: 'https://github.com/simaraconceicao.png',
        MiniBio: 'Fundadora PrograMaria.'
    },
    {
        Nome: 'Nina da Hora',
        Imagem: 'https://github.com/simaraconceicao.png',
        MiniBio: 'Hacker antirracista.'
    },
];

function mostraMulheres (request, response) {
    response.json(mulheres);
    document.write('<br>');
};

function mostraPorta () {
    console.log('Servidor criado e rodando na porta', porta);
};

app.use(router.get('/mulheres', mostraMulheres));
app.listen(porta, mostraPorta);