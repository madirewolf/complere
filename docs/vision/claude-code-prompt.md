# Build a supplement brand demo site

Build a single-page-feeling, multi-route website for a new supplement brand. The brand's whole pitch is **transparency and rigor in an industry that has neither** — third-party tested products, only bioavailable forms, every claim linked to peer-reviewed research. The site needs to communicate that pitch through a long-form "Story" tab and back it up with a polished product catalog and cart.

This is a **demo**. Checkout is mocked (no real payment processor). Cart state persists in localStorage. Build it like it's going to production aesthetically, but skip backend infra.

---

## 1. Tech stack — use exactly these

- **Next.js 15** with the App Router and TypeScript
- **Tailwind CSS v4** (the new CSS-first config; no `tailwind.config.js`, use `@theme` in CSS)
- **Framer Motion** (now published as `motion/react`) for all animations
- **Zustand** for cart state, persisted to localStorage via `zustand/middleware`
- **Lucide React** for icons
- **`next/font/google`** for typography — see design section for choices
- No component library presets. **Do not use shadcn/ui, MUI, Chakra, or any pre-styled kit.** Build primitives from scratch using Radix UI's unstyled primitives only where you need accessibility plumbing (Dialog, Popover). Style everything with Tailwind from zero.

If you need a small utility for class merging, use `clsx` + `tailwind-merge` and write a `cn()` helper. Don't pull in larger utility libraries.

---

## 2. Design language — read this twice

The aesthetic is **editorial, modern, almost-stark**. Think Linear, Vercel, Arc, Stripe Press, *MIT Technology Review* online. **Not** wellness-pastel. Not sage-and-cream. Not the typical "AI-generated landing page" look with orange accents and rounded gradient blobs. If your output looks like a default artifact, you've gone wrong.

### Color palette — define as Tailwind v4 theme tokens

```css
@theme {
  --color-bg: oklch(99% 0.003 240);          /* near-white, faintly cool */
  --color-bg-elevated: oklch(100% 0 0);       /* pure white for cards */
  --color-fg: oklch(15% 0.01 240);            /* near-black with cool undertone */
  --color-fg-muted: oklch(45% 0.008 240);     /* secondary text */
  --color-fg-subtle: oklch(65% 0.006 240);    /* tertiary text, captions */
  --color-border: oklch(92% 0.004 240);       /* hairlines */
  --color-border-strong: oklch(85% 0.005 240);
  --color-accent: oklch(55% 0.18 145);        /* a single restrained green — used sparingly */
  --color-accent-fg: oklch(98% 0.02 145);     /* text on accent */
}
```

Use the accent green only for: primary CTAs, the active nav indicator, citation highlight underlines on hover, and "verified" badges on product cards. **Nowhere else.** Restraint is the whole point.

### Typography

- **Display/headings:** `Instrument Serif` from Google Fonts. Used for major section openers and hero text only. Italic by default for the most editorial feel.
- **Body and UI:** `Inter` from Google Fonts, with `font-feature-settings: 'cv11', 'ss01', 'ss03'` enabled for the more refined character variants.
- **Mono (citations, lab values, batch numbers):** `JetBrains Mono`.

Set up tight tracking on display text (`tracking-tight` or `tracking-tighter`), comfortable leading on body (`leading-relaxed`), and never use `font-bold` on the serif — it doesn't have a true bold and looks bad. Use weight 400 italic for serif, weight 400/500/600 for Inter.

### Layout principles

- Generous whitespace. Default section vertical padding `py-32` on desktop, `py-20` on mobile.
- Max content width for prose: `max-w-2xl` (~672px). For wider layouts: `max-w-6xl`.
- Hairlines, not borders. `border-[0.5px]` where supported, otherwise `border` with the lightest border token.
- Corners: mostly square. `rounded-none` for cards by default. `rounded-full` only for pills/badges. `rounded-md` allowed sparingly for inputs.
- No drop shadows below `shadow-sm`. We are not in the 2014 Material Design era.
- No gradients. Anywhere. If a section feels flat, the answer is better typography or a hairline divider, not a gradient.

### Motion principles

