import idrCurrenyFormat from "@/app/utils/idrCurrenyFormat";
import Image from "next/image";
import { motion } from "framer-motion";

type props = { name: string; soldCount: number; price: number; imgUrl: string };

export default function Card({ name, soldCount, price, imgUrl }: props) {
  return (
    <motion.div
      className="border bg-white shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <div className="relative h-60 w-full">
        <Image src={imgUrl} alt="" fill className="object-cover" />
      </div>

      <div className="border-t p-4">
        <p className="font-semibold">{name}</p>
        <span className="mt-5 flex justify-between text-sm">
          <p>Terjual {soldCount}</p>
          <p className="font-semibold">{idrCurrenyFormat(price)}</p>
        </span>
      </div>
    </motion.div>
  );
}
