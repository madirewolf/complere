"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { Product } from "@/lib/data/products";
import { useCart } from "@/lib/store/cart";
import { Button } from "./button";
import { MoleculeStructure, molecularFormula } from "./molecule-structure";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="group relative flex flex-col"
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`View ${product.name}`}
      >
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ scale: hover ? 1.01 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex aspect-square w-full flex-col items-center justify-center"
            style={{ backgroundColor: "oklch(96% 0.005 240)" }}
          >
            <MoleculeStructure
              slug={product.slug}
              className="h-[60%] w-[82%] text-fg/95"
            />
            <div className="absolute inset-x-6 bottom-6 text-center">
              <p className="font-serif text-base italic leading-tight text-fg/65">
                {product.name}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-fg-subtle">
                {molecularFormula(product.slug)}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 bottom-4"
            onClick={(e) => e.preventDefault()}
          >
            <Button
              type="button"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  slug: product.slug,
                  name: product.name,
                  form: product.form,
                  price: product.price,
                });
              }}
            >
              Add to cart · ${product.price}
            </Button>
          </motion.div>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
            {product.form}
          </p>
          <h3 className="relative mt-1.5 inline-block text-[15px] font-medium tracking-tight text-fg">
            {product.name}
            <motion.span
              animate={{ scaleX: hover ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute -bottom-px left-0 right-0 h-px bg-fg"
            />
          </h3>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-fg-muted">
            {product.benefit}
          </p>
          <p className="mt-3 font-serif text-lg italic text-fg">
            ${product.price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
