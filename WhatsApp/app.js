const express = require('express');
const cors = require('cors');
const {
  getAllUsers,
  getUserProfile,
  getUserContacts,
  getAllMessages,
  getConversation,
  searchMessages,
} = require('./modulo/function.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/v1/senai/whatsapp/help', (req, res) => {
  res.json({
    api: "Whatsapp API",
    version: "1.0.0",
    baseURL: "/v1/senai/whatsapp",
    endpoints: [
      {
        rota: "GET /v1/senai/whatsapp/users",
        descricao: "Retorna todos os usuários cadastrados no sistema",
        parametros: "Nenhum",
        exemplo: "/v1/whatsapp/users"
      },
      {
        rota: "GET /v1/senai/whatsapp/users/:id/profile",
        descricao: "Retorna os dados do profile de um usuário pelo ID",
        parametros: { id: "number - ID do usuário (obrigatório)" },
        exemplo: "/v1/whatsapp/users/1/profile"
      },
      {
        rota: "GET /v1/senai/whatsapp/users/:id/contacts",
        descricao: "Retorna a lista de contatos de um usuário (nome, foto e descrição)",
        parametros: { id: "number - ID do usuário (obrigatório)" },
        exemplo: "/v1/whatsapp/users/1/contacts"
      },
      {
        rota: "GET /v1/senai/whatsapp/users/:id/messages",
        descricao: "Retorna todas as mensagens trocadas de um usuário com todos os seus contatos",
        parametros: { id: "number - ID do usuário (obrigatório)" },
        exemplo: "/v1/whatsapp/users/1/messages"
      },
      {
        rota: "GET /v1/senai/whatsapp/users/:id/conversation",
        descricao: "Retorna a conversa entre um usuário e um contato específico",
        parametros: { id: "number - ID do usuário (obrigatório)" },
        query: { contact: "string - Nome do contato (obrigatório)" },
        exemplo: "/v1/whatsapp/users/1/conversation?contact=Ana Maria"
      },
      {
        rota: "GET /v1/senai/whatsapp/users/:id/search",
        descricao: "Pesquisa mensagens por palavra-chave na conversa entre usuário e contato",
        parametros: { id: "number - ID do usuário (obrigatório)" },
        query: {
          contact: "string - Nome do contato (obrigatório)",
          keyword: "string - Palavra-chave para busca (obrigatório)"
        },
        exemplo: "/v1/senai/whatsapp/users/1/search?contact=Ana Maria&keyword=beach"
      }
    ]
  });
});

app.get('/v1/senai/whatsapp/users', (req, res) => {
  res.json(getAllUsers());
});

app.get('/v1/senai/whatsapp/users/:id/profile', (req, res) => {
  const result = getUserProfile(req.params.id);
  if (!result) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(result);
});

app.get('/v1/senai/whatsapp/users/:id/contacts', (req, res) => {
  const result = getUserContacts(req.params.id);
  if (!result) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(result);
});

app.get('/v1/senai/whatsapp/users/:id/messages', (req, res) => {
  const result = getAllMessages(req.params.id);
  if (!result) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(result);
});

app.get('/v1/senai/whatsapp/users/:id/conversation', (req, res) => {
  const { contact } = req.query;
  if (!contact) return res.status(400).json({ error: "Informe ?contact=Nome" });
  const result = getConversation(req.params.id, contact);
  if (!result) return res.status(404).json({ error: "Usuário ou contato não encontrado" });
  res.json(result);
});

app.get('/v1/senai/whatsapp/users/:id/search', (req, res) => {
  const { contact, keyword } = req.query;
  if (!contact || !keyword) return res.status(400).json({ error: "Informe ?contact=Nome&keyword=palavra" });
  const result = searchMessages(req.params.id, contact, keyword);
  if (!result) return res.status(404).json({ error: "Usuário ou contato não encontrado" });
  res.json(result);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
