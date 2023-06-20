"use client";

import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const height = useMotionValue(80);
  const opacity = useMotionValue(1);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - scrollY.getPrevious();

    const scrollDown = diff > 0;

    if (scrollDown) {
      height.set(Math.max(50, height.get() - diff * 0.2));
      opacity.set(Math.max(0, opacity.get() - diff * 0.1));
    } else {
      height.set(Math.min(80, height.get() - diff * 0.2));
      opacity.set(Math.min(1, opacity.get() - diff * 0.1));
    }
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1">
        <motion.header
          className="fixed inset-0 flex h-20 bg-white shadow"
          style={{ height }}
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <p className="flex origin-left items-center text-xl font-semibold uppercase">
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </p>
            <motion.nav
              style={{ opacity }}
              className="flex space-x-4 text-xs font-medium text-slate-400"
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="mt-20 px-8 pt-8">
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
