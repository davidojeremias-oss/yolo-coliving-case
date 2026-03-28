# 🚀 YOLO Coliving - Sistema de Gestão de Pessoas

## 📌 Descrição
Aplicação full stack para gerenciamento de pessoas em um sistema de coliving.

Permite importar dados de uma API externa, cadastrar, listar, filtrar, editar e excluir pessoas.

---

## 🛠️ Tecnologias utilizadas

- Node.js → Backend da aplicação
- Express → Framework para criação da API
- HTML/CSS → Interface do usuário
- JavaScript → Lógica do frontend
- Axios → Consumo de API externa

---

## ⚙️ Funcionalidades

✔ Importação de dados via API REST  
✔ Listagem de pessoas  
✔ Filtro por tipo (hóspede, proprietário, etc)  
✔ Cadastro de novas pessoas  
✔ Edição de dados  
✔ Exclusão com confirmação  

---

## 📡 Integração com API

Os dados iniciais são importados da API:

https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo

---

## 🔗 Endpoints da API

GET /pessoas → Lista todas as pessoas  
GET /pessoas?tipo= → Filtra por tipo  
POST /pessoas → Cria nova pessoa  
PUT /pessoas/:id → Atualiza pessoa  
DELETE /pessoas/:id → Remove pessoa  
GET /importar → Importa dados externos  

---

## ☁️ Arquitetura (Proposta AWS)

A aplicação foi desenvolvida de forma simples para o case, mas seguindo conceitos de microsserviços.

Em um ambiente real na AWS, a arquitetura seria:

- API Gateway → Entrada das requisições
- AWS Lambda → Processamento da lógica
- DynamoDB → Banco de dados NoSQL
- Frontend consumindo a API

---

## 🧠 Decisões Técnicas

Para simplificação do desenvolvimento, os dados estão armazenados em memória.

Em um ambiente real, seria utilizado DynamoDB ou RDS para persistência.

---

## ▶️ Como executar o projeto

### Backend

```bash
cd backend
npm install
node server.js
