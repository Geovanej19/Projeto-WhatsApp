/***************************************************************************************************************************************************************
 * 
 * Desafio: WhatsApp
 * Autor: Geovane
 * Data: 08/04/2026
 * Versão: 1.0
 * 
 **************************************************************************************************************************************************************/

const dadosWhats = require('./contatos.js')

/***********************************************************************
 * Função: listaContatos
 * Objetivo: Retornar todos os dados da API de contatos
 * Retorno: Lista completa de usuários cadastrados no arquivo contatos.js
 ***********************************************************************/
const listaContatos = function(){
    return dadosWhats.contatos

}

/***********************************************************************
 * Função: dadosUsuario
 * Objetivo: Retornar os dados do perfil de um usuário específico
 * Parâmetro: numero (string) - número do usuário
 * Retorno: Informações do perfil do usuário
 ***********************************************************************/
const getUserProfile = function(numero){

    // Validação do parâmetro
    if(!numero){
        return false
    }

    // Busca o usuário pelo número
    const dados = dadosWhats.contatos['whats-users'].find(
        dados => dados.number === numero)

        // Caso encontre o usuário retorna os dados do perfil
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

/***********************************************************************
 * Função: dadosContatos
 * Objetivo: Listar todos os contatos de um usuário
 * Parâmetro: numero (string) - número do usuário
 * Retorno: Lista de contatos com nome, foto e descrição
 ***********************************************************************/
const getUserContacts = function(numero){

    // Procura o usuário pelo número
    const dados = dadosWhats.contatos['whats-users'].find(
        contato => contato.number === numero);

    // Caso não encontre o usuário
    if(!dados){
        return false
    }

    // Retorna os contatos do usuário
    return{
        contatos: dados.contacts.map(c => ({
            nome: c.name,
            foto: c.image,
            descricao: c.description
        }))
    }
}

/***********************************************************************
 * Função: mensagemUsuarios
 * Objetivo: Retornar todas as mensagens de todos os contatos de um usuário
 * Parâmetro: numero (string) - número do usuário
 * Retorno: Lista de contatos com suas respectivas mensagens
 ***********************************************************************/
const getAllMessages = function(numero){

    // Busca o usuário pelo número
    const mensagens = dadosWhats.contatos['whats-users'].find(
        m => m.number === numero);

        // Caso não encontre o usuário
        if(!mensagens){
            return false
        }

        // Retorna o nome dos contatos e suas mensagens
        return {
            contatos: mensagens.contacts.map(m => ({
                nome: m.name,
                mensagens: m.messages
            }))
        }
}

/***********************************************************************
 * Função: conversaUsuario
 * Objetivo: Retornar todas as conversas de um usuário com seus contatos
 * Parâmetro: numero (string) - número do usuário
 * Retorno: Dados do usuário e suas conversas
 ***********************************************************************/
const getConversation = function(numero, nomeContato) {
    const usuario = dadosWhats.contatos['whats-users'].find(m => m.number === numero)
    if (!usuario) return false

    const contato = usuario.contacts.find(
        c => c.name.toLocaleLowerCase() === nomeContato.toLocaleLowerCase()
    )
    if (!contato) return false

    return {
        nome: usuario.account,
        numero: usuario.number,
        conversa: contato.messages
    }
}

/***********************************************************************
 * Função: buscaPalavra
 * Objetivo: Buscar uma palavra específica dentro das mensagens
 * Parâmetros:
 *      palavraChave (string) - palavra que será pesquisada
 *      numero (string) - número do usuário
 *      nomeContato (string) - nome do contato
 * Retorno: Mensagens que possuem a palavra pesquisada
 ***********************************************************************/
const searchMessages = function(numero, nomeContato, palavraChave) {

    // Busca o usuário pelo número
    const usuario = dadosWhats.contatos['whats-users'].find(
        contato => contato.number === numero
    );

    if (usuario) {

        // Busca o contato pelo nome
        const contato = usuario.contacts.find(
            c => c.name.toLocaleLowerCase() === nomeContato.toLocaleLowerCase()
        );

        if (contato) {

            // Filtra as mensagens que possuem a palavra pesquisada
            const mensagensFiltradas = contato.messages.filter(
                mensagem => mensagem.content.toLocaleLowerCase().includes(palavraChave.toLocaleLowerCase())
            );

            // Retorna o resultado da busca
            return {
                usuario: usuario.account,
                contato: contato.name,
                palavra_pesquisada: palavraChave,
                quantidade: mensagensFiltradas.length,
                mensagens: mensagensFiltradas
            };
        }
    }

    // Caso não encontre usuário ou contato
    return false;
}


module.exports = {
    getAllUsers: listaContatos,
    getUserProfile,
    getUserContacts,
    getAllMessages,
    getConversation,
    searchMessages
}