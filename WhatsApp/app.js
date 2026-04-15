/**************************************************************************************************
 * 
 * Obejtivo: Arquivo responsável pela criação da API do WhatsApp
 * Data; 15/04/2026
 * Autor: Geovane
 * Versão: 1.0
 * http:localhost
 * 
 * ***********************************************************************************************/ 






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
    }else{
        response.status(400)
        response.json({"Message": "Usuário não encontrado!"})
    }

})

app.get('/v1/senai/')

const PORT = process.env.PORT || 8080

app.listen(PORT, function(){
    console.log(`API funcionando na porta ${PORT}`);
    
})
    

