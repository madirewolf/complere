"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Row {
  nutrient: string;
  cheap: string;
  cheapAbsorption: string;
  bio: string;
  bioAbsorption: string;
  detail: string;
  citation?: string;
}

const ROWS: Row[] = [
  {
    nutrient: "Magnesium",
    cheap: "Magnesium oxide",
    cheapAbsorption: "~4%",
    bio: "Glycinate / L-threonate",
    bioAbsorption: "~40%",
    detail:
      "Walker et al., Magnesium Research 2003: organic magnesium chelates were absorbed roughly 10× more than magnesium oxide in healthy adults.",
    citation: "mg-bioavailability",
  },
  {
    nutrient: "Vitamin B12",
    cheap: "Cyanocobalamin",
    cheapAbsorption: "Conversion-dependent",
    bio: "Methylcobalamin",
    bioAbsorption: "Active form",
    detail:
      "Methylcobalamin is the directly usable form in the methionine cycle and CNS. Cyanocobalamin must first be converted in the liver — a step that fails at clinical rates in MTHFR variants.",
  },
  {
    nutrient: "Folate (B9)",
    cheap: "Folic acid",
    cheapAbsorption: "MTHFR-blocked in ~40%",
    bio: "L-methylfolate (5-MTHF)",
    bioAbsorption: "Bypasses conversion",
    detail:
      "Pietrzik et al., Clinical Pharmacokinetics 2010: L-5-MTHF bypasses the MTHFR conversion step required for folic acid, providing a directly usable form regardless of genetic variants.",
    citation: "methylfolate-vs-folic",
  },
  {
    nutrient: "Vitamin D",
    cheap: "D2 (ergocalciferol)",
    cheapAbsorption: "Lower potency",
    bio: "D3 + K2",
    bioAbsorption: "Substantially higher serum 25(OH)D",
    detail:
      "Tripkovic et al., AJCN 2012: D3 was significantly more efficacious than D2 at raising serum 25-hydroxyvitamin D status. Pairing with K2 (MK-7) routes the calcium D3 mobilizes toward bone rather than soft tissue.",
    citation: "d3-vs-d2",
  },
  {
    nutrient: "Curcumin",
    cheap: "Plain curcumin",
    cheapAbsorption: "Negligible",
    bio: "Liposomal / with piperine",
    bioAbsorption: "Up to 20× higher AUC",
    detail:
      "Curcumin's plasma concentration after oral dosing is famously low. Phospholipid-complexed and piperine-co-administered formulations have shown order-of-magnitude increases in bioavailability.",
  },
];

export function BioavailabilityTable() {
  const [openRow, setOpenRow] = useState<string | null>(null);

  return (
    <div className="border-y border-border">
      <div className="hidden grid-cols-[1.2fr_2fr_1.2fr_2fr_1.2fr] items-center gap-4 px-2 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle md:grid">
        <span>Nutrient</span>
        <span>Cheap form</span>
        <span>Cheap %</span>
        <span>Bioavailable form</span>
        <span>Bio %</span>
      </div>
      <div className="divide-y divide-border">
        {ROWS.map((row) => {
          const open = openRow === row.nutrient;
          return (
            <button
              key={row.nutrient}
              type="button"
              onClick={() => setOpenRow(open ? null : row.nutrient)}
              aria-expanded={open}
              className={cn(
                "block w-full px-2 py-5 text-left transition-colors duration-200 hover:bg-[oklch(98%_0.005_240)] focus:outline-none",
                open && "bg-[oklch(98%_0.005_240)]"
              )}
            >
              {/* Desktop row */}
              <div className="hidden grid-cols-[1.2fr_2fr_1.2fr_2fr_1.2fr] items-center gap-4 md:grid">
                <p className="font-serif text-xl italic leading-tight tracking-tight text-fg">
                  {row.nutrient}
                </p>
                <span className="text-[14px] text-fg-muted">{row.cheap}</span>
                <span className="font-mono text-[12px] text-fg-muted">
                  {row.cheapAbsorption}
                </span>
                <span className="text-[14px] text-fg">{row.bio}</span>
                <span className="font-mono text-[12px] text-accent">
                  {row.bioAbsorption}
                </span>
              </div>

              {/* Mobile row */}
              <div className="md:hidden">
                <p className="font-serif text-xl italic leading-tight tracking-tight text-fg">
                  {row.nutrient}
                </p>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                    Cheap
                  </dt>
                  <dd className="text-[13px] text-fg-muted">
                    {row.cheap}{" "}
                    <span className="font-mono text-[11px] text-fg-subtle">
                      ({row.cheapAbsorption})
                    </span>
                  </dd>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                    Bio
                  </dt>
                  <dd className="text-[13px] text-fg">
                    {row.bio}{" "}
                    <span className="font-mono text-[11px] text-accent">
                      ({row.bioAbsorption})
                    </span>
                  </dd>
                </dl>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-fg-muted">
                      {row.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
