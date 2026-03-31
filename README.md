#  YOLO Coliving - Sistema de Gestão de Pessoas

## 📌 Descrição

Aplicação full stack para gerenciamento de pessoas em um sistema de coliving.

O sistema permite importar dados de uma API externa e realizar operações completas de CRUD (criar, listar, editar e excluir pessoas).

---

## 🛠️ Tecnologias utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

### Backend (Local)

* Node.js
* Express

### Backend (Produção - AWS)

* AWS Lambda (Node.js)
* API Gateway (HTTP API)
* DynamoDB

---

## ⚙️ Funcionalidades

✔ Importação de dados via API externa
✔ Listagem de pessoas
✔ Filtro por tipo (hóspede, proprietário, etc)
✔ Cadastro de novas pessoas
✔ Edição de dados
✔ Exclusão com confirmação

---

## 📡 API em Produção (AWS)

A API está publicada via AWS:

```
https://g3siujnt86.execute-api.sa-east-1.amazonaws.com
```

### Endpoints

* GET `/pessoas` → Lista todas as pessoas
* POST `/pessoas` → Cria nova pessoa
* PUT `/pessoas/{id}` → Atualiza pessoa
* DELETE `/pessoas/{id}` → Remove pessoa
* GET `/importar` → Importa dados externos

---

## 🔗 API Externa (Importação)

Os dados são importados de:

```
https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo
```

---

## ☁️ Arquitetura na AWS

A aplicação foi adaptada para arquitetura serverless:

* API Gateway → Entrada das requisições HTTP
* AWS Lambda → Processamento da lógica da aplicação
* DynamoDB → Armazenamento dos dados
* Frontend → Consome a API via HTTP

---

## ⚠️ Desafio técnico enfrentado (CORS)

Durante a integração entre frontend e backend na AWS, foi encontrado um problema de CORS.

### Problema

O frontend rodando em:

```
http://localhost:5500
```

não conseguia consumir a API devido ao bloqueio do navegador:

```
No 'Access-Control-Allow-Origin' header
```

### Causa

* CORS não estava corretamente configurado no API Gateway
* O header não foi aplicado porque o valor não havia sido adicionado corretamente na interface da AWS

### Solução

* Configuração de CORS no API Gateway
* Inclusão correta do `*` em `Access-Control-Allow-Origin`
* Ajuste do frontend para rodar via servidor local (`http.server`) ao invés de `file://`

---

## 🧠 Decisões Técnicas

* Utilização de arquitetura serverless para simplificação de infraestrutura
* Uso de DynamoDB para escalabilidade e flexibilidade de dados
* Separação entre frontend e backend via API REST
* Execução do frontend via servidor local para evitar problemas de CORS

---

## ▶️ Como executar o projeto

### 🔹 Backend local (opcional)

```bash
cd backend
npm install
node server.js
```

---

### 🔹 Frontend

```bash
cd yolo-coliving-case
py -m http.server 5500
```

Acesse:

```
http://localhost:5500/frontend/
```

---

## 📂 Estrutura do projeto

```
yolo-coliving-case/
├── backend/
├── frontend/
│   ├── index.html
│   ├── js/
│   └── css/
```

---

## 📈 Possíveis melhorias

* Deploy do frontend com S3 + CloudFront
* Autenticação de usuários (JWT)
* Paginação e busca avançada
* Validações mais robustas
* Testes automatizados

---

## 👨‍💻 Autor

David Jeremias
