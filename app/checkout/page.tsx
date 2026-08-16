"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useCart, cartSubtotal } from "@/lib/store/cart";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils/cn";

const generateOrderNumber = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ORD-${id}`;
};

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);
  const shipping = subtotal > 0 ? 6 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const order = generateOrderNumber();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("complere-last-order", order);
    }
    setTimeout(() => {
      clear();
      router.push("/checkout/success");
    }, 1200);
  };

  if (!mounted || !hasHydrated) {
    return <div className="mx-auto max-w-6xl px-6 py-32" aria-busy="true" />;
  }

  if (items.length === 0 && !submitting) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          Checkout
        </p>
        <h1 className="mt-6 font-serif text-4xl italic tracking-tight text-fg">
          There&rsquo;s nothing to check out.
        </h1>
        <p className="mt-4 text-fg-muted">
          Add a product first.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          See products →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          Checkout
        </p>
        <h1 className="mt-4 font-serif text-4xl italic leading-tight tracking-tight text-fg sm:text-5xl">
          Shipping &amp; payment
        </h1>
        <p className="mt-3 max-w-xl text-sm text-fg-muted">
          Demo only. No real card is charged. Use any reasonable-looking values.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-12">
          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Contact
            </legend>
            <div className="mt-5">
              <Field id="email" label="Email" type="email" required autoComplete="email" placeholder="you@domain.com" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Shipping address
            </legend>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="firstName" label="First name" required autoComplete="given-name" />
              <Field id="lastName" label="Last name" required autoComplete="family-name" />
              <div className="sm:col-span-2">
                <Field id="address1" label="Address" required autoComplete="address-line1" />
              </div>
              <div className="sm:col-span-2">
                <Field id="address2" label="Apartment, suite, etc. (optional)" autoComplete="address-line2" />
              </div>
              <Field id="city" label="City" required autoComplete="address-level2" />
              <Field id="region" label="Province / State" required autoComplete="address-level1" />
              <Field id="postal" label="Postal code" required autoComplete="postal-code" />
              <Field id="country" label="Country" defaultValue="Canada" required autoComplete="country-name" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Payment
            </legend>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <CardField id="card" label="Card number" required />
              </div>
              <div className="sm:col-span-2">
                <ExpiryField id="expiry" label="Expiry (MM / YY)" required />
              </div>
              <CvcField id="cvc" label="CVC" required />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
              No real card processor is connected. Demo only.
            </p>
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border bg-bg-elevated p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Order
            </p>
            <ul className="mt-5 space-y-4 border-b border-border pb-5">
              {items.map((item) => (
                <li key={item.slug} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 min-w-[24px] items-center justify-center bg-fg/[0.04] px-1 font-mono text-[11px] tabular-nums text-fg-muted">
                    {item.quantity}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-fg">{item.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                      {item.form}
                    </p>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-fg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-fg-muted">Subtotal</dt>
                <dd className="font-mono tabular-nums text-fg">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-fg-muted">Shipping</dt>
                <dd className="font-mono tabular-nums text-fg">${shipping.toFixed(2)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-base">
                <dt className="font-medium text-fg">Total</dt>
                <dd className="font-mono tabular-nums text-fg">${total.toFixed(2)}</dd>
              </div>
            </dl>
            <Button
              type="submit"
              size="lg"
              disabled={submitting || items.length === 0}
              className="mt-8 w-full"
            >
              {submitting ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2"
                >
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                  Placing order…
                </motion.span>
              ) : (
                "Place order"
              )}
            </Button>
            <p className="mt-4 text-center text-[11px] text-fg-subtle">
              Free returns within 30 days. Lab certificate ships with every order.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn(
          "mt-2 h-11 w-full rounded-none border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
        )}
      />
    </div>
  );
}

function CardField({ id, label, required }: { id: string; label: string; required?: boolean }) {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
    const groups = digits.match(/.{1,4}/g) ?? [];
    setValue(groups.join(" "));
  };
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </label>
      <input
        id={id}
        name={id}
        inputMode="numeric"
        required={required}
        autoComplete="cc-number"
        placeholder="4242 4242 4242 4242"
        value={value}
        onChange={handleChange}
        className="mt-2 h-11 w-full rounded-none border border-border bg-bg-elevated px-3 font-mono text-sm tabular-nums text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
      />
    </div>
  );
}

function ExpiryField({ id, label, required }: { id: string; label: string; required?: boolean }) {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) setValue(digits);
    else setValue(`${digits.slice(0, 2)} / ${digits.slice(2)}`);
  };
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </label>
      <input
        id={id}
        name={id}
        inputMode="numeric"
        required={required}
        autoComplete="cc-exp"
        placeholder="04 / 28"
        value={value}
        onChange={handleChange}
        className="mt-2 h-11 w-full rounded-none border border-border bg-bg-elevated px-3 font-mono text-sm tabular-nums text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
      />
    </div>
  );
}

function CvcField({ id, label, required }: { id: string; label: string; required?: boolean }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </label>
      <input
        id={id}
        name={id}
        inputMode="numeric"
        required={required}
        autoComplete="cc-csc"
        placeholder="•••"
        maxLength={4}
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 4))}
        className="mt-2 h-11 w-full rounded-none border border-border bg-bg-elevated px-3 font-mono text-sm tabular-nums text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
      />
    </div>
  );
}
