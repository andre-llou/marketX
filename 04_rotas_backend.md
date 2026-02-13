# Etapa 4 - Rotas do Backend

## Criar Investimento

``` js
router.post("/", async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    expectedReturn,
    contactInfo,
    imageUrl,
    userId
  } = req.body;

  const investment = await prisma.investment.create({
    data: {
      title,
      description,
      location,
      price: Number(price),
      expectedReturn,
      contactInfo,
      imageUrl,
      userId
    }
  });

  res.json(investment);
});
```

## Listar Investimentos

``` js
router.get("/", async (req, res) => {
  const investments = await prisma.investment.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(investments);
});
```
