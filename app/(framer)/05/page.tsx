"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export default function Page() {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const [isShow, setIsShow] = useState(true);

  return (
    <div className="space-y-5 p-48">
      <AnimatePresence>
        {isShow && (
          <motion.div
            exit={{
              height: 0,
              opacity: 0,
              transition: { opacity: { duration: 0 } },
            }}
          >
            <motion.div
              className="h-64 w-64 bg-green-700"
              drag
              dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
              style={{ opacity, x }}
              onDragEnd={(event, info) => {
                console.log(info);

                if (Math.abs(info.offset.x) > 200) {
                  setIsShow(false);
                }
              }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="h-64 w-64 bg-red-700"></motion.div>
    </div>
  );
}
