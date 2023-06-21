import Link from "next/link";
import React, { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/prisma/client";
import SearchInput from "./components/SearchInput";
import Products from "./components/Products";

export default async function Page({ searchParams }: { searchParams: any }) {
  const products = await prisma.products.findMany({
    where: { name: { contains: searchParams.search, mode: "insensitive" } },
    take: 100,
  });

  return (
    <div className="mx-auto px-10 pt-20">
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/login"} className="relative block h-28 w-28">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              priority
              quality={80}
            />
          </Link>
        </div>
        <SearchInput />
      </div>
      <div className="lg:gric grid grid-cols-4 gap-5 lg:grid-cols-3">
        <Products products={products} />
      </div>
    </div>
  );
}