- All transitions: `cubic-bezier(0.16, 1, 0.3, 1)` (a smooth ease-out) at 400–600ms for reveals, 150–250ms for hover states.
- Scroll reveals: subtle. 8px translate up + opacity fade. Never bigger than that. Use Framer Motion's `whileInView` with `viewport={{ once: true, margin: "-10%" }}`.
- Hover expansions: scale stays at 1. We expand via height/opacity reveals of additional content, not by transforming the whole card.
- Respect `prefers-reduced-motion`. Wrap all non-essential motion in a check.

---

## 3. Site architecture

### Routes

```
/                       Landing page (hero + product preview + story preview + footer)
/story                  Long-form brand manifesto (the centerpiece)
/products               Product catalog grid
/products/[slug]        Individual product page with research citations
/cart                   Cart page (full view; drawer also exists globally)
/checkout               Mocked checkout flow
/checkout/success       Order confirmation
```

### Global components

- **`<Nav>`** — Sticky top nav. Logo wordmark left. Center: Story / Products / Research. Right: cart icon with item count badge. On scroll past 80px, the nav gets a subtle backdrop blur (`backdrop-blur-md bg-bg/80`) and a hairline bottom border. Smooth transition.
- **`<CartDrawer>`** — Slides in from the right when cart icon is clicked. Radix Dialog under the hood. Shows line items, quantity controls, subtotal, "View cart" and "Checkout" buttons. Empty state has a quiet illustration-free message.
- **`<Footer>`** — Minimalist. Three columns: brand mission (1 sentence), navigation links, "Receipts" column linking to lab certificates and research index. Hairline top border.
- **`<Citation>`** — Inline component that wraps a claim. Renders the claim with a subtle dotted underline in the accent color. On hover (or tap on mobile), a Radix Popover opens above with the citation: paper title, authors, journal, year, and an external link. This is used **everywhere** in the Story page and product pages.
- **`<StatBlock>`** — A statistic display component. Large serif italic number (e.g., "47%"). One line of context below. On hover, expands smoothly to reveal the source citation and one more sentence of detail. Used in the Story page primarily.

### State management

```
/lib/store/cart.ts      Zustand store with persist middleware
                        State: items, addItem, removeItem, updateQuantity, clear
                        Persisted key: "supp-cart-v1"
```

---

## 4. Page specifications

### `/` — Landing page

**Above the fold:**
- Centered hero. Eyebrow text in mono caps, very small: `INDEPENDENTLY TESTED · CITED · BIOAVAILABLE`
- Headline in Instrument Serif italic, large: *"The supplement industry has a trust problem. We're the receipts."*
- Sub-headline in Inter, muted color: "Third-party tested every batch. Only the bioavailable forms. Every claim linked to peer-reviewed research."
- Two buttons: primary "Shop the line" → `/products`, secondary ghost "Read the story" → `/story`. The primary button is a flat rectangle with no shadow, accent color background, white text.

**Below fold, in this order:**

1. **A statistics strip** — 4 stat blocks in a row, separated by hairline dividers. Each one a damning industry stat. Hover to expand for source. Examples: "51% of adults are vitamin D deficient", "47% of protein powders exceed heavy metal limits", "1 in 3 supplements don't contain what's on the label", "700+ supplements found adulterated with hidden pharmaceuticals." Each stat animates its number on scroll-in (count up from zero).

2. **A product preview** — 4 featured products in a responsive grid. Minimal cards: product photo placeholder (use a solid pale background with the product name in Instrument Serif italic for now), name, key benefit in one line, price, "Add to cart" button. No badges, no "BEST SELLER" stickers.

3. **Story teaser** — A two-column layout. Left: a pull quote from the manifesto in Instrument Serif italic. Right: a short paragraph and a link "Read the full story →" with a subtle right-arrow that translates 4px on hover.

4. **Footer.**

### `/story` — The centerpiece

This is a long-scroll editorial page. It is the most important page on the site. Treat it like a magazine feature, not a marketing page.

**Layout:**
- Full-bleed hero. Massive Instrument Serif italic headline, centered: *"You've been sold a system that profits when you stay sick."*
- Below: small mono caps subhead "A MANIFESTO" and a scroll cue (a thin animated vertical line, fading bottom).
- Then sections. Each section gets generous vertical padding (`py-40` on desktop). A reading progress indicator on the left edge — thin vertical line that fills as you scroll.
- Use a sticky "section indicator" on the right edge of desktop screens — small mono text showing current section number and title (e.g., "03 / The Ketamine Problem"). Fades in on scroll.

