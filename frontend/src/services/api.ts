import axios from "axios";
import type { Pessoa, Conta, Extrato } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchPessoas = async (): Promise<Pessoa[]> => {
  const response = await api.get("/pessoas");
  return response.data;
};

export const criarConta = async (idPessoa: number): Promise<Conta> => {
  const response = await api.post("/contas", {
    idPessoa,
    limiteSaqueDiario: 1000,
    tipoConta: 1,
  });
  return response.data;
};

export const depositar = async (
  idConta: number,
  valor: number
): Promise<Conta> => {
  const response = await api.post(`/contas/${idConta}/deposito`, { valor });
  return response.data;
};

export const sacar = async (idConta: number, valor: number): Promise<Conta> => {
  const response = await api.post(`/contas/${idConta}/saque`, { valor });
  return response.data;
};

export const obterExtrato = async (
  idConta: number,
  inicio?: string,
  fim?: string
): Promise<Extrato> => {
  const params: Record<string, string> = {};
  if (inicio) params.inicio = inicio;
  if (fim) params.fim = fim;

  const response = await api.get(`/contas/${idConta}/extrato`, { params });
  return response.data;
};

export const criarPessoa = async (pessoa: {
  nome: string;
  cpf: string;
  dataNascimento: string;
}): Promise<Pessoa> => {
  const response = await api.post("/pessoas", pessoa);
  return response.data;
};

export const bloquear = async (idConta: number): Promise<void> => {
  await api.patch(`/contas/${idConta}/bloquear`);
};

export default api;
