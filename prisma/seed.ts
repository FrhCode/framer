import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { prisma } from "./client";

const PRODUCTS_COUNT = 1000;

async function seed() {
  const productsImageFolder = path.join(process.cwd(), "public", "products");

  const listImageInProductsFolder = fs
    .readdirSync(productsImageFolder)
    .filter((file) => new RegExp(".*.(jpg|png|webp)$", "gi").exec(file));

  await prisma.products.deleteMany();

  for (let index = 0; index < PRODUCTS_COUNT; index++) {
    const randomImage =
      listImageInProductsFolder[
        Math.floor(Math.random() * listImageInProductsFolder.length)
      ];

    await prisma.products.create({
      data: {
        image: randomImage,
        name: faker.person.fullName(),
        price: faker.number.int({ max: 1000000, min: 10000 }),
      },
    });
  }

  // GENERATE PURCHASES
  const products = await prisma.products.findMany({});

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
