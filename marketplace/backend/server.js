require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const investmentsRouter = require("./routes/investments");
const usersRouter = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/investments", investmentsRouter);
app.use("/users", usersRouter);

// Test route
app.get("/", (req, res) => {
    res.send("Marketplace Backend is running");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
