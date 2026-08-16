"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? sessionStorage.getItem("complere-last-order")
        : null;
    setOrderNumber(stored ?? "ORD-XXXXXXXX");
  }, []);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-32 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-6 w-6 items-center justify-center text-accent"
      >
        <Check className="h-6 w-6" strokeWidth={1.5} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 font-serif text-5xl italic tracking-tight text-fg sm:text-6xl"
      >
        Order placed.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 font-mono text-sm tabular-nums tracking-[0.1em] text-fg"
      >
        {orderNumber}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted"
      >
        We&rsquo;ve sent a confirmation to your email. The certificate of analysis for your specific batch will ship in the box.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          href="/products"
          className="mt-12 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
        >
          ← Back to shop
        </Link>
      </motion.div>
    </div>
  );
}
