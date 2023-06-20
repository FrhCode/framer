"use client";
import {
  AnimatePresence,
  Variants,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const ulVariants: Variants = {
  close: {
    height: 0,
    padding: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    height: "auto",
    padding: 8,

    transition: {
      // delayChildren: 0.2,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const liVariants: Variants = {
  close: {
    opacity: 0,
    y: -20,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

export default function Page() {
  const [isShowSelect, setIsShowSelect] = useState(false);
  return (
    <div className="flex justify-center p-20">
      <div
        className="relative flex w-36 cursor-pointer select-none items-center  justify-between rounded bg-blue-700 p-2 text-white"
        onClick={() => setIsShowSelect((isShowSelect) => !isShowSelect)}
      >
        <p>Select</p>
        <AiFillCaretDown />

        <AnimatePresence>
          {isShowSelect && (
            <motion.ul
              className="absolute bottom-0 left-0 right-0 translate-y-[105%] space-y-3 overflow-hidden rounded bg-blue-700 p-2"
              variants={ulVariants}
              initial="close"
              animate="open"
              exit="close"
              transition={{ type: "tween", ease: "linear" }}
            >
              <motion.li
                variants={liVariants}
                transition={{ type: "tween", ease: "linear" }}
              >
                Indonesia
              </motion.li>
              <motion.li
                variants={liVariants}
                transition={{ type: "tween", ease: "linear" }}
              >
                Malaysia
              </motion.li>
              <motion.li
                variants={liVariants}
                transition={{ type: "tween", ease: "linear" }}
              >
                Jepang
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
