"use client";
import { Products } from "@prisma/client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React from "react";
import Card from "./Card";

type Props = {
  products: Products[];
};

export default function Products({ products }: Props) {
  return (
    <MotionConfig transition={{ duration: 0.25 }}>
      <AnimatePresence initial={false}>
        {products.map(({ id, image, name, price }) => (
          // <motion.div
          //   key={id}
          //   className="h-48 w-48 bg-red-700"
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   exit={{ opacity: 0 }}
          // ></motion.div>
          <Card
            name={name}
            price={price}
            key={id}
            soldCount={9}
            imgUrl={`/products/${image}`}
          />
        ))}
      </AnimatePresence>
    </MotionConfig>
  );
}
