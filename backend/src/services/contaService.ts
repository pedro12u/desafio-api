import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ContaInput {
  idPessoa: number;
  limiteSaqueDiario: number;
  tipoConta: number;
}

export async function criarNovaConta(dados: ContaInput) {
  const { idPessoa, limiteSaqueDiario, tipoConta } = dados;
  return await prisma.conta.create({
    data: {
      idPessoa,
      limiteSaqueDiario,
      tipoConta,
    },
  });
}

export async function realizarDeposito(idConta: number, valor: number) {
  if (valor <= 0) throw new Error("Valor do depósito deve ser positivo.");

  const conta = await prisma.conta.findUnique({ where: { idConta } });
  if (!conta || !conta.flagAtivo)
    throw new Error("Conta inexistente ou inativa.");

  await prisma.transacao.create({
    data: {
      idConta,
      valor,
    },
  });

  return await prisma.conta.update({
    where: { idConta },
    data: { saldo: conta.saldo + valor },
  });
}

export async function realizarSaque(idConta: number, valor: number) {
  if (valor <= 0) throw new Error("Valor do saque deve ser positivo.");

  const conta = await prisma.conta.findUnique({ where: { idConta } });
  if (!conta || !conta.flagAtivo)
    throw new Error("Conta inexistente ou inativa.");
  if (valor > conta.saldo) throw new Error("Saldo insuficiente.");
  if (valor > conta.limiteSaqueDiario)
    throw new Error("Limite de saque diário excedido.");

  await prisma.transacao.create({
    data: {
      idConta,
      valor: -valor,
    },
  });

  return await prisma.conta.update({
    where: { idConta },
    data: { saldo: conta.saldo - valor },
  });
}

export async function obterExtrato(
  idConta: number,
  inicio?: string,
  fim?: string
) {
  const conta = await prisma.conta.findUnique({
    where: { idConta },
    include: { transacoes: true },
  });

  if (!conta) throw new Error("Conta não encontrada.");

  const start = inicio ? new Date(inicio) : new Date(0);
  const end = fim ? new Date(fim + "T23:59:59.999") : new Date();

  const transacoes = conta.transacoes.filter((t) => {
    const dt = new Date(t.dataTransacao);
    return dt >= start && dt <= end;
  });

  return {
    saldo: conta.saldo,
    flagAtivo: conta.flagAtivo,
    transacoes,
  };
}

export async function bloquearConta(idConta: number) {
  const conta = await prisma.conta.findUnique({ where: { idConta } });
  if (!conta) throw new Error("Conta não encontrada.");

  return await prisma.conta.update({
    where: { idConta },
    data: { flagAtivo: false },
  });
}