**Sections and content** — embed exactly as written below. Use `<Citation>` for inline citations and `<StatBlock>` for emphasized stats.

> **Important:** The content below uses markdown for clarity. Render it with proper React components — no `dangerouslySetInnerHTML`. Pull citations into a JSON file (`/lib/data/citations.ts`) keyed by ID, and reference them by ID in the Story component.

```
SECTION 01 — The problem (cold open)

Headline (Instrument Serif italic): "The system isn't broken. It's working as designed."

Body:
Modern healthcare in North America is built on top of capitalism. Every actor in the chain — insurance, pharma, hospitals, most clinics — is optimizing for revenue, not for your long-term outcomes. It's not a conspiracy. It's just math.

That math leads to predictable results: treat symptoms, not causes. Prescribe, don't prevent. Speed over depth. Glacial regulatory timelines that mean only patent-protected molecules ever get the funding to reach you.

Which means the drugs you can legally buy are not the best drugs that exist. They're the best drugs someone could profitably sell.

Visual: a horizontal scroll of four cards, each one a system failure (treat symptoms, don't prevent, 15-minute visits, 10-year approval cycles). Each card expands on hover.


SECTION 02 — The ketamine problem (proof-of-concept)

Headline: "Case study: a drug, two enantiomers, one paycheck."

Body:
Ketamine has two mirror-image forms — R-ketamine and S-ketamine. Same molecule, flipped.

In 2019, Johnson & Johnson got FDA approval for an isolated S-ketamine nasal spray called Spravato for treatment-resistant depression. Big launch. Heavy marketing. Insurance coverage.

Here's what didn't make the press release:

[StatBlock] A 2020 meta-analysis of 24 trials and ~1,877 patients found racemic ketamine produced response and remission rates roughly TWICE as high as esketamine, with fewer dropouts. [Citation: Bahji et al., J. Affective Disorders, 2020]

[StatBlock] The FDA's own internal effect-size analysis put esketamine at SMD = 0.28 — comparable to or worse than older, cheaper drugs like aripiprazole (0.35) and quetiapine (0.40). The approval passed on a 14-2 advisory vote. The UK's NHS rejected it outright.

[StatBlock] Preclinical work consistently shows R-ketamine has longer-lasting antidepressant effects than S-ketamine, with fewer dissociative side effects. [Citation: Yang et al., Translational Psychiatry, 2015]

So why is the worse molecule the one in pharmacies?

Because racemic ketamine has been off-patent since the 1970s. R-ketamine, the more promising enantiomer, has the same problem — it's a known compound, hard to patent. The only way to make ketamine profitable was to isolate one half, repackage it as a "new" drug, and charge accordingly.

The version with the strongest patent moat got the funding. The version that probably works better is still stuck in early-phase research.

This is not an isolated case. This is the operating system.

Visual: an interactive molecule comparison. Two SVG molecule diagrams side-by-side. The S-ketamine side has a green checkmark and label "approved · profitable". The R-ketamine side has a faded question mark and label "more effective · less patentable". On hover/click, a small annotation expands explaining the patent dynamics. Use Framer Motion to animate the molecules with a slow rotation on enter.


SECTION 03 — The supplement aisle (industry rot)

Headline: "If pharma has bad incentives but at least some gatekeeping, the supplement industry has neither."

Body:
Under DSHEA (the U.S. Dietary Supplement Health and Education Act of 1994) and Health Canada's Natural Health Products framework, supplements do not require pre-market approval for safety or efficacy. The manufacturer self-attests. The FDA only steps in after harm — after adverse event reports, after lawsuits, after recalls.

The bottle on the shelf was not tested by the regulator before you bought it. The regulator is hoping you survive it.

Then a stat block grid (2x3 or 3x2 depending on viewport) with these numbers, each hover-expandable:

- 47% of protein powders exceeded California Prop 65 thresholds for toxic heavy metals (2024-25)
- 14-50% of sport supplements test positive for undisclosed prohibited substances
- 1 in 3 sports supplements don't contain key ingredients listed on label
- 59% of botanical supplements contained plant species not listed
- 700+ supplements identified by FDA as adulterated with hidden pharmaceuticals (2007-2016)
- 70,000 calls to U.S. poison control re: dietary supplements (2019 alone)

[Citations: Frontiers in Sports & Active Living 2023; Cohen et al. JAMA Network Open 2023; Clean Label Project 2024-25; GAO 2009; FDA adulteration database]


SECTION 04 — The bioavailability con

Headline: "What's on the label isn't what's in your bloodstream."

Body:
Even when a supplement contains what it says, the form often doesn't work.

Imagine your body is a house and a nutrient is a piece of furniture. Bioavailability is whether the furniture actually fits through the door.

You can buy a beautiful sofa. But if it's bolted to a six-foot crate, it stays on your porch. You paid for it. It's useless.

Most multivitamins do this on purpose. Why? Because the cheap, useless form of a nutrient costs the manufacturer about 90% less than the form your body can actually use.

Then a comparison table. Make it interactive — clicking a row expands it to show absorption data and the relevant study. Don't use HTML <table>; build with semantic divs styled to read like a publication table:

  Nutrient          Cheap (poor absorption)      Bioavailable form
  Magnesium         Magnesium oxide (~4%)        Glycinate / L-threonate (~40%)
  Vitamin B12       Cyanocobalamin               Methylcobalamin
  Folate (B9)       Folic acid                   L-methylfolate (5-MTHF)
  Vitamin D         D2 (ergocalciferol)          D3 + K2
  Curcumin          Plain curcumin               Liposomal / with piperine

Closing line, separated, larger:

"Same dose on the label. Ten times the actual effect. Pennies of difference in cost."


SECTION 05 — The deficiency epidemic

Headline: "Half of you are running on empty fuel tanks. You just don't know it yet."

Body:
[StatBlock] 51.1% of healthy adults globally are vitamin D deficient. Adults aged 19-44 are among the most affected. [Citation: Bratislava Medical Journal systematic review & meta-analysis, 2024]

[StatBlock] Magnesium deficiency is widespread in Western populations and directly impairs the body's ability to even use vitamin D. The two compound.

The Western diet — engineered by a food industry running the same playbook as pharma — is optimized for sales, not nutrition. Calorie-dense, nutrient-poor, hyper-palatable, addictive. High in processed fats, sodium, refined sugar. Low in everything that builds you.

These deficiencies aren't cosmetic. Vitamin D is now linked in the literature to depression, cardiovascular disease, autoimmune disorders, immune function. Magnesium affects sleep, mood, hormone production, stress response. Omega-3s affect cognition. B12 affects energy and dopamine.

Yes — diet, sleep, sun, and exercise are foundational. Anyone who tells you a pill replaces them is lying. But the highest-leverage thing you can do tomorrow morning, with the lowest effort, is take the right supplement in the right form.


SECTION 06 — The shift (research is free now)

Headline: "The information asymmetry is over."

Body:
For most of human history, the gatekeeper to medical knowledge was a doctor — and most doctors haven't read the latest research on most topics, because they don't have the time. The average primary care physician would need 20+ hours a week of reading just to stay current. Nobody does this. Nobody can.

But the research itself? PubMed. Cochrane. Google Scholar. Free. All of it. Right now.

And modern AI can synthesize the entire literature on a topic in minutes, weight studies by quality, summarize consensus, flag disagreements. For the price of a coffee.

This doesn't replace clinicians. It does something arguably more important: it removes the information asymmetry the old system depended on. You no longer have to trust. You can verify.

So the question becomes: if the research is free and the synthesis is cheap, why is anyone still selling you a multivitamin without showing the receipts?


SECTION 07 — What we're building

Headline: "Four commitments. No marketing copy."

Body:
A clean, four-card grid. Each card has a number (01, 02, 03, 04) in mono, a one-line headline in Instrument Serif italic, and a paragraph.

01 — Third-party tested. Every batch. Receipts public.
Every product is tested by an independent ISO-17025-accredited lab. Not us. Not our manufacturer. The certificate of analysis for your specific batch is on the product page, scannable from the bottle. Heavy metals, microbial contamination, ingredient identity, ingredient potency. If it's not on the test, it's not in the bottle.

02 — Only the bioavailable form. Always.
We will never use magnesium oxide. We will never use cyanocobalamin where methylcobalamin belongs. We will never use folic acid where 5-MTHF belongs. We pay 5-10x more per ingredient. We charge accordingly. Cheap doses of useless forms are not on offer here.

03 — Every claim links to the paper.
Every product page links directly to peer-reviewed meta-analyses and randomized controlled trials. Not a marketing summary — the actual studies. If we can't cite it, we don't claim it. If the literature is mixed, we say so.

04 — Built for prevention. Priced to make ourselves obsolete.
We don't want you on 14 supplements. We want you on the 3 or 4 your data and your life actually warrant. We are explicitly trying to need you less over time. That's the goal. That's the only honest goal.


SECTION 08 — Closer

A single Instrument Serif italic paragraph, large, centered, max-w-3xl:

"The healthcare system was built before the internet. Before open-access journals. Before AI. Before any consumer could verify what they were being told. It made sense to trust gatekeepers when knowledge was scarce and synthesis was hard. Neither is true anymore."

Then a single CTA button: "See the products →" linking to /products.
```

