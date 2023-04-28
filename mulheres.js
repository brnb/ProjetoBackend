const express = require('express') //iniciando o express
const router = express.Router()//configurar primeira parte da rota
const cors = require('cors')//ligando pct cors que permite consumir essa API no front-end
const conectaBancoDeDados = require('./bancoDeDados')//ligar esse arq. ao arq. "bancoDeDados"
conectaBancoDeDados() //para chamar a função que conecta o banco de dados

const Mulher = require('./mulherModel')//ligar esse arq. ao arq. "mulherModel"

const app = express() //iniciando o app
app.use(express.json()) //de alguma maneira é pra usar o json
app.use(cors())//iniciando o cors
const porta = 3333; // criar porta

//GET
async function mostraMulheres (request, response) {
    try{
        const mulheresDoBancoDeDados = await Mulher.find()
        response.json(mulheresDoBancoDeDados)
    }catch (erro) {
        console.log(erro)
    }
    
}

// POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citaca
        }
        const mulherAtualizada = await mulherEncontrada.save()
        response.json(mulherAtualizada)
    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso!"})
    } catch(erro){
        console.log(erro)
    }
}

app.use(router.get('/mulheres', mostraMulheres)) //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configuração da rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configuração da rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configuração da rota DELETE /mulheres/:id

//PORTA
function mostraPorta () {
    console.log('Servidor criado e rodando na porta', porta);
}
app.listen(porta, mostraPorta) //servidor escuta a PORTA