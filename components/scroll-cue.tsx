"use client";

import { motion } from "motion/react";

export function ScrollCue() {
  return (
    <div className="mt-16 flex flex-col items-center gap-3" aria-hidden>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
        Scroll
      </span>
      <div className="relative h-12 w-px overflow-hidden bg-border">
        <motion.span
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.4,
          }}
          className="absolute inset-x-0 h-1/2 bg-fg"
        />
      </div>
    </div>
  );
}
