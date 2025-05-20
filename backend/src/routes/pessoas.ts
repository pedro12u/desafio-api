import { Router } from "express";
import { criarPessoa, listarPessoas } from "../controllers/pessoaController";
const router = Router();

router.post("/", criarPessoa);
router.get("/", listarPessoas);
export default router;
