"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const ref = useRef(null);
  return (
    <div className="flex space-x-10 p-5">
      <div className="bg-red-800 p-48" ref={ref}>
        <motion.button
          className="rounded bg-blue-800 px-3 py-2 text-white"
          // whileTap={{ scale: 0.9 }}
          // onPan={() => console.log("PANNING")}
          drag
          dragConstraints={ref}
          dragSnapToOrigin
          whileDrag={{ opacity: 0.7 }}
        >
          FRAMER
        </motion.button>
      </div>

      <button className="rounded bg-blue-800 px-3 py-2 text-white transition active:scale-90">
        TAILWIND
      </button>
    </div>
  );
}
