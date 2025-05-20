import { Request, Response } from "express";
import { criarNovaPessoa } from "../services/pessoaService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function criarPessoa(req: Request, res: Response) {
  try {
    const { nome, cpf, dataNascimento } = req.body;
    const novaPessoa = await criarNovaPessoa({ nome, cpf, dataNascimento });
    res.status(201).json(novaPessoa);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}

export async function listarPessoas(req: Request, res: Response) {
  try {
    const pessoas = await prisma.pessoa.findMany({
      select: {
        idPessoa: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
      },
    });
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar pessoas." });
  }
}
