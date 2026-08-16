"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCart, cartSubtotal } from "@/lib/store/cart";
import { QuantityStepper } from "@/components/cart-drawer";
import { Button } from "@/components/button";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const hasHydrated = useCart((s) => s.hasHydrated);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          Cart
        </p>
        <h1 className="mt-4 font-serif text-4xl italic leading-tight tracking-tight text-fg sm:text-5xl">
          Your selection
        </h1>
      </header>

      {!mounted || !hasHydrated ? (
        <div className="mt-16 h-32" />
      ) : items.length === 0 ? (
        <div className="mt-16 max-w-md">
          <p className="text-base leading-relaxed text-fg-muted">
            Cart is empty. Most people start with the foundations — D3 + K2 and magnesium glycinate cover the two most prevalent deficiencies in adults.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
          >
            See products →
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li
                key={item.slug}
                className="grid grid-cols-[80px_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[96px_1fr_auto_auto] sm:gap-6"
              >
                <div
                  className="flex aspect-square w-full items-center justify-center"
                  style={{ backgroundColor: "oklch(96% 0.005 240)" }}
                >
                  <span className="px-2 text-center font-serif text-sm italic leading-tight text-fg-muted">
                    {item.name.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                    {item.form}
                  </p>
                  <Link
                    href={`/products/${item.slug}`}
                    className="mt-1 block text-[15px] font-medium text-fg transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-2 font-mono text-[12px] tabular-nums text-fg-muted sm:hidden">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <QuantityStepper
                  quantity={item.quantity}
                  onChange={(q) => updateQuantity(item.slug, q)}
                />
                <div className="hidden items-center gap-4 sm:flex">
                  <p className="w-20 text-right font-mono text-sm tabular-nums text-fg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.slug)}
                    className="flex h-8 w-8 items-center justify-center text-fg-subtle transition-colors hover:text-fg"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-bg-elevated p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Order summary
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-baseline justify-between">
                  <dt className="text-fg-muted">Subtotal</dt>
                  <dd className="font-mono tabular-nums text-fg">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-fg-muted">Shipping</dt>
                  <dd className="text-fg-subtle">Calculated at checkout</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-border pt-3">
                  <dt className="font-medium text-fg">Total</dt>
                  <dd className="font-mono tabular-nums text-fg">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <Link href="/checkout" className="mt-8 block">
                <Button className="w-full" size="lg">
                  Checkout →
                </Button>
              </Link>
              <Link
                href="/products"
                className="mt-4 block text-center text-[13px] text-fg-muted transition-colors hover:text-fg"
              >
                ← Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
