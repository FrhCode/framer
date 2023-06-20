"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false);
  return (
    <div className="">
      <h1
        onClick={() =>
          setIsAccordianOpen((isAccordianOpen) => !isAccordianOpen)
        }
      >
        Pertanyaan
      </h1>
      <AnimatePresence>
        {isAccordianOpen && (
          <motion.p
            className="w-56 overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            dignissimos, deleniti aspernatur rem adipisci culpa suscipit
            asperiores iure natus, veniam magni accusantium earum ipsa aliquid
            hic voluptatum? Omnis, incidunt repellat.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
