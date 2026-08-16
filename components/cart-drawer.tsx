"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, cartSubtotal } from "@/lib/store/cart";
import { Button } from "./button";
import { cn } from "@/lib/utils/cn";

export function CartDrawer() {
  const items = useCart((s) => s.items);
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-fg/20 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-border bg-bg-elevated md:w-[480px]"
              >
                <Dialog.Title className="sr-only">Cart</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Items currently in your cart with quantity controls and checkout actions.
                </Dialog.Description>
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                  <h2 className="font-serif text-2xl italic tracking-tight text-fg">
                    Cart
                  </h2>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close cart"
                      className="flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:text-fg"
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                      <p className="font-serif text-xl italic tracking-tight text-fg">
                        Nothing here yet.
                      </p>
                      <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
                        Browse the line and start with the foundations. Most people are deficient in at least one.
                      </p>
                      <Dialog.Close asChild>
                        <Link
                          href="/products"
                          className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
                        >
                          See products →
                        </Link>
                      </Dialog.Close>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {items.map((item) => (
                        <li key={item.slug} className="flex gap-4 px-6 py-5">
                          <div
                            className="flex h-16 w-16 flex-none items-center justify-center"
                            style={{
                              backgroundColor: "oklch(96% 0.005 240)",
                            }}
                          >
                            <span className="font-serif text-xs italic leading-tight text-fg-muted">
                              {item.name.split(" ")[0]}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                                  {item.form}
                                </p>
                                <p className="mt-0.5 text-sm font-medium leading-tight text-fg">
                                  {item.name}
                                </p>
                              </div>
                              <button
                                type="button"
                                aria-label={`Remove ${item.name}`}
                                onClick={() => removeItem(item.slug)}
                                className="flex h-6 w-6 items-center justify-center text-fg-subtle transition-colors hover:text-fg"
                              >
                                <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <QuantityStepper
                                quantity={item.quantity}
                                onChange={(q) => updateQuantity(item.slug, q)}
                              />
                              <p className="font-mono text-sm tabular-nums text-fg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-border px-6 py-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-fg-muted">Subtotal</span>
                      <span className="font-mono text-base tabular-nums text-fg">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-fg-subtle">
                      Shipping calculated at checkout.
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <Link href="/checkout" onClick={() => setOpen(false)}>
                        <Button className="w-full" size="lg">
                          Checkout →
                        </Button>
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="text-center text-[13px] text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                      >
                        View full cart
                      </Link>
                    </div>
                  </div>
                )}
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

interface QuantityStepperProps {
  quantity: number;
  onChange: (q: number) => void;
  className?: string;
}

export function QuantityStepper({ quantity, onChange, className }: QuantityStepperProps) {
  return (
    <div className={cn("inline-flex items-center border border-border", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(quantity - 1)}
        className="flex h-8 w-8 items-center justify-center text-fg-muted transition-colors hover:text-fg"
      >
        <Minus className="h-3 w-3" strokeWidth={2} />
      </button>
      <span className="w-8 text-center font-mono text-[13px] tabular-nums text-fg">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="flex h-8 w-8 items-center justify-center text-fg-muted transition-colors hover:text-fg"
      >
        <Plus className="h-3 w-3" strokeWidth={2} />
      </button>
    </div>
  );
}
