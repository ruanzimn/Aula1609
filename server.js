const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const secretKey = 'your_secret_key'; // Chave secreta para assinar o JWT

app.use(bodyParser.json());

// Rota para gerar o JWT
app.post('/jwt/auth', (req, res) => {
  const { username } = req.body;

  // Aqui você pode validar o username e senha conforme necessário
  if (username) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Username é necessário' });
  }
});

// Middleware para proteger as rotas
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rota protegida que retorna a lista de métodos HTTP
app.get('/jwt/metodosHttp', authenticateToken, (req, res) => {
  const methods = {
    get: {
      objetivo_principal: "Recuperar informações",
      limite_caracteres: "Não há limite específico",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    put: {
      objetivo_principal: "Atualizar informações",
      limite_caracteres: "Não há limite específico",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    post: {
      objetivo_principal: "Criar novas informações",
      limite_caracteres: "Não há limite específico",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    patch: {
      objetivo_principal: "Atualizar parcialmente informações",
      limite_caracteres: "Não há limite específico",
      aceita_https: "Sim",
      aceita_http: "Sim",
    },
    delete: {
      objetivo_principal: "Excluir informações",
      limite_caracteres: "Não há limite específico",
      aceita_https: "Sim",
      aceita_http: "Sim",
    }
  };

  res.json(methods);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
