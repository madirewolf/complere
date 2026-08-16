import Link from "next/link";
import { Button } from "@/components/button";
import { products, featuredProductSlugs } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card";
import { StatBlock } from "@/components/stat-block";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";

const heroStats = [
  {
    value: 51,
    suffix: "%",
    context: "of healthy adults globally are vitamin D deficient.",
    detail:
      "Pooled prevalence from a 2024 systematic review covering hundreds of studies. Adults aged 19–44 are among the most affected.",
    citationId: "vit-d-meta-2024",
  },
  {
    value: 47,
    suffix: "%",
    context: "of protein powders exceed California Prop 65 limits for heavy metals.",
    detail:
      "Independent retail sampling found 47% of leading protein powders exceed Prop 65 thresholds for at least one toxic heavy metal.",
    citationId: "protein-heavy-metals",
  },
  {
    display: "1 in 3",
    value: 33,
    context: "supplements don't contain what's on the label.",
    detail:
      "JAMA Network Open 2023: ingredient testing of sport supplements found roughly one in three did not contain key labeled ingredients in meaningful quantity.",
    citationId: "supp-mislabel",
  },
  {
    value: 700,
    suffix: "+",
    context: "supplements identified by FDA as adulterated with hidden pharmaceuticals.",
    detail:
      "Between 2007 and 2016, the FDA database identified more than 700 supplements containing undisclosed pharmaceutical ingredients — a count widely regarded as an undercount.",
    citationId: "supp-adulterated",
  },
];

export default function HomePage() {
  const featured = featuredProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 pb-20 pt-28 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
              Independently tested · cited · bioavailable
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 font-serif text-[2.5rem] italic leading-[1.04] tracking-tight text-fg text-balance sm:text-[3.5rem] md:text-[4.5rem]">
              The supplement industry has a trust problem. We&rsquo;re the receipts.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-fg-muted text-pretty md:text-[17px]">
              Third-party tested every batch. Only the bioavailable forms. Every claim linked to peer-reviewed research.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/products">
                <Button size="lg" className="px-8">
                  Shop the line
                </Button>
              </Link>
              <Link href="/story">
                <Button variant="ghost" size="lg" className="px-6">
                  Read the story →
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {heroStats.map((s, i) => (
            <div key={i} className="px-6 py-12 md:px-8 md:py-16">
              <StatBlock
                value={s.value}
                suffix={s.suffix}
                display={s.display}
                context={s.context}
                detail={s.detail}
                citationId={s.citationId}
              />
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-6 border-b border-border pb-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                  The line
                </p>
                <h2 className="mt-3 font-serif text-3xl italic tracking-tight text-fg sm:text-4xl">
                  Featured products
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg sm:inline-flex"
              >
                See all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="border-t border-border bg-bg-elevated px-6 py-20 md:py-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="font-serif text-3xl italic leading-[1.15] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              &ldquo;The healthcare system was built before the internet. Before open-access journals. Before AI. It made sense to trust gatekeepers when knowledge was scarce. Neither is true anymore.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                A manifesto
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
                Modern healthcare is built on top of capitalism. Every actor in the chain is optimizing for revenue, not your long-term outcomes. That math leads to predictable results — and a supplement aisle that has neither pharma&rsquo;s incentives nor its gatekeeping.
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-muted">
                The information asymmetry is over. Here&rsquo;s the case.
              </p>
              <Link
                href="/story"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
              >
                Read the full story
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
