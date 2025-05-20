import { Request, Response } from "express";
import {
  criarNovaConta,
  realizarDeposito,
  realizarSaque,
  obterExtrato,
  bloquearConta,
} from "../services/contaService";

export async function criarConta(req: Request, res: Response) {
  try {
    const { idPessoa, limiteSaqueDiario, tipoConta } = req.body;
    const conta = await criarNovaConta({
      idPessoa,
      limiteSaqueDiario,
      tipoConta,
    });
    res.status(201).json(conta);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}

export async function depositar(req: Request, res: Response) {
  try {
    const idConta = Number(req.params.id);
    const { valor } = req.body;
    const result = await realizarDeposito(idConta, valor);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}

export async function sacar(req: Request, res: Response) {
  try {
    const idConta = Number(req.params.id);
    const { valor } = req.body;
    const result = await realizarSaque(idConta, valor);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}

export async function extrato(req: Request, res: Response) {
  try {
    const idConta = Number(req.params.id);
    const { inicio, fim } = req.query;
    const result = await obterExtrato(
      idConta,
      inicio?.toString(),
      fim?.toString()
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}

export async function bloquear(req: Request, res: Response) {
  try {
    const idConta = Number(req.params.id);
    const result = await bloquearConta(idConta);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}
