"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      className="bg-green-500 h-56 w-56"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: 100 }}
    ></motion.div>
  );
}
