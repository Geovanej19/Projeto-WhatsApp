const express = require('express')
const cors = require('cors')

const funcoesContatos = require('./modulo/function.js')
const { contatos } = require('./modulo/contatos.js')

const app = express()

// Configuração do CORS
const corsOptions = {
    origin: ['*'], 
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))




app.get('/v1/senai/usuarios', function(request, response){

    let contatos = request.query.contatos;
    let usuario = funcoesContatos.listaContatos(contatos)

    if(usuario){
        response.status(200)
        response.json(usuario)
    }

})

app.listen(8080, function(){
    console.log('API funcionando');
    
})

