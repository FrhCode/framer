"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const menus = [
  "Lorem, ipsum.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
];
export default function Page() {
  const [active, setActive] = useState(menus[0]);

  console.log(active);

  return (
    <div className="p-5">
      <ul className="flex space-x-5">
        {menus.map((menu) => (
          <li
            key={menu}
            className="relative cursor-pointer"
            onClick={() => setActive(menu)}
          >
            {menu}
            {active === menu && (
              <motion.div
                layoutId="a"
                className="absolute inset-x-0 -bottom-1 h-1 rounded bg-red-600"
              ></motion.div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

//