### `/products` — Catalog

A clean grid. 3 columns desktop, 2 tablet, 1 mobile. Each card:
- Square product image area (use a solid pale background `bg-[oklch(96%_0.005_240)]` with the product name in large Instrument Serif italic centered as a placeholder — no real photos)
- Below the image: small mono caps form name (e.g., `MAGNESIUM GLYCINATE`)
- Product name in Inter medium
- One-line benefit
- Price in Instrument Serif
- Hover state: a thin underline animates in beneath the product name; the image area gets a barely-perceptible scale (1.0 → 1.01); the "Add to cart" button fades in over the bottom of the image area.

Above the grid, a small filter row: All / Foundations / Mood & Sleep / Performance / Cognitive. Active filter has the accent color underline. Filtering animates with a subtle stagger using Framer Motion's `AnimatePresence` and `layout`.

### `/products/[slug]` — Product detail

Two-column layout on desktop. Image left (sticky, occupies viewport height). Right column scrolls.

Right column contents:
- Form name in mono caps
- Product name in Instrument Serif italic, large
- One-paragraph description
- Price + quantity stepper + "Add to cart" button (full-width on mobile, fixed-width on desktop)
- Tabs (custom, not shadcn): "Why this form" / "Research" / "Lab results" / "Suggested use"
  - **Why this form:** Plain prose explaining the bioavailability choice for this specific product
  - **Research:** A list of citations. Each one a card: title, authors, journal/year, finding summary, external link. Hover expands the finding summary.
  - **Lab results:** A mock certificate-of-analysis preview with batch number in mono, "tested by" lab name, and a list of pass/fail rows for heavy metals, microbial, identity, potency. All "PASS" with the accent color check.
  - **Suggested use:** Dosing, timing, stack notes.

