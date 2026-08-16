"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.6,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-4 top-1/2 z-30 hidden h-[40vh] -translate-y-1/2 md:block lg:left-6"
    >
      <div className="relative h-full w-px bg-border">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-0 bg-accent"
        />
      </div>
    </div>
  );
}
