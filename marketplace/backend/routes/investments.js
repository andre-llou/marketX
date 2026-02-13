const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// List Investments
router.get("/", async (req, res) => {
    try {
        const investments = await prisma.investment.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching investments" });
    }
});

// Get single investment
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const investment = await prisma.investment.findUnique({
            where: { id: Number(id) }
        });
        if (!investment) return res.status(404).json({ error: "Investment not found" });
        res.json(investment);
    } catch (error) {
        res.status(500).json({ error: "Error fetching investment" });
    }
});

// Create Investment
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            price,
            expectedReturn,
            contactInfo,
            role
        } = req.body;

        const imageUrl = req.file ? `http://localhost:3001/uploads/${req.file.filename}` : req.body.imageUrl;

        let userId = req.body.userId;

        // Handle missing userId for demo purposes
        if (!userId) {
            const defaultUser = await prisma.user.findFirst();
            if (defaultUser) {
                userId = defaultUser.id;
            } else {
                const newUser = await prisma.user.create({
                    data: {
                        name: "Default User",
                        email: "default@example.com",
                        password: "password123", // In real app, hash this
                        role: role || "USER"
                    }
                });
                userId = newUser.id;
            }
        }

        const investment = await prisma.investment.create({
            data: {
                title,
                description,
                location,
                price: Number(price),
                expectedReturn,
                contactInfo,
                imageUrl,
                creatorId: Number(userId)
            }
        });

        res.status(201).json(investment);
    } catch (error) {
        console.error("Error creating investment:", error);
        res.status(500).json({ error: "Error creating investment" });
    }
});

// Update an investment (Admin)
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, location, price, expectedReturn, contactInfo, imageUrl } = req.body;

    try {
        const updatedInvestment = await prisma.investment.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                location,
                price: Number(price),
                expectedReturn,
                contactInfo,
                imageUrl
            }
        });
        res.json(updatedInvestment);
    } catch (error) {
        console.error("Error updating investment:", error);
        res.status(500).json({ error: "Error updating investment" });
    }
});

// Delete an investment (Admin)
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.investment.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting investment:", error);
        res.status(500).json({ error: "Error deleting investment" });
    }
});

// User invests in an item
router.post("/:id/invest", async (req, res) => {
    const { id } = req.params;
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ error: "Missing userId or amount" });
    }

    try {
        const investment = await prisma.userInvestment.create({
            data: {
                userId: Number(userId),
                investmentId: Number(id),
                amount: Number(amount)
            }
        });
        res.status(201).json(investment);
    } catch (error) {
        console.error("Error investing:", error);
        res.status(500).json({ error: "Error investing in item" });
    }
});

module.exports = router;
