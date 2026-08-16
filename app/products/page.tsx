"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  products,
  categoryOrder,
  categoryLabels,
  type ProductCategory,
} from "@/lib/data/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils/cn";

type Filter = ProductCategory | "all";

export default function ProductsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          The line
        </p>
        <h1 className="mt-5 font-serif text-5xl italic leading-[1.05] tracking-tight text-fg sm:text-6xl">
          Six products. Every one earns its place.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
          We don&rsquo;t carry anything we couldn&rsquo;t cite a peer-reviewed paper for. We don&rsquo;t carry forms that don&rsquo;t absorb. The line stays small on purpose.
        </p>
      </header>

      <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4">
        {categoryOrder.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "relative px-1 py-1 text-[13px] font-medium tracking-tight transition-colors duration-200",
                active ? "text-fg" : "text-fg-subtle hover:text-fg-muted"
              )}
            >
              {categoryLabels[cat]}
              {active && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-x-0 -bottom-[5px] h-px bg-accent"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
