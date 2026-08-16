"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface Section {
  id: string;
  number: string;
  title: string;
}

interface SectionIndicatorProps {
  sections: Section[];
}

export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [active, setActive] = useState(sections[0]?.id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const center = window.innerHeight * 0.4;
      let best: { id: string; distance: number } | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const sectionCenter = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(sectionCenter - center);
        if (!best || distance < best.distance) {
          best = { id: s.id, distance };
        }
      }
      if (best) setActive(best.id);
      setVisible(window.scrollY > 400);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <AnimatePresence mode="wait">
        {visible && current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-right"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
              {current.number} / {sections.length.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 max-w-[160px] font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
              {current.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
