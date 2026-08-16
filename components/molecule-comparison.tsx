"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Side = "s" | "r";

const SIDES: Record<
  Side,
  {
    label: string;
    sub: string;
    badge: string;
    annotation: string;
    icon: typeof Check;
    accent: boolean;
  }
> = {
  s: {
    label: "S-ketamine",
    sub: "Esketamine · Spravato",
    badge: "Approved · profitable",
    annotation:
      "Isolating one enantiomer made the molecule patent-eligible again. The 14-2 advisory vote, the rejected NHS bid, the SMD of 0.28 — none of that mattered next to a fresh patent.",
    icon: Check,
    accent: true,
  },
  r: {
    label: "R-ketamine",
    sub: "More effective · less patentable",
    badge: "Stuck in research",
    annotation:
      "Preclinical work consistently shows R-ketamine has longer-lasting antidepressant effects with fewer dissociative side effects. The market does not fund unprofitable molecules.",
    icon: HelpCircle,
    accent: false,
  },
};

export function MoleculeComparison() {
  const [active, setActive] = useState<Side | null>(null);

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
      {(Object.keys(SIDES) as Side[]).map((side) => {
        const data = SIDES[side];
        const open = active === side;
        const Icon = data.icon;
        return (
          <button
            key={side}
            type="button"
            onMouseEnter={() => setActive(side)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(side)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(open ? null : side)}
            aria-expanded={open}
            className={cn(
              "group relative flex flex-col items-center bg-bg-elevated px-8 py-12 text-center transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none md:py-16",
              open && "bg-[oklch(98%_0.005_240)]"
            )}
          >
            <Molecule mirror={side === "r"} accent={data.accent} active={open} />

            <div className="mt-8 flex items-center gap-2">
              <Icon
                className={cn(
                  "h-3.5 w-3.5",
                  data.accent ? "text-accent" : "text-fg-subtle"
                )}
                strokeWidth={2}
              />
              <p
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.18em]",
                  data.accent ? "text-accent" : "text-fg-subtle"
                )}
              >
                {data.badge}
              </p>
            </div>
            <p className="mt-4 font-serif text-2xl italic tracking-tight text-fg">
              {data.label}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
              {data.sub}
            </p>

            <AnimatePresence initial={false}>
              {open && (
                <motion.p
                  key="annotation"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 max-w-sm overflow-hidden text-[13px] leading-relaxed text-fg-muted"
                >
                  {data.annotation}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

function Molecule({
  mirror,
  accent,
  active,
}: {
  mirror: boolean;
  accent: boolean;
  active: boolean;
}) {
  return (
    <motion.svg
      viewBox="-60 -60 120 120"
      width="160"
      height="160"
      className={cn(
        "transition-opacity duration-300",
        accent ? "" : "opacity-60",
        active && "opacity-100"
      )}
      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
      initial={{ rotate: -8, opacity: 0 }}
      whileInView={{ rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* benzene ring */}
      <g stroke="currentColor" strokeWidth="1" className="text-fg" fill="none">
        <polygon
          points="0,-26 22.5,-13 22.5,13 0,26 -22.5,13 -22.5,-13"
          strokeLinejoin="round"
        />
        {/* aromatic inner circle */}
        <circle r="13" cx="0" cy="0" strokeDasharray="2 3" />
        {/* Cl atom */}
        <line x1="22.5" y1="-13" x2="38" y2="-22" />
        <text
          x="44"
          y="-21"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
        >
          Cl
        </text>
        {/* attachment point */}
        <line x1="-22.5" y1="-13" x2="-38" y2="-22" />
        {/* chiral C */}
        <circle cx="-38" cy="-22" r="1.5" fill="currentColor" />
        {/* NH-CH3 */}
        <line x1="-38" y1="-22" x2="-44" y2="-6" />
        <text
          x="-58"
          y="-2"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
        >
          N
        </text>
        {/* ketone */}
        <line x1="-38" y1="-22" x2="-32" y2="-38" />
        <text
          x="-30"
          y="-40"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
        >
          O
        </text>
      </g>

      {/* chirality marker — green for accent (S), faded for R */}
      <motion.circle
        cx="-38"
        cy="-22"
        r="6"
        fill="none"
        strokeWidth="1.25"
        className={accent ? "stroke-accent" : "stroke-fg-subtle"}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  );
}
