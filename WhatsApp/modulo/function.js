/***************************************************************************************************************************************************************
 * 
 * Desafio: WhatsApp
 * Autor: Geovane
 * Data: 08/04/2026
 * Versão: 1.0
 * 
 **************************************************************************************************************************************************************/

const dadosWhats = require('./contatos.js')

// Função para listar todos os dados da API
const listaContatos = function(){
    return dadosWhats.contatos

    // const dados = dadosWhats.contatos['whats-users'].map(
    //     contatos => ({
    //         id: contatos.id,
    //         nome: contatos.account,
    //         nickname: contatos.nickname,
    //         dataDeCriacao:
    //         foto: contatos['profile-image'],
    //         numero: contatos.number,
    //         contatos: contatos.contacts.map(contatos => contatos.name).join(',')
    //     }))

    //     return {
    //         dados,
    //         quantidade: dados.length
    //     }
}

//Função para listar todos os dados da conta profile do usuário
const dadosUsuario = function(numero){

    if(!numero){
        return false
    }

    const dados = dadosWhats.contatos['whats-users'].find(
        dados => dados.number === numero)


        if(dados){
            return {
                nome: dados.account,
                nickname: dados.nickname,
                foto: dados['profile-image'],
                numero: dados.number,
                cor: dados.background,
                dadosconta: dados['created-since']
            }
        }
}

const dadosContatos = function(contatos){

    const dados = dadosWhats.contatos['whats-users'].find(
        c => c.contacts.some(contato => contato.name === contatos)
    )


    if(!dados){
        return false
    }
    return{
        nome: dados.contacts.filter(c => c.name),
        foto: dados.contacts.filter(c => c.image),
        descricao: dados.contacts.filter(c => c.description)

    }
}

console.log(dadosContatos('Ana Maria'));
