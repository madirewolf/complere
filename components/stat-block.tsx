"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CountUp } from "./count-up";
import { citations } from "@/lib/data/citations";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRight } from "lucide-react";

interface StatBlockProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  context: string;
  detail?: string;
  citationId?: string;
  className?: string;
  align?: "left" | "center";
}

export function StatBlock({
  value,
  decimals = 0,
  prefix,
  suffix,
  display,
  context,
  detail,
  citationId,
  className,
  align = "left",
}: StatBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const citation = citationId ? citations[citationId] : null;

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
      role="group"
      aria-expanded={expanded}
      className={cn(
        "group relative cursor-default select-none focus:outline-none",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <motion.div layout="position" className="font-serif text-5xl italic leading-[0.95] tracking-tight text-fg sm:text-6xl md:text-7xl">
        {display ? (
          <span>{display}</span>
        ) : (
          <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
        )}
      </motion.div>
      <motion.p layout="position" className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
        {context}
      </motion.p>
      <AnimatePresence>
        {expanded && (detail || citation) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-border pt-4">
              {detail && (
                <p className="max-w-md text-sm leading-relaxed text-fg-muted">{detail}</p>
              )}
              {citation && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                  {citation.authors.split(",")[0]} et al. · {citation.journal} · {citation.year}
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="ml-2 inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-70"
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
