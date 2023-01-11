// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "hilal.lucky@gmail.com" },
    update: {},
    create: {
      name: "Luqito Masdar Hilal",
      email: "hilal.lucky@gmail.com",
      role: "USER"
    }
  });

  const product_01 = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Haji Reguler",
      price: 2500,
      quantity: 100
    }
  });

  const product_02 = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Haji Special",
      price: 4000,
      quantity: 50
    }
  });

  const paymentType_01 = await prisma.paymentType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Cash"
    }
  });

  const paymentType_02 = await prisma.paymentType.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Cash"
    }
  });

  console.log({ post1, post2, user, product_01, product_02, paymentType_01, paymentType_02 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });