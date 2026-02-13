# Etapa 3 - Configuração do Backend

## Inicialização

``` bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv prisma @prisma/client bcrypt jsonwebtoken multer
```

## Inicializar Prisma

``` bash
npx prisma init
npx prisma migrate dev --name init
```

## Estrutura Básica do Servidor

``` js
const express = require("express");
const app = express();

app.use(express.json());

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
```