### `/cart` and `<CartDrawer>`

Same data shape, two presentations. Drawer is the primary interface; full cart page is a fallback.

**Drawer behavior:**
- Slides in from right, 480px wide on desktop, full-width on mobile
- Backdrop is `bg-fg/20 backdrop-blur-sm`
- Header: "Cart" in Instrument Serif italic + close button
- Body: scrollable list of line items. Each line item has a 64px square image, name + form, price, quantity stepper (- N +), and a small remove (x) icon
- Footer: subtotal in mono, "Shipping calculated at checkout" subtle line, two buttons stacked: primary "Checkout →", secondary text "View full cart"

**Cart page:**
- Same line items but laid out as a wide table-like list
- Right sidebar with order summary

### `/checkout` — Mocked

A clean form. Two columns: form left, order summary right (sticky).
- Form fields: email, shipping address (split into proper fields), card number / expiry / CVC (DUMMY — these don't validate against any real provider, but use proper input masking with a small library or hand-rolled formatting)
- Submit button: "Place order"
- On submit: artificial 1.2-second loading state (button shows a subtle spinner), then navigate to `/checkout/success`

### `/checkout/success`

Centered, generous whitespace.
- A single accent-colored check icon, small (24px), at top
- Instrument Serif italic: "Order placed."
- Order number in mono
- "We've sent a confirmation to your email" in muted text
- "← Back to shop" link

---

## 5. Product catalog data

Create `/lib/data/products.ts` exporting an array of products. Use this exact catalog:

```typescript
export const products = [
  {
    slug: 'vitamin-d3-k2',
    name: 'Vitamin D3 + K2',
    form: 'CHOLECALCIFEROL · MK-7',
    category: 'foundations',
    price: 32,
    benefit: 'The deficiency 51% of adults have. Paired with K2 for proper calcium routing.',
    dosage: '5,000 IU D3 + 100mcg MK-7 per softgel',
    formRationale: 'D3 (cholecalciferol) is the form your body produces from sunlight, with substantially higher potency at raising serum 25(OH)D levels than D2 (ergocalciferol). MK-7 is the long-half-life form of K2, ensuring calcium gets routed to bones rather than arteries.',
    citations: ['vit-d-meta-2024', 'd3-vs-d2', 'k2-mk7'],
    suggestedUse: 'One softgel with the largest meal of the day, ideally one containing fat. D3 is fat-soluble; absorption drops 30-50% on an empty stomach.',
  },
  {
    slug: 'magnesium-glycinate',
    name: 'Magnesium Glycinate',
    form: 'BISGLYCINATE CHELATE',
    category: 'mood-sleep',
    price: 28,
    benefit: 'The form that actually absorbs. For sleep, stress, and the 50% of adults running deficient.',
    dosage: '400mg elemental magnesium per 2 capsules',
    formRationale: 'Magnesium oxide (the form in most multivitamins) has roughly 4% bioavailability. Magnesium bisglycinate chelate is approximately 40% bioavailable — ten times the absorption at the same labeled dose. Glycinate also crosses the blood-brain barrier, supporting GABA activity and sleep architecture.',
    citations: ['mg-bioavailability', 'mg-sleep-rct', 'mg-deficiency-prevalence'],
    suggestedUse: 'Two capsules 30-60 minutes before bed. Can split AM/PM if used for stress.',
  },
  {
    slug: 'methylated-b-complex',
    name: 'Methylated B-Complex',
    form: '5-MTHF · METHYLCOBALAMIN',
    category: 'foundations',
    price: 36,
    benefit: 'Active forms only. For the ~40% of people whose genetics block conversion of folic acid.',
    dosage: 'Full B-spectrum, methylated forms, per capsule',
    formRationale: 'Roughly 40% of the population carries an MTHFR gene variant that impairs conversion of folic acid into the active form your cells use. We skip the conversion problem entirely by providing pre-methylated folate (L-5-MTHF) and B12 (methylcobalamin). Same logic across the rest of the B-spectrum.',
    citations: ['mthfr-prevalence', 'methylfolate-vs-folic'],
    suggestedUse: 'One capsule with breakfast. B-vitamins are stimulating for some people; avoid taking late in the day.',
  },
  {
    slug: 'omega-3',
    name: 'Omega-3 (EPA/DHA)',
    form: 'TRIGLYCERIDE FORM · 3:2 RATIO',
    category: 'foundations',
    price: 42,
    benefit: 'Triglyceride-form fish oil. Tested for oxidation. Most cheap omega-3s on shelves are already rancid.',
    dosage: '1,500mg combined EPA+DHA per 2 softgels',
    formRationale: 'We use the triglyceride form (rTG) over the cheaper ethyl ester form (EE), which is about 70% more bioavailable. Every batch is tested for total oxidation (TOTOX) — a measure of rancidity. Many cheap fish oils on shelves test above the threshold considered safe; ours stays well below.',
    citations: ['omega3-tg-vs-ee', 'omega3-cognition', 'omega3-oxidation-shelf'],
    suggestedUse: 'Two softgels with a meal containing fat.',
  },
  {
    slug: 'creatine-monohydrate',
    name: 'Creatine Monohydrate',
    form: 'MICRONIZED · UNFLAVORED',
    category: 'performance',
    price: 24,
    benefit: 'The most-studied supplement in sports nutrition. Works in the brain too, not just muscles.',
    dosage: '5g per scoop',
    formRationale: 'Creatine monohydrate is the form with the largest evidence base — over 1,000 published studies. We do not use the more expensive "buffered" or "HCl" variants because the research does not support them being meaningfully better. Micronized for solubility.',
    citations: ['creatine-meta', 'creatine-cognition'],
    suggestedUse: 'One scoop daily, any time. Timing does not meaningfully matter despite what the internet tells you. Take with water or any beverage.',
  },
  {
    slug: 'l-theanine',
    name: 'L-Theanine',
    form: 'SUNTHEANINE · 200MG',
    category: 'mood-sleep',
    price: 26,
    benefit: 'Calm without sedation. Pairs with caffeine to remove the jitter without killing the focus.',
    dosage: '200mg per capsule',
    formRationale: 'Suntheanine is the patented pure L-isomer form, which research has used in the majority of clinical trials. Generic theanine is often a mix of L- and D- isomers, with only the L- form active.',
    citations: ['theanine-caffeine', 'theanine-anxiety'],
    suggestedUse: 'One capsule with morning coffee, or 1-2 capsules during high-stress periods.',
  },
];
```

Citations referenced should live in `/lib/data/citations.ts`. Build the structure to match the IDs above. For each citation, include: `id`, `authors`, `title`, `journal`, `year`, `url`, `summary` (one sentence). Use the citations from the brand story sections above where they match; for product-specific ones, use plausible peer-reviewed papers (e.g., "Kreider et al., J Int Soc Sports Nutr, 2017" for the creatine meta — that's a real one). Do not fabricate journals or DOIs; if you don't know one, leave the URL field as a search query to PubMed.

---

## 6. Animation specifications (concrete)

**Use Framer Motion's `motion/react` package, not the legacy `framer-motion`.**

### Scroll reveals (used everywhere)
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
```

### Stat counter (used in Hero stats and Story sections)
Custom hook `useCountUp(targetValue, duration)` that animates from 0 to target when the element is in view. Use `useInView` from Framer Motion. Format with `Intl.NumberFormat`. Respect reduced-motion (jump to final value immediately).

### StatBlock hover expansion
Default state: number + 1-line context. On hover (and on focus, for keyboard accessibility), the card animates `height: auto` to reveal additional context + the citation link. Use Framer Motion's `layout` prop with a `transition` of 250ms ease-out. The number itself does not move.

### Citation popover
Use Radix Popover. Trigger is the `<Citation>` component. Content is positioned `top` with `sideOffset={8}`. Animate in with a 200ms scale-from-95% + fade.

### Nav scroll behavior
Use `useScroll` from Framer Motion. When `scrollY > 80`, animate the nav background from `transparent` to `bg-bg/80 backdrop-blur-md` and add a hairline bottom border. 200ms transition.

### Reading progress indicator (Story page)
A thin (`w-px`) vertical line on the left side of the viewport, sticky-positioned. Use `useScroll` with `useTransform` to map scroll progress to the height of an inner fill div. Accent color.

### Section indicator (Story page, desktop only)
On the right edge of the viewport, sticky. Shows current section number and title in mono. Use `IntersectionObserver` (or the `useInView` hook for each section) to track which section is currently in view, and animate the text crossfade with `AnimatePresence` and `mode="wait"`.

### Cart drawer
Use Radix Dialog. Custom transition: drawer slides from `x: 100%` to `x: 0%` over 350ms. Backdrop fades in over 200ms. Use Framer Motion to override Radix's default animation.

### Reduced motion
Wrap any non-essential animation in:
```tsx
const prefersReducedMotion = useReducedMotion();
const animationProps = prefersReducedMotion
  ? { initial: false, animate: false }
  : { initial: { ... }, animate: { ... } };
```

---

## 7. Cart implementation

```typescript
// /lib/store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  slug: string;
  name: string;
  form: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === product.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === product.slug
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...product, quantity }],
            isOpen: true,
          };
        }),
      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((i) => i.slug !== slug),
        })),
      updateQuantity: (slug, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.slug !== slug)
            : state.items.map((i) =>
                i.slug === slug ? { ...i, quantity } : i
              ),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'supp-cart-v1' }
  )
);
```

When `addItem` is called, the drawer should auto-open. The cart icon in the nav should show a count badge that animates in (scale 0 → 1, 200ms spring) when the count goes from 0 → 1, and pulses briefly when an item is added. Use `useEffect` watching `itemCount()` and key the badge by count to retrigger animation.

For the checkout page, on form submission, `setTimeout` for 1200ms while showing a loading state, then call `clear()` and `router.push('/checkout/success')`. Generate a fake order number client-side: `ORD-` + 8 random uppercase alphanumeric chars.

---

## 8. Anti-patterns — do not do these

- **Do not** use cream/orange/sage color palettes. The accent is restrained green; everything else is monochrome. If your output looks like a typical wellness brand or a default Claude artifact, restart.
- **Do not** use rounded-2xl or rounded-3xl on cards. Square or barely-rounded only.
- **Do not** use gradient backgrounds anywhere. Solid colors only.
- **Do not** use shadcn/ui or any other component kit. Build primitives from scratch.
- **Do not** use emoji in UI copy.
- **Do not** use stock photos or AI-generated imagery for product images. Use the typographic placeholder pattern described above.
- **Do not** use multiple accent colors. One green, used sparingly.
- **Do not** use modals for non-critical interactions. Use popovers and inline expansions.
- **Do not** add a "newsletter signup" popup. Kill on sight.
- **Do not** use exclamation points in body copy. The brand is confident and dry, not enthusiastic.
- **Do not** add sliders/carousels on the landing page. Static layouts only.
- **Do not** add animated "verified" badges that pulse forever. Animations should resolve and stop.
- **Do not** ship with `console.log` left in. Run a final pass and remove debug output.

---

## 9. File structure

```
/app
  /layout.tsx              Root layout — fonts, Nav, CartDrawer mounted globally, Footer
  /page.tsx                Landing
  /story/page.tsx          Manifesto
  /products/page.tsx       Catalog
  /products/[slug]/page.tsx
  /cart/page.tsx
  /checkout/page.tsx
  /checkout/success/page.tsx
  /globals.css             Tailwind import + @theme tokens
