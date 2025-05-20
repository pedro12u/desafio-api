import express from "express";
import dotenv from "dotenv";
import pessoaRoutes from "./routes/pessoas";
import contaRoutes from "./routes/contas";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/pessoas", pessoaRoutes);
app.use("/contas", contaRoutes);

export default app;
