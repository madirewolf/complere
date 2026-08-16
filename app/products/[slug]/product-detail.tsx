"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { type Product } from "@/lib/data/products";
import { citations } from "@/lib/data/citations";
import { Button } from "@/components/button";
import { QuantityStepper } from "@/components/cart-drawer";
import { useCart } from "@/lib/store/cart";
import { cn } from "@/lib/utils/cn";
import { MoleculeStructure, molecularFormula } from "@/components/molecule-structure";

const TABS = [
  { id: "form", label: "Why this form" },
  { id: "research", label: "Research" },
  { id: "lab", label: "Lab results" },
  { id: "use", label: "Suggested use" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductDetail({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabId>("form");
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        form: product.form,
        price: product.price,
      },
      qty
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div
            className="relative flex aspect-square w-full flex-col items-center justify-center"
            style={{ backgroundColor: "oklch(96% 0.005 240)" }}
          >
            <MoleculeStructure
              slug={product.slug}
              className="h-[58%] w-[80%] text-fg/85"
            />
            <div className="absolute inset-x-8 bottom-10 text-center">
              <p className="font-serif text-2xl italic leading-tight tracking-tight text-fg/75 md:text-3xl">
                {product.name}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-fg-subtle">
                {molecularFormula(product.slug)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            {product.form}
          </p>
          <h1 className="mt-3 font-serif text-4xl italic leading-[1.05] tracking-tight text-fg sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-fg-muted">
            {product.description}
          </p>

          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-serif text-3xl italic text-fg">
              ${product.price}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
              {product.servings} servings · {product.dosage}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper quantity={qty} onChange={(q) => setQty(Math.max(1, q))} />
            <Button onClick={handleAdd} size="lg" className="md:px-10">
              Add to cart
            </Button>
          </div>

          <div className="mt-12 border-t border-border">
            <div className="flex flex-wrap gap-x-6 gap-y-2 py-4">
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "relative px-1 py-1 text-[13px] font-medium tracking-tight transition-colors duration-200",
                      active ? "text-fg" : "text-fg-subtle hover:text-fg-muted"
                    )}
                  >
                    {t.label}
                    {active && (
                      <motion.span
                        layoutId={`tab-${product.slug}`}
                        className="absolute inset-x-0 -bottom-[5px] h-px bg-accent"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="border-t border-border pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {tab === "form" && (
                    <p className="max-w-prose text-[15px] leading-relaxed text-fg-muted">
                      {product.formRationale}
                    </p>
                  )}
                  {tab === "research" && (
                    <ResearchList ids={product.citations} />
                  )}
                  {tab === "lab" && <LabResults product={product} />}
                  {tab === "use" && (
                    <p className="max-w-prose text-[15px] leading-relaxed text-fg-muted">
                      {product.suggestedUse}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchList({ ids }: { ids: string[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <ul className="space-y-3">
      {ids.map((id) => {
        const c = citations[id];
        if (!c) return null;
        const open = expanded === id;
        return (
          <li
            key={id}
            className="border border-border bg-bg-elevated transition-colors duration-200 hover:border-border-strong"
          >
            <button
              type="button"
              onClick={() => setExpanded(open ? null : id)}
              className="flex w-full flex-col items-start gap-1 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                {c.journal} · {c.year}
              </p>
              <p className="font-serif text-base italic leading-snug text-fg">
                {c.title}
              </p>
              <p className="text-xs leading-relaxed text-fg-muted">
                {c.authors}
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
                    <p className="mt-3 max-w-prose text-[13px] leading-relaxed text-fg-muted">
                      {c.summary}
                    </p>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent transition-opacity hover:opacity-70"
                      >
                        Read paper <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function LabResults({ product }: { product: Product }) {
  const tests = [
    { row: "Heavy metals (Pb, Hg, As, Cd)", result: "PASS — below CA Prop 65" },
    { row: "Microbial contamination", result: "PASS — within USP <2021>" },
    { row: "Ingredient identity (HPLC)", result: "PASS — confirms label" },
    { row: "Ingredient potency", result: "PASS — within ±5% of stated dose" },
    { row: "Pesticide residue", result: "PASS — none detected" },
    { row: "Total oxidation (TOTOX)", result: "PASS — well below threshold" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 border border-border bg-bg-elevated p-6 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
            Batch
          </p>
          <p className="mt-1 font-mono text-sm text-fg">{product.batchNumber}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
            Tested by
          </p>
          <p className="mt-1 text-sm text-fg">{product.testingLab}</p>
        </div>
      </div>
      <div className="mt-4 divide-y divide-border border border-border bg-bg-elevated">
        {tests.map((t) => (
          <div
            key={t.row}
            className="flex items-center justify-between gap-4 px-5 py-3"
          >
            <span className="text-[13px] text-fg">{t.row}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              {t.result}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-fg-subtle">
        Certificate of analysis (full document) is mocked for this demo. In production it would be a downloadable PDF, scannable from the bottle.
      </p>
    </div>
  );
}