/components
  /nav.tsx
  /footer.tsx
  /cart-drawer.tsx
  /citation.tsx
  /stat-block.tsx
  /count-up.tsx
  /reading-progress.tsx
  /section-indicator.tsx
  /product-card.tsx
  /button.tsx              Primary, secondary, ghost variants
  /molecule-comparison.tsx (for the ketamine section)
/lib
  /store/cart.ts
  /data/products.ts
  /data/citations.ts
  /utils/cn.ts
  /hooks/use-count-up.ts
  /hooks/use-reduced-motion.ts
```

---

## 10. Definition of done

The site is done when:

1. All seven routes render without errors and look polished on desktop and mobile (test at 375px, 768px, 1280px, 1920px).
2. The Story page reads top-to-bottom as a coherent piece, with all citations functional (popover opens, links work) and the reading progress indicator filling smoothly.
3. The cart works end-to-end: add from product card, add from product detail, change quantity in drawer, remove items, persist on refresh, clear on order completion.
4. The mocked checkout completes successfully and lands on the success page with a generated order number.
5. The molecule comparison in the ketamine section animates and is interactive.
6. All scroll reveals, stat counters, hover expansions, and the cart drawer transition feel smooth and resolve cleanly (no jank, no infinite loops).
7. `prefers-reduced-motion` is respected globally — set it in your OS and reload; nothing should violently animate.
8. Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.
9. No console errors or warnings.
10. The aesthetic passes the gut check: if you showed it to a designer who works at Linear or Vercel, they would not immediately spot it as AI-generated. If they would, iterate on typography and spacing first — that's where AI output usually betrays itself.

---

## 11. Build order (recommended)

1. Scaffold Next.js, install deps, set up Tailwind v4 with the theme tokens, set up fonts, get a basic layout rendering with Nav + Footer.
2. Build the primitives: `<Button>`, `<Citation>`, `<StatBlock>`, `<CountUp>`. Get them looking right in isolation.
3. Build the products and citations data files.
4. Build `/products` and `/products/[slug]` — getting the catalog plumbing right unlocks everything else.
5. Build the cart store and `<CartDrawer>`. Wire up to product pages.
6. Build the landing page using the components you now have.
7. Build the Story page. This is the hardest one — give it real time. Build section by section, get each one right before moving on.
8. Build checkout flow. Mock the submission.
9. Polish pass: animations, reduced-motion, spacing audit, mobile audit, accessibility audit (keyboard nav, focus states, screen-reader labels).
10. Lighthouse pass.

Start now. Ask clarifying questions only if a spec is genuinely ambiguous; otherwise make defensible decisions and document them in a `DECISIONS.md` at the project root.
