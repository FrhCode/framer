"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export default function Page() {
  return (
    <div className="flex justify-center p-20">
      <motion.div
        className="h-56 w-56 rounded-full border border-red-600 border-t-transparent"
        animate={{ rotate: [0, 360] }}
        transition={{
          repeat: Infinity,
          type: "tween",
          ease: "linear",
          duration: 1,
        }}
      ></motion.div>
    </div>
  );
}
