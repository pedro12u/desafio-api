import { Router } from "express";
import {
  criarConta,
  depositar,
  sacar,
  extrato,
  bloquear,
} from "../controllers/contaController";
const router = Router();

router.post("/", criarConta);
router.post("/:id/deposito", depositar);
router.post("/:id/saque", sacar);
router.get("/:id/extrato", extrato);
router.patch("/:id/bloquear", bloquear);

export default router;
