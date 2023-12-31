"use client";
import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import React from "react";
import clamp from "./utils/clamp";
import useBoundedScroll from "./hooks/useBoundedScroll";

export default function Page() {
  const { scrollYBoundedProgress } = useBoundedScroll(400);
  const scrollYBoundedProgressTrottle = useTransform(
    scrollYBoundedProgress,
    [0, 0.5, 1],
    [0, 0, 1]
  );
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1">
        <motion.header
          className="fixed inset-x-0 flex h-20 bg-white"
          style={{
            height: useTransform(
              scrollYBoundedProgressTrottle,
              [0, 1],
              [80, 50]
            ),
          }}
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              className="flex origin-left items-center text-xl font-semibold uppercase"
              style={{
                scale: useTransform(
                  scrollYBoundedProgressTrottle,
                  [0, 1],
                  [1, 0.9]
                ),
              }}
            >
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </motion.p>
            <motion.nav
              className="flex space-x-4 text-xs font-medium text-slate-400"
              style={{
                opacity: useTransform(
                  scrollYBoundedProgressTrottle,
                  [0, 1],
                  [1, 0]
                ),
              }}
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="mt-5 px-8 pt-8">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {Array.from(Array(2).keys()).map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {Array.from(Array(90).keys()).map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
