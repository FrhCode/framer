"use client";
import React, { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { faker } from "@faker-js/faker";

const LIST = [
  "maxime saepe inventore",
  "accusantium repudiandae sint",
  "iure inventore dolores reprehenderit",
  "nam provident harum quo",
  "quae debitis at accusamus laborum",
  "iusto consectetur officiis ipsa voluptatum",
];

export default function Page() {
  const [listMenu, setListMenu] = useState(LIST);

  function swapElements<T>(arr: T[], index1: number, index2: number): T[] {
    if (
      index1 < 0 ||
      index1 >= arr.length ||
      index2 < 0 ||
      index2 >= arr.length
    ) {
      return arr;
    }

    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    return arr;
  }

  function addStringToArray(arr: string[], str: string): string[] {
    const index = Math.floor(Math.random() * (arr.length + 1));
    arr.splice(index, 0, str);
    return arr;
  }

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="p-5">
        <button
          className="absolute bottom-6 left-5 rounded bg-blue-800 px-3 py-2 text-white"
          onClick={() => {
            setListMenu(
              addStringToArray(
                [...listMenu],
                faker.lorem.words(faker.number.int({ max: 5, min: 3 }))
              )
            );
          }}
        >
          Add List
        </button>
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {listMenu.map((list, index) => (
              <motion.li
                key={list}
                className="rounded bg-blue-800 text-white [&:first-child>div>div>*:nth-child(2)]:hidden [&:last-child>div>div>*:nth-child(1)]:hidden"
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
              >
                <div className="flex items-center justify-between px-2 py-3">
                  {list}
                  <div className="flex space-x-3">
                    <div
                      className="cursor-pointer rounded p-2 transition hover:bg-white hover:text-black"
                      onClick={() => {
                        const newList = swapElements(
                          [...listMenu],
                          index,
                          index + 1
                        );

                        setListMenu(newList);
                      }}
                    >
                      <AiFillCaretDown />
                    </div>
                    <div
                      className="cursor-pointer rounded p-2 transition hover:bg-white hover:text-black"
                      onClick={() => {
                        const newList = swapElements(
                          [...listMenu],
                          index,
                          index - 1
                        );

                        setListMenu(newList);
                      }}
                    >
                      <AiFillCaretUp />
                    </div>
                    <div
                      className="cursor-pointer rounded p-2 transition hover:bg-white hover:text-black"
                      onClick={() => {
                        setListMenu(
                          [...listMenu].filter((text) => text != list)
                        );
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </MotionConfig>
  );
}
