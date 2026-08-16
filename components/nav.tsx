"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart, cartItemCount } from "@/lib/store/cart";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/story", label: "Story" },
  { href: "/products", label: "Products" },
  { href: "/products#research", label: "Research" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));

  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const count = cartItemCount(items);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const prevCount = useRef(0);
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (count > prevCount.current) setPulse((p) => p + 1);
    prevCount.current = count;
  }, [count]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-16 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-xl italic tracking-tight text-fg"
          aria-label="Complere — home"
        >
          complere
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/products"
                ? pathname === "/products" || pathname.startsWith("/products/")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[13px] font-medium tracking-tight text-fg-muted transition-colors duration-200 hover:text-fg",
                  active && "text-fg"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-px h-px bg-accent"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={`Cart, ${count} items`}
          onClick={() => setOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center text-fg transition-colors duration-200 hover:text-accent"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <AnimatePresence>
            {mounted && count > 0 && (
              <motion.span
                key={pulse}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.25, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-medium text-accent-fg"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}
