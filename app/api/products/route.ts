import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const products = await prisma.products.findMany();

  console.log(typeof products[0].price);

  return NextResponse.json({ products });
}
