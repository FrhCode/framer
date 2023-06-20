"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type AnimationState = { x: number; y: number; rotate: number; scale: number };

export default function Page() {
  const [animationState, setAnimationState] = useState<AnimationState>({
    rotate: 0,
    scale: 1,
    x: 0,
    y: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;

    setAnimationState({ ...animationState, [name]: parseInt(e.target.value) });

    console.log(name);
  };

  return (
    <div>
      <motion.div
        className="bg-green-500 h-56 w-56"
        animate={{
          x: animationState.x,
          y: animationState.y,
          rotate: animationState.rotate,
          scale: animationState.scale,
        }}
      ></motion.div>
      <div>
        <div>
          <label htmlFor="">X</label>
          <input
            type="range"
            name="x"
            id=""
            min={0}
            max={400}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Y</label>
          <input
            type="range"
            name="y"
            id=""
            min={0}
            max={400}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">rotate</label>
          <input
            type="range"
            name="rotate"
            id=""
            min={0}
            max={400}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
