import Link from "next/link";
import { Citation } from "@/components/citation";
import { StatBlock } from "@/components/stat-block";
import { ReadingProgress } from "@/components/reading-progress";
import { SectionIndicator } from "@/components/section-indicator";
import { MoleculeComparison } from "@/components/molecule-comparison";
import { FailureCards } from "@/components/failure-cards";
import { BioavailabilityTable } from "@/components/bioavailability-table";
import { Reveal } from "@/components/reveal";
import { ScrollCue } from "@/components/scroll-cue";
import { Button } from "@/components/button";

export const metadata = {
  title: "Story — Complere",
  description:
    "A manifesto on a healthcare system designed to keep you a customer, and what it would take to build something honest in its place.",
};

const SECTIONS = [
  { id: "section-01", number: "01", title: "The Problem" },
  { id: "section-02", number: "02", title: "The Ketamine Problem" },
  { id: "section-03", number: "03", title: "The Supplement Aisle" },
  { id: "section-04", number: "04", title: "The Bioavailability Con" },
  { id: "section-05", number: "05", title: "The Deficiency Epidemic" },
  { id: "section-06", number: "06", title: "The Shift" },
  { id: "section-07", number: "07", title: "What We're Building" },
  { id: "section-08", number: "08", title: "Closer" },
];

const aisleStats: Array<{
  display?: string;
  value: number;
  suffix?: string;
  context: string;
  detail: string;
  citationId: string;
}> = [
  {
    value: 47,
    suffix: "%",
    context:
      "of protein powders exceeded California Prop 65 thresholds for toxic heavy metals.",
    detail:
      "2024–25 retail sampling found 47% of leading protein powders exceeded Prop 65 limits for at least one toxic heavy metal — most often lead or arsenic.",
    citationId: "protein-heavy-metals",
  },
  {
    display: "14–50%",
    value: 50,
    context:
      "of sport supplements test positive for undisclosed prohibited substances.",
    detail:
      "Frontiers in Sports & Active Living, 2023: depending on category and region, between 14% and 50% of sport supplements contained undisclosed banned substances.",
    citationId: "supp-doping",
  },
  {
    display: "1 in 3",
    value: 33,
    context:
      "sports supplements don't contain key ingredients listed on the label.",
    detail:
      "JAMA Network Open, 2023: roughly one third of sport supplements tested did not contain key labeled ingredients in any meaningful quantity.",
    citationId: "supp-mislabel",
  },
  {
    value: 59,
    suffix: "%",
    context:
      "of botanical supplements contained plant species not listed on the label.",
    detail:
      "BMC Medicine, 2013: DNA barcoding of North American herbal products found 59% contained plant species not listed on the label, including some with safety concerns.",
    citationId: "supp-botanical",
  },
  {
    value: 700,
    suffix: "+",
    context:
      "supplements identified by FDA as adulterated with hidden pharmaceuticals.",
    detail:
      "Between 2007 and 2016, the FDA database identified more than 700 supplements containing undisclosed pharmaceutical ingredients. Most public-health researchers consider this an undercount.",
    citationId: "supp-adulterated",
  },
  {
    value: 70000,
    context:
      "calls to U.S. poison control re: dietary supplements (2019 alone).",
    detail:
      "American Association of Poison Control Centers Annual Report: roughly 70,000 calls in 2019 alone were related to dietary supplement exposures.",
    citationId: "supp-poison-control",
  },
];

const commitments = [
  {
    number: "01",
    headline: "Third-party tested. Every batch. Receipts public.",
    body: "Every product is tested by an independent ISO-17025-accredited lab. Not us. Not our manufacturer. The certificate of analysis for your specific batch is on the product page, scannable from the bottle. Heavy metals, microbial contamination, ingredient identity, ingredient potency. If it's not on the test, it's not in the bottle.",
  },
  {
    number: "02",
    headline: "Only the bioavailable form. Always.",
    body: "We will never use magnesium oxide. We will never use cyanocobalamin where methylcobalamin belongs. We will never use folic acid where 5-MTHF belongs. We pay 5–10× more per ingredient. We charge accordingly. Cheap doses of useless forms are not on offer here.",
  },
  {
    number: "03",
    headline: "Every claim links to the paper.",
    body: "Every product page links directly to peer-reviewed meta-analyses and randomized controlled trials. Not a marketing summary — the actual studies. If we can't cite it, we don't claim it. If the literature is mixed, we say so.",
  },
  {
    number: "04",
    headline: "Built for prevention. Priced to make ourselves obsolete.",
    body: "We don't want you on 14 supplements. We want you on the 3 or 4 your data and your life actually warrant. We are explicitly trying to need you less over time. That's the goal. That's the only honest goal.",
  },
];

