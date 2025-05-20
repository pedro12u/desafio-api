# Desafio Técnico - Sistema Bancário

Esse projeto é um sistema de gestão de contas, utilizando **Node.js (TypeScript)** no backend, **React** no frontend, e **SQL Server** como DB.

---

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Express + Prisma ORM
- **Frontend**: React + Vite + Tailwind CSS
- **Banco de Dados**: SQL Server

---

## ⚙️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone <nome do meu rep>
```

### 2. Configuração do backend

```bash
cd backend
npm install
```

#### Configurar `.env`

Crie um arquivo `.env` com a string de conexão do SQL Server:

```env
DATABASE_URL="sqlserver://seuusuario:suasenha@localhost:1433;database=nomedoDB;encrypt=true"
```

### 3. Inicializar o banco

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Rodar o backend

```bash
npm run dev
```

Servidor disponível em `http://localhost:3000`

---

### 5. Configuração do frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Funcionalidades implementadas

### Requisitos mínimos

- Criar conta (`POST /contas`)
- Depositar (`POST /contas/:id/deposito`)
- Sacar (`POST /contas/:id/saque`)
- Consultar saldo e extrato (`GET /contas/:id/extrato`)
- Bloquear conta (`PATCH /contas/:id/bloquear`)
- Tela de extrato

### Diferenciais entregues

- Extrato por período (`inicio` e `fim` como query params)
- Testes automatizados no backend (Jest)
- Parte visual detalhada

---

## Endpoints principais

### Criar conta

```http
POST /contas
```

Body:

```json
{
  "idPessoa": 1,
  "limiteSaqueDiario": 1000,
  "tipoConta": 1
}
```

### Depositar

```http
POST /contas/1/deposito
```

Body:

```json
{ "valor": 200 }
```

### Sacar

```http
POST /contas/1/saque
```

Body:

```json
{ "valor": 100 }
```

### Extrato (com ou sem período)

```http
GET /contas/1/extrato?inicio=2025-01-01&fim=2025-12-31
```

### Bloquear conta

```http
PATCH /contas/1/bloquear
```

---

## Considerações finais

- Projeto organizado em camadas (controller, service, routes)
- Frontend limpo e funcional
- Banco modelado com relacionamento entre Pessoa, Conta e Transacao
- Priorizando sempre o funcionamento e estrutura do projeto, para garantir facilidade de trabalho e de uso

---

Desenvolvido por Pedro Toscano
