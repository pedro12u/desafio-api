import request from "supertest";
import app from "../src/server";

describe("Conta API", () => {
  let contaId: number;
  let pessoaId: number;

  beforeAll(async () => {
    const pessoa = await request(app).post("/pessoas").send({
      nome: "Pedro Tosca",
      cpf: "800130225276",
      dataNascimento: "2004-04-09",
    });
    pessoaId = pessoa.body.idPessoa;
  });

  it("deve criar uma conta", async () => {
    const res = await request(app)
      .post("/contas")
      .send({ idPessoa: pessoaId, limiteSaqueDiario: 1000, tipoConta: 1 });

    expect(res.statusCode).toBe(201);
    console.log("ERRO:", res.body);

    expect(res.body).toHaveProperty("idConta");
    contaId = res.body.idConta;
  });

  it("deve realizar um depósito", async () => {
    const res = await request(app)
      .post(`/contas/${contaId}/deposito`)
      .send({ valor: 200 });

    expect(res.statusCode).toBe(200);
    console.log("ERRO:", res.body);

    expect(res.body.saldo).toBe(200);
    console.log("ERRO:", res.body);
  });

  it("deve realizar um saque", async () => {
    const res = await request(app)
      .post(`/contas/${contaId}/saque`)
      .send({ valor: 100 });

    expect(res.statusCode).toBe(200);
    console.log("ERRO:", res.body);

    expect(res.body.saldo).toBe(100);
    console.log("ERRO:", res.body);
  });

  it("deve retornar extrato", async () => {
    const res = await request(app).get(`/contas/${contaId}/extrato`);

    expect(res.statusCode).toBe(200);
    console.log("ERRO:", res.body);

    expect(res.body.transacoes.length).toBeGreaterThan(0);
  });

  it("deve bloquear a conta", async () => {
    const res = await request(app).patch(`/contas/${contaId}/bloquear`);

    expect(res.statusCode).toBe(200);
    console.log("ERRO:", res.body);

    expect(res.body.flagAtivo).toBe(false);
    console.log("ERRO:", res.body);
  });
});
