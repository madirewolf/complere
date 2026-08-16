# Decisions

Choices that weren't strictly spelled out in the brief, with reasoning. The brand name used here is **Complere** (Latin: "to fill out / fulfill") — the brief didn't specify one.

## Stack-level

- **Tailwind v4 stable (4.2.x), not the named beta in the brief.** npm resolved `^4.0.0-beta.7` to the latest stable 4.x. The CSS-first `@theme` approach the brief specifies works identically on stable. No code change required.
- **`motion/react`, not `framer-motion`.** Followed the brief — using the new `motion` package and importing from `motion/react`.
- **Next.js patched to 15.5.x.** Brief said "Next.js 15"; npm flagged a CVE on 15.1.3, so I bumped to a patched line.
- **No global state library beyond Zustand.** No React Context for cart, theme, or anything else. Zustand handles the cart; the rest reads from props or the URL.

## Aesthetic / design language

- **No custom logo asset — the wordmark is just "complere" set in Instrument Serif italic.** This matches the editorial-not-marketing tone better than a glyph would.
- **Product image placeholders are typographic, not abstract shapes.** A solid `oklch(96% 0.005 240)` panel with the product name set in large Instrument Serif italic. Brief allowed either; the typographic version commits harder to the brand voice.
- **Single accent green used in exactly the places the brief named:** primary CTAs, active nav indicator, citation underline-on-hover, "PASS" lab-result rows, the section-number prefix on Story sections, "verified" checks on the molecule-comparison. Nowhere else.
- **Stat counter respects `decimals` for fractional values** like 51.1% and 0.28 in the Ketamine section, but defaults to integer rounding everywhere else — keeps the typography clean.
- **Section dividers on the Story page** are full-width hairlines inside `max-w-6xl`. The brief said section indicator + reading progress; the divider keeps section transitions legible without adding chrome.

## Story page

- **Failure cards (Section 01) use horizontal scroll, not a transformed gallery.** Brief said "horizontal scroll of four cards." Native scroll, with the cards expanding inline on hover/tap rather than the row transforming.
- **Molecule comparison (Section 02) is hand-drawn SVG of the chiral carbon attachment**, not photorealistic. The R-side is mirrored via `scaleX(-1)`. Kept it simple and editorial — anything more elaborate would have looked like decoration.
- **Section 04's bioavailability table** is split into two distinct layouts at the `md` breakpoint: a publication-style 5-column grid on desktop, and per-row "CHEAP / BIO" definition lists on mobile. Forcing the desktop layout into mobile (initial attempt) produced a wall of mashed text — separate layouts is the cleaner call here.
- **Section indicator** uses a `requestAnimationFrame`-driven scroll listener, not `IntersectionObserver`. The IO version was unreliable when scrolling fast or programmatically (events can be skipped if section boundaries cross the threshold band in the same frame). The rAF approach picks whichever section's center is closest to 40% of the viewport on every frame and stays correct.
- **Reading progress** is a vertical line on the left edge with `useScroll` + a sprung `scaleY`. Kept it `w-px` so it reads as ink on paper, not a UI chrome.

## Cart / checkout

- **Cart store has a `hasHydrated` flag** wired through Zustand's `onRehydrateStorage`. Without it, a direct page load of `/checkout` or `/cart` flashes the empty-cart state for one frame before the persisted items finish hydrating from localStorage.
- **Drawer auto-opens on `addItem`.** Brief implied this; the visible feedback that the action worked is more important than letting users keep browsing silently. Closing is one click on the backdrop or close button.
- **Card number / expiry input masking is hand-rolled**, not a library. Card splits into 4-digit groups; expiry inserts `MM / YY`. CVC is digit-only. No external dependency for ~15 lines of formatting.
- **Mock checkout** sets the order number into `sessionStorage` rather than route state. The success page reads it on mount. Surviving a refresh of `/checkout/success` once is preferable to losing the order number to a route state cache.
- **Shipping is flat $6** when there's anything in the cart, $0 otherwise. The brief didn't specify; this gives the order summary a non-trivial total without inventing a calculator.

## Animation

- **All scroll reveals use the same easing** — `cubic-bezier(0.16, 1, 0.3, 1)`, also exposed as `--ease-editorial` in `@theme`. Hover and popover transitions match.
- **Reveals are wrapped behind `useReducedMotion`** in the `Reveal` component. When the user has the OS preference set, the component renders the children with no animation props at all (not just zero-duration animation) — simpler and avoids any motion library overhead.
- **Stat counters skip the count animation** under reduced motion and jump straight to the final value.
- **CSS-level reduced-motion override** in `globals.css` is a belt-and-suspenders fallback for any motion library or third-party CSS animation that doesn't go through the React hook.

## Product imagery — skeletal structures

- **Each product card and detail page renders a hand-tuned SVG skeletal formula** of the active molecule. Vitamin D3 = cholecalciferol secosteroid; Magnesium glycinate = Mg²⁺ chelate with two glycinate ligands; Methylated B-complex = pteridine ring with N5-methyl + a "…" stub for the PABA-glutamate tail; Omega-3 = 20-carbon EPA chain with the five cis double bonds drawn explicitly; Creatine = the guanidino-methylglycine; L-theanine = γ-glutamyl ethylamide. The serif product name and molecular formula sit underneath as a museum-card caption.
- **No animation on the structures.** I tried draw-in animations first (each line `pathLength: 0 → 1`), but Framer Motion's `whileInView` and `useInView` both proved unreliable on SVG `<line>` elements (zero bounding-box area), so animations stuck mid-flight. The static line-drawn version reads better anyway — it lets the molecule speak rather than performing an entrance.
- **Molecular formulas don't auto-uppercase.** Caps lock would turn "C₄H₈MgN₂O₄" into "C₄H₈MGN₂O₄", which is wrong — chemical symbols preserve case. The mono caption keeps mixed case and slightly tightened tracking.

## What I didn't build

- No real backend, no Stripe, no email send, no lab-certificate PDFs (the brief said this was a demo and to mock checkout).
- No newsletter signup. The brief explicitly said to kill it on sight.
- No drop shadows beyond the Tailwind-default `shadow-sm` on the citation popover, which matches the brief's "no drop shadows below `shadow-sm`."
- No real product photography. Typographic placeholders only.
