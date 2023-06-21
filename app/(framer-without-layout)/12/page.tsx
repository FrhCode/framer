"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function Page() {
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  let month = parse(monthString, "yyyy-MM", new Date());
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  function nextMonth() {
    let next = addMonths(month, 1);
    setDirection(1);
    setMonthString(format(next, "yyyy-MM"));
  }

  function previousMonth() {
    let previous = subMonths(month, 1);
    setDirection(-1);
    setMonthString(format(previous, "yyyy-MM"));
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig transition={{ duration: 0.4 }}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="py-8">
            <motion.div
              animate={{
                height: bounds.height > 0 ? bounds.height : undefined,
              }}
            >
              <div ref={ref}>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.div
                    className="flex flex-col justify-center rounded text-center"
                    key={monthString}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <header className="relative flex justify-between px-8">
                      <button
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <FiChevronLeft className="h-4 w-4" />
                      </button>
                      <motion.p
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                        variants={variants}
                        custom={direction}
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)",
                        }}
                      >
                        {format(month, "MMMM yyyy")}
                      </motion.p>
                      <button
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <FiChevronRight className="h-4 w-4" />
                      </button>
                    </header>

                    <motion.div
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
                      variants={removeImmediately}
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>

                    <motion.div
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
                      variants={variants}
                      custom={direction}
                    >
                      {days.map((day) => (
                        <span
                          className={`${
                            isSameMonth(day, month) ? "" : "text-stone-300"
                          } font-semibold`}
                          key={format(day, "yyyy-MM-dd")}
                        >
                          {format(day, "d")}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

const variants: Variants = {
  initial: (direction) => {
    return { x: `${1 * direction * 100}%`, opacity: 0 };
  },
  animate: { x: "-0%", opacity: 1 },
  exit: (direction) => {
    return { x: `${-1 * direction * 100}%`, opacity: 0 };
  },
};

const removeImmediately: Variants = {
  exit: { visibility: "hidden" },
};
