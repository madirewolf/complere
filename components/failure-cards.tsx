"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Failure {
  number: string;
  title: string;
  body: string;
  detail: string;
}

const FAILURES: Failure[] = [
  {
    number: "01",
    title: "Treat symptoms.",
    body: "Reimbursement codes pay for procedures and prescriptions, not for prevention or root-cause work.",
    detail: "If a clinic gets paid more for managing your chronic disease than for resolving it, the system has incentivized the disease.",
  },
  {
    number: "02",
    title: "15-minute visits.",
    body: "Throughput drives revenue. Listening doesn't.",
    detail: "The average primary-care visit in North America is too short to take a meaningful history, let alone formulate a personalized prevention strategy.",
  },
  {
    number: "03",
    title: "10-year approval cycles.",
    body: "Regulatory timelines are calibrated to drugs that can recoup billions in development cost.",
    detail: "Anything you can't patent — old molecules, vitamins, lifestyle protocols — never gets the trials, even when the early evidence is strong.",
  },
  {
    number: "04",
    title: "Patent gates the science.",
    body: "Funding follows the molecule that can be owned.",
    detail: "If a compound is off-patent, no one will pay for the Phase III trial. So the version that probably works better stays a footnote.",
  },
];

export function FailureCards() {
  return (
    <div className="relative">
      <div className="-mx-6 overflow-x-auto overflow-y-visible px-6 pb-2">
        <div className="flex min-w-max gap-4 py-1">
          {FAILURES.map((f, i) => (
            <FailureCard key={f.number} item={f} index={i} />
          ))}
        </div>
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        Hover or tap a card →
      </p>
    </div>
  );
}

function FailureCard({ item, index }: { item: Failure; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className={cn(
        "flex w-[280px] flex-shrink-0 cursor-pointer flex-col border border-border bg-bg-elevated p-6 text-left transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none sm:w-[320px]",
        open && "border-fg"
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
        Failure {item.number}
      </span>
      <h3 className="mt-6 font-serif text-2xl italic leading-tight tracking-tight text-fg">
        {item.title}
      </h3>
      <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">
        {item.body}
      </p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-border pt-4 text-[13px] leading-relaxed text-fg-muted">
              {item.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
