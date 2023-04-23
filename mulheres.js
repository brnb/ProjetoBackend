const express = require('express') //iniciando o express
const router = express.Router()//configurar primeira parte da rota
const { v4: uuidv4 } = require('uuid')

const app = express() //iniciando o app
app.use(express.json())
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
]

//GET
function mostraMulheres (request, response) {
    response.json(mulheres);
}

// POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }
    mulheres.push(novaMulher)
    response.json(mulheres)
}

//PATCH
function corrigeMulher(request, response){
    function encontraMulher(mulher){
        if(mulher.id === request.params.id){
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }
    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }
    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }
    response.json(mulheres)
}

app.use(router.get('/mulheres', mostraMulheres)); //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configuração da rota POST /mulheres
app.use(router.patch('mulheres/:id', corrigeMulher)) //configuração da rota PATCH /mulheres/:id

//PORTA
function mostraPorta () {
    console.log('Servidor criado e rodando na porta', porta);
};
app.listen(porta, mostraPorta); //servidor escuta a PORTA