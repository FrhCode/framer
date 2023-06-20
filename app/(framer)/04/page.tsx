"use client";
import React from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const navVariants: Variants = {
  open: { translateX: "0%" },
  close: { translateX: "-100%", transition: { delay: 0.2 } },
};

const ulVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      staggerDirection: -1,
    },
  },
  close: {},
};

const liVariants: Variants = {
  open: { translateY: 0 },
  close: { translateY: -10 },
};

export default function Page() {
  const [iseNavOpen, setIseNavOpen] = useState<boolean>(true);

  return (
    <div className="p-5">
      <RxHamburgerMenu
        className="cursor-pointer"
        size={30}
        onClick={() => setIseNavOpen(true)}
      />
      <Nav open={iseNavOpen} toogle={setIseNavOpen} />
    </div>
  );
}

type NavProps = {
  open: boolean;
  toogle: React.Dispatch<React.SetStateAction<boolean>>;
};

const listItem = ["item 1", "item 2", "item 3", "item 4"];

function Nav({ open, toogle }: NavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={() => toogle(false)}
          className="fixed left-0 top-0 h-screen w-72 bg-blue-800 p-5"
          variants={navVariants}
          initial="close"
          animate="open"
          exit="close"
          transition={{ type: "tween", ease: "easeOut" }}
        >
          <motion.ul className="space-y-4 text-white" variants={ulVariants}>
            <motion.li
              className="flex cursor-pointer justify-end underline"
              variants={liVariants}
            >
              <RxHamburgerMenu className="cursor-pointer" size={30} />
            </motion.li>
            {listItem.map((item) => (
              <motion.li
                className="cursor-pointer underline"
                variants={liVariants}
                key={item}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
