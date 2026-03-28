const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let pessoas = [];
let id = 1;

app.get("/", (req, res) => {
  res.send("API YOLO rodando 🚀");
});

app.get("/pessoas", (req, res) => {
  let { tipo } = req.query;

  if (tipo) {
    tipo = tipo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return res.json(
      pessoas.filter(p =>
        p.tipo
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === tipo
      )
    );
  }

  res.json(pessoas);
});

app.get("/importar", async (req, res) => {
  try {
    const response = await axios.get(
      "https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo"
    );

    const body = JSON.parse(response.data.body);
    const clientes = body.clientes;

    pessoas = [];
    id = 1;

    clientes.forEach(p => {
      pessoas.push({
        id: id++,
        nome: p["Nome"],
        telefone: p["Telefone"],
        email: p["E-mail"],
        tipo: p["Tipo"]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
        dataCadastro: p["Data de Cadastro"]
      });
    });

    res.send("Dados importados com sucesso!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Erro ao importar");
  }
});

app.post("/pessoas", (req, res) => {
  const novaPessoa = {
    id: id++,
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    dataCadastro: req.body.dataCadastro,
    tipo: req.body.tipo
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  };

  pessoas.push(novaPessoa);

  res.json(novaPessoa);
});

app.delete("/pessoas/:id", (req, res) => {
  const idParam = parseInt(req.params.id);

  pessoas = pessoas.filter(p => p.id !== idParam);

  res.send("Pessoa removida");
});

app.put("/pessoas/:id", (req, res) => {
  const idParam = parseInt(req.params.id);

  const pessoa = pessoas.find(p => p.id === idParam);

  if (!pessoa) {
    return res.status(404).send("Pessoa não encontrada");
  }

  pessoa.nome = req.body.nome;
  pessoa.email = req.body.email;
  pessoa.telefone = req.body.telefone;
  pessoa.dataCadastro = req.body.dataCadastro;
  pessoa.tipo = req.body.tipo
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  res.json(pessoa);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});