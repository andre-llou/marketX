const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("123", 10);

    // Create Admin
    await prisma.user.upsert({
        where: { email: "admin@test.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@test.com",
            password: hashedPassword,
            role: "ADMIN"
        }
    });

    // Create Standard User
    await prisma.user.upsert({
        where: { email: "user@test.com" },
        update: {},
        create: {
            name: "Standard User",
            email: "user@test.com",
            password: hashedPassword,
            role: "USER"
        }
    });

    console.log("Seeding completed: Admin and User accounts created.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
