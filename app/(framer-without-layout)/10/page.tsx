"use client";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import Image from "next/image";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import image1 from "@/public/images/1.jpeg";
import image2 from "@/public/images/2.jpeg";
import image3 from "@/public/images/3.jpeg";
import image4 from "@/public/images/4.jpeg";
import image5 from "@/public/images/5.jpeg";
import image6 from "@/public/images/6.jpeg";

let images = [image1, image2, image3, image4, image5, image6];

const FULL_ASPECT_RATIO = 3 / 3;
const COLLAPSE_ASPECT_RATIO = 1 / 3;
const GAP = 2;
const MARGIN = 6;

export default function Page() {
  let [index, setIndex] = useState(0);

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative h-[500px]">
            <motion.div className="h-full w-full overflow-hidden">
              <motion.div
                className="flex h-full w-full"
                animate={{ x: `-${index}00%` }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-full w-full flex-shrink-0"
                  >
                    <Image
                      src={image}
                      alt="image"
                      fill
                      // sizes="100vw"
                      style={{
                        objectFit: "cover",
                        // objectPosition: "center",
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ backgroundColor: "var(--white)" }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60"
                  onClick={() => setIndex(index - 1)}
                >
                  <BiChevronLeft className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ backgroundColor: "var(--white)" }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60"
                  onClick={() => setIndex(index + 1)}
                >
                  <BiChevronRight className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div
          className="mt-3 flex h-20 w-full justify-center overflow-hidden"
          style={{ aspectRatio: FULL_ASPECT_RATIO }}
        >
          <motion.div
            className="flex h-full"
            initial={false}
            animate={{
              x: `-${
                index * 100 * (COLLAPSE_ASPECT_RATIO / FULL_ASPECT_RATIO) +
                index * GAP +
                MARGIN
              }%`,
              aspectRatio: FULL_ASPECT_RATIO,
              gap: `${GAP}%`,
            }}
          >
            {images.map((image, i) => (
              <motion.button
                key={i}
                onClick={() => setIndex(i)}
                className="relative h-full flex-shrink-0"
                initial={false}
                animate={index === i ? "active" : "inActive"}
                variants={{
                  active: {
                    aspectRatio: FULL_ASPECT_RATIO,
                    marginLeft: `${MARGIN}%`,
                    marginRight: `${MARGIN}%`,
                    opacity: 1,
                  },
                  inActive: {
                    aspectRatio: COLLAPSE_ASPECT_RATIO,
                    marginLeft: `${0}%`,
                    marginRight: `${0}%`,
                    opacity: 0.3,
                  },
                }}
              >
                <Image
                  src={image}
                  alt="image"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
