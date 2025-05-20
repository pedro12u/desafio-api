import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface PessoaInput {
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export async function criarNovaPessoa(dados: PessoaInput) {
  const { cpf } = dados;
  const pessoaExistente = await prisma.pessoa.findUnique({ where: { cpf } });
  if (pessoaExistente) throw new Error("CPF já cadastrado.");

  return await prisma.pessoa.create({
    data: { ...dados, dataNascimento: new Date(dados.dataNascimento) },
  });
}