export default function StoryPage() {
  return (
    <article className="relative">
      <ReadingProgress />
      <SectionIndicator sections={SECTIONS} />

      {/* HERO */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 text-center md:pt-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
            A manifesto
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-10 max-w-4xl font-serif text-[2.25rem] italic leading-[1.04] tracking-tight text-fg text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            You&rsquo;ve been sold a system that profits when you stay sick.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <ScrollCue />
        </Reveal>
      </section>

      {/* SECTION 01 */}
      <section
        id="section-01"
        className="px-6 py-24 md:py-40"
      >
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="01" title="The problem" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              The system isn&rsquo;t broken. It&rsquo;s working as designed.
            </h2>
          </Reveal>
          <Reveal>
            <Prose>
              <p>
                Modern healthcare in North America is built on top of capitalism. Every actor in the chain — insurance, pharma, hospitals, most clinics — is optimizing for revenue, not for your long-term outcomes. It&rsquo;s not a conspiracy. It&rsquo;s just math.
              </p>
              <p>
                That math leads to predictable results: treat symptoms, not causes. Prescribe, don&rsquo;t prevent. Speed over depth. Glacial regulatory timelines that mean only patent-protected molecules ever get the funding to reach you.
              </p>
              <p>
                Which means the drugs you can legally buy are not the best drugs that exist. They&rsquo;re the best drugs someone could profitably sell.
              </p>
            </Prose>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <Reveal>
            <FailureCards />
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* SECTION 02 */}
      <section id="section-02" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="02" title="The ketamine problem" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              Case study: a drug, two enantiomers, one paycheck.
            </h2>
          </Reveal>
          <Reveal>
            <Prose>
              <p>
                Ketamine has two mirror-image forms — R-ketamine and S-ketamine. Same molecule, flipped.
              </p>
              <p>
                In 2019, Johnson &amp; Johnson got FDA approval for an isolated S-ketamine nasal spray called Spravato for treatment-resistant depression. Big launch. Heavy marketing. Insurance coverage.
              </p>
              <p>Here&rsquo;s what didn&rsquo;t make the press release:</p>
            </Prose>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-3">
          <Reveal>
            <StatBlock
              display="2×"
              value={2}
              context="Racemic ketamine produced response and remission rates roughly twice as high as esketamine."
              detail="Bahji et al., a 2020 meta-analysis of 24 trials and ~1,877 patients, with fewer dropouts on the racemic side."
              citationId="ketamine-bahji-2020"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <StatBlock
              display="0.28"
              value={0.28}
              decimals={2}
              context="The FDA's own internal effect-size analysis put esketamine at SMD = 0.28."
              detail="Comparable to or worse than older, cheaper drugs. The approval passed on a 14-2 advisory vote. The UK's NHS rejected it outright."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <StatBlock
              display="R > S"
              value={1}
              context="Preclinical work consistently shows R-ketamine has longer-lasting antidepressant effects."
              detail="Yang et al., Translational Psychiatry, 2015: with fewer dissociative side effects than S-ketamine."
              citationId="ketamine-yang-2015"
            />
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-2xl">
          <Reveal>
            <Prose>
              <p>So why is the worse molecule the one in pharmacies?</p>
              <p>
                Because{" "}
                <Citation id="ketamine-bahji-2020">
                  racemic ketamine has been off-patent since the 1970s
                </Citation>
                . R-ketamine, the more promising enantiomer, has the same problem — it&rsquo;s a known compound, hard to patent. The only way to make ketamine profitable was to isolate one half, repackage it as a &ldquo;new&rdquo; drug, and charge accordingly.
              </p>
              <p>
                The version with the strongest patent moat got the funding. The version that probably works better is still stuck in early-phase research.
              </p>
              <p>
                This is not an isolated case. This is the operating system.
              </p>
            </Prose>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <Reveal>
            <MoleculeComparison />
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* SECTION 03 */}
      <section id="section-03" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="03" title="The supplement aisle" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              If pharma has bad incentives but at least some gatekeeping, the supplement industry has neither.
            </h2>
          </Reveal>
          <Reveal>
            <Prose>
              <p>
                Under{" "}
                <Citation id="supp-mislabel">
                  DSHEA — the U.S. Dietary Supplement Health and Education Act of 1994
                </Citation>
                {" "}
                and Health Canada&rsquo;s Natural Health Products framework, supplements do not require pre-market approval for safety or efficacy. The manufacturer self-attests. The FDA only steps in after harm — after adverse event reports, after lawsuits, after recalls.
              </p>
              <p>
                The bottle on the shelf was not tested by the regulator before you bought it. The regulator is hoping you survive it.
              </p>
            </Prose>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid grid-cols-1 gap-x-12 gap-y-14 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {aisleStats.map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <StatBlock
                  value={s.value}
                  display={s.display}
                  suffix={s.suffix}
                  context={s.context}
                  detail={s.detail}
                  citationId={s.citationId}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 04 */}
      <section id="section-04" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="04" title="The bioavailability con" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              What&rsquo;s on the label isn&rsquo;t what&rsquo;s in your bloodstream.
            </h2>
          </Reveal>
          <Reveal>
            <Prose>
              <p>Even when a supplement contains what it says, the form often doesn&rsquo;t work.</p>
              <p>
                Imagine your body is a house and a nutrient is a piece of furniture. Bioavailability is whether the furniture actually fits through the door.
              </p>
              <p>
                You can buy a beautiful sofa. But if it&rsquo;s bolted to a six-foot crate, it stays on your porch. You paid for it. It&rsquo;s useless.
              </p>
              <p>
                Most multivitamins do this on purpose. Why?{" "}
                <Citation id="mg-bioavailability">
                  Because the cheap, useless form of a nutrient costs the manufacturer about 90% less than the form your body can actually use.
                </Citation>
              </p>
            </Prose>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <Reveal>
            <BioavailabilityTable />
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-3xl text-center">
          <Reveal>
            <p className="font-serif text-2xl italic leading-snug tracking-tight text-fg sm:text-3xl md:text-4xl text-balance">
              Same dose on the label. Ten times the actual effect. Pennies of difference in cost.
            </p>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* SECTION 05 */}
      <section id="section-05" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="05" title="The deficiency epidemic" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              Half of you are running on empty fuel tanks. You just don&rsquo;t know it yet.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
          <Reveal>
            <StatBlock
              value={51.1}
              suffix="%"
              decimals={1}
              context="of healthy adults globally are vitamin D deficient. Adults aged 19–44 are among the most affected."
              detail="Cui et al., Bratislava Medical Journal, 2024 — pooled prevalence from a global systematic review and meta-analysis."
              citationId="vit-d-meta-2024"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <StatBlock
              display="Compounding"
              value={1}
              context="Magnesium deficiency is widespread in Western populations and directly impairs the body's ability to even use vitamin D."
              detail="DiNicolantonio et al., Open Heart 2018: subclinical magnesium deficiency interferes with vitamin D activation, so the two deficiencies compound rather than offset."
              citationId="mg-deficiency-prevalence"
            />
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-2xl">
          <Reveal>
            <Prose>
              <p>
                The Western diet — engineered by a food industry running the same playbook as pharma — is optimized for sales, not nutrition. Calorie-dense, nutrient-poor, hyper-palatable, addictive. High in processed fats, sodium, refined sugar. Low in everything that builds you.
              </p>
              <p>
                These deficiencies aren&rsquo;t cosmetic. Vitamin D is now linked in the literature to depression, cardiovascular disease, autoimmune disorders, immune function. Magnesium affects sleep, mood, hormone production, stress response. Omega-3s affect cognition. B12 affects energy and dopamine.
              </p>
              <p>
                Yes — diet, sleep, sun, and exercise are foundational. Anyone who tells you a pill replaces them is lying. But the highest-leverage thing you can do tomorrow morning, with the lowest effort, is take the right supplement in the right form.
              </p>
            </Prose>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* SECTION 06 */}
      <section id="section-06" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="06" title="The shift" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              The information asymmetry is over.
            </h2>
          </Reveal>
          <Reveal>
            <Prose>
              <p>
                For most of human history, the gatekeeper to medical knowledge was a doctor — and most doctors haven&rsquo;t read the latest research on most topics, because they don&rsquo;t have the time. The average primary care physician would need 20+ hours a week of reading just to stay current. Nobody does this. Nobody can.
              </p>
              <p>
                But the research itself? PubMed. Cochrane. Google Scholar. Free. All of it. Right now.
              </p>
              <p>
                And modern AI can synthesize the entire literature on a topic in minutes, weight studies by quality, summarize consensus, flag disagreements. For the price of a coffee.
              </p>
              <p>
                This doesn&rsquo;t replace clinicians. It does something arguably more important: it removes the information asymmetry the old system depended on. You no longer have to trust. You can verify.
              </p>
              <p>
                So the question becomes: if the research is free and the synthesis is cheap, why is anyone still selling you a multivitamin without showing the receipts?
              </p>
            </Prose>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* SECTION 07 */}
      <section id="section-07" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionLabel number="07" title="What we're building" />
          </Reveal>
          <Reveal>
            <h2 className="mt-12 font-serif text-3xl italic leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl text-balance">
              Four commitments. No marketing copy.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {commitments.map((c) => (
            <Reveal key={c.number}>
              <div className="h-full bg-bg-elevated p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                  {c.number}
                </p>
                <h3 className="mt-6 font-serif text-2xl italic leading-tight tracking-tight text-fg sm:text-3xl">
                  {c.headline}
                </h3>
                <p className="mt-5 text-[14px] leading-relaxed text-fg-muted">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* SECTION 08 */}
      <section id="section-08" className="px-6 py-24 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-serif text-2xl italic leading-[1.2] tracking-tight text-fg sm:text-3xl md:text-4xl text-balance">
              The healthcare system was built before the internet. Before open-access journals. Before AI. Before any consumer could verify what they were being told. It made sense to trust gatekeepers when knowledge was scarce and synthesis was hard. Neither is true anymore.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <Link href="/products">
                <Button size="lg" className="px-10">
                  See the products →
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {number}
      </span>
      <span className="h-px flex-1 bg-border" />
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
        {title}
      </span>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-block mt-8 space-y-6 text-[17px] leading-relaxed text-fg-muted [&_p]:text-pretty">
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div aria-hidden className="mx-auto max-w-6xl px-6">
      <div className="h-px w-full bg-border" />
    </div>
  );
}
