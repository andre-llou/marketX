# Etapa 2 - Modelagem do Banco de Dados

## Tabela: users

-   id
-   name
-   email
-   password
-   created_at

## Tabela: investments

-   id
-   title
-   description
-   location
-   price
-   expected_return
-   contact_info
-   image_url
-   user_id (FK)
-   created_at

## Prisma Schema

``` prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  investments Investment[]
  createdAt DateTime @default(now())
}

model Investment {
  id             Int      @id @default(autoincrement())
  title          String
  description    String
  location       String
  price          Float
  expectedReturn String
  contactInfo    String
  imageUrl       String
  user           User     @relation(fields: [userId], references: [id])
  userId         Int
  createdAt      DateTime @default(now())
}
```
