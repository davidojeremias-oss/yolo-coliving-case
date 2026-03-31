import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "sa-east-1" });
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE = "pessoas";

export const handler = async (event) => {
  try {
    const method = event.requestContext?.http?.method;
    const path = event.rawPath;

    if (method === "OPTIONS") {
      return response(200, { message: "CORS ok" });
    }

    // GET /pessoas
    if (method === "GET" && path === "/pessoas") {
      const data = await dynamo.send(
        new ScanCommand({
          TableName: TABLE
        })
      );

      return response(200, data.Items || []);
    }

    // GET /importar
    if (method === "GET" && path === "/importar") {
      const apiResponse = await fetch(
        "https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo"
      );

      const apiData = await apiResponse.json();
      const body = JSON.parse(apiData.body);
      const clientes = body.clientes || [];

      for (const p of clientes) {
        const pessoa = {
          id: Date.now().toString() + Math.random().toString(16).slice(2),
          nome: p["Nome"] || "",
          email: p["E-mail"] || "",
          telefone: p["Telefone"] || "",
          tipo: (p["Tipo"] || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
          dataCadastro: p["Data de Cadastro"] || ""
        };

        await dynamo.send(
          new PutCommand({
            TableName: TABLE,
            Item: pessoa
          })
        );
      }

      return response(200, {
        message: "Dados importados com sucesso",
        total: clientes.length
      });
    }

    // POST /pessoas
    if (method === "POST" && path === "/pessoas") {
      const body = JSON.parse(event.body || "{}");

      const pessoa = {
        id: Date.now().toString(),
        nome: body.nome || "",
        email: body.email || "",
        telefone: body.telefone || "",
        tipo: body.tipo || "",
        dataCadastro: body.dataCadastro || new Date().toISOString().split("T")[0]
      };

      await dynamo.send(
        new PutCommand({
          TableName: TABLE,
          Item: pessoa
        })
      );

      return response(200, pessoa);
    }

    // DELETE /pessoas/{id}
    if (method === "DELETE" && event.pathParameters?.id) {
      const id = event.pathParameters.id;

      await dynamo.send(
        new DeleteCommand({
          TableName: TABLE,
          Key: { id }
        })
      );

      return response(200, { message: "Removido" });
    }

    // PUT /pessoas/{id}
    if (method === "PUT" && event.pathParameters?.id) {
      const id = event.pathParameters.id;
      const body = JSON.parse(event.body || "{}");

      await dynamo.send(
        new UpdateCommand({
          TableName: TABLE,
          Key: { id },
          UpdateExpression: "SET nome = :n, email = :e, telefone = :t, tipo = :tp, dataCadastro = :d",
          ExpressionAttributeValues: {
            ":n": body.nome || "",
            ":e": body.email || "",
            ":t": body.telefone || "",
            ":tp": body.tipo || "",
            ":d": body.dataCadastro || new Date().toISOString().split("T")[0]
          }
        })
      );

      return response(200, { message: "Atualizado" });
    }

    return response(404, { message: "Rota não encontrada" });
  } catch (error) {
    console.error("ERRO LAMBDA:", error);
    return response(500, {
      message: "Erro interno",
      erro: error.message
    });
  }
};

function response(status, body) {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
    },
    body: JSON.stringify(body)
  };
}