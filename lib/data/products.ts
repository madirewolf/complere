export interface Product {
  slug: string;
  name: string;
  form: string;
  category: ProductCategory;
  price: number;
  benefit: string;
  dosage: string;
  formRationale: string;
  citations: string[];
  suggestedUse: string;
  description: string;
  batchNumber: string;
  testingLab: string;
  servings: number;
}

export type ProductCategory =
  | "foundations"
  | "mood-sleep"
  | "performance"
  | "cognitive";

export const categoryLabels: Record<ProductCategory | "all", string> = {
  all: "All",
  foundations: "Foundations",
  "mood-sleep": "Mood & Sleep",
  performance: "Performance",
  cognitive: "Cognitive",
};

export const categoryOrder: (ProductCategory | "all")[] = [
  "all",
  "foundations",
  "mood-sleep",
  "performance",
  "cognitive",
];

export const products: Product[] = [
  {
    slug: "vitamin-d3-k2",
    name: "Vitamin D3 + K2",
    form: "CHOLECALCIFEROL · MK-7",
    category: "foundations",
    price: 32,
    benefit:
      "The deficiency 51% of adults have. Paired with K2 for proper calcium routing.",
    description:
      "A foundational pairing that addresses the most prevalent micronutrient deficiency in modern life. D3 is the form your body produces from sunlight; MK-7 is the long-half-life form of K2 that ensures the calcium D3 helps you absorb ends up in your bones rather than your arteries.",
    dosage: "5,000 IU D3 + 100mcg MK-7 per softgel",
    formRationale:
      "D3 (cholecalciferol) is the form your body produces from sunlight, with substantially higher potency at raising serum 25(OH)D levels than D2 (ergocalciferol). MK-7 is the long-half-life form of K2, ensuring calcium gets routed to bones rather than arteries.",
    citations: ["vit-d-meta-2024", "d3-vs-d2", "k2-mk7"],
    suggestedUse:
      "One softgel with the largest meal of the day, ideally one containing fat. D3 is fat-soluble; absorption drops 30–50% on an empty stomach.",
    batchNumber: "VD3-2026-04-A",
    testingLab: "Eurofins Microbiology Laboratories",
    servings: 90,
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    form: "BISGLYCINATE CHELATE",
    category: "mood-sleep",
    price: 28,
    benefit:
      "The form that actually absorbs. For sleep, stress, and the 50% of adults running deficient.",
    description:
      "A chelated magnesium that crosses the blood-brain barrier, supporting GABA activity and the restorative phases of sleep. Most multivitamins use magnesium oxide because it is cheap and packs more elemental magnesium per pill — neither matters if it is barely absorbed.",
    dosage: "400mg elemental magnesium per 2 capsules",
    formRationale:
      "Magnesium oxide (the form in most multivitamins) has roughly 4% bioavailability. Magnesium bisglycinate chelate is approximately 40% bioavailable — ten times the absorption at the same labeled dose. Glycinate also crosses the blood-brain barrier, supporting GABA activity and sleep architecture.",
    citations: [
      "mg-bioavailability",
      "mg-sleep-rct",
      "mg-deficiency-prevalence",
    ],
    suggestedUse:
      "Two capsules 30–60 minutes before bed. Can split AM/PM if used for stress.",
    batchNumber: "MG-2026-04-C",
    testingLab: "Alkemist Labs",
    servings: 60,
  },
  {
    slug: "methylated-b-complex",
    name: "Methylated B-Complex",
    form: "5-MTHF · METHYLCOBALAMIN",
    category: "foundations",
    price: 36,
    benefit:
      "Active forms only. For the ~40% of people whose genetics block conversion of folic acid.",
    description:
      "A full B-spectrum in pre-converted, ready-to-use forms. Roughly 40% of the population carries an MTHFR variant that limits conversion of folic acid into the active L-5-MTHF your cells actually use. This formula skips the conversion problem entirely.",
    dosage: "Full B-spectrum, methylated forms, per capsule",
    formRationale:
      "Roughly 40% of the population carries an MTHFR gene variant that impairs conversion of folic acid into the active form your cells use. We skip the conversion problem entirely by providing pre-methylated folate (L-5-MTHF) and B12 (methylcobalamin). Same logic across the rest of the B-spectrum.",
    citations: ["mthfr-prevalence", "methylfolate-vs-folic"],
    suggestedUse:
      "One capsule with breakfast. B-vitamins are stimulating for some people; avoid taking late in the day.",
    batchNumber: "MB-2026-03-E",
    testingLab: "Eurofins Microbiology Laboratories",
    servings: 60,
  },
  {
    slug: "omega-3",
    name: "Omega-3 (EPA/DHA)",
    form: "TRIGLYCERIDE FORM · 3:2 RATIO",
    category: "foundations",
    price: 42,
    benefit:
      "Triglyceride-form fish oil. Tested for oxidation. Most cheap omega-3s on shelves are already rancid.",
    description:
      "The triglyceride (rTG) form of fish oil, which research shows is roughly 70% more bioavailable than the cheaper ethyl ester form. Every batch is tested for total oxidation (TOTOX). Many shelf-stable competitors test above the threshold considered safe — ours stays well below.",
    dosage: "1,500mg combined EPA+DHA per 2 softgels",
    formRationale:
      "We use the triglyceride form (rTG) over the cheaper ethyl ester form (EE), which is about 70% more bioavailable. Every batch is tested for total oxidation (TOTOX) — a measure of rancidity. Many cheap fish oils on shelves test above the threshold considered safe; ours stays well below.",
    citations: [
      "omega3-tg-vs-ee",
      "omega3-cognition",
      "omega3-oxidation-shelf",
    ],
    suggestedUse: "Two softgels with a meal containing fat.",
    batchNumber: "OM-2026-04-B",
    testingLab: "IFOS (International Fish Oil Standards)",
    servings: 60,
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    form: "MICRONIZED · UNFLAVORED",
    category: "performance",
    price: 24,
    benefit:
      "The most-studied supplement in sports nutrition. Works in the brain too, not just muscles.",
    description:
      "Plain creatine monohydrate, micronized for solubility. Over a thousand published studies support its effect on high-intensity performance, recovery, and increasingly on cognition under stress. We do not charge a premium for novelty forms whose evidence does not justify the markup.",
    dosage: "5g per scoop",
    formRationale:
      "Creatine monohydrate is the form with the largest evidence base — over 1,000 published studies. We do not use the more expensive 'buffered' or 'HCl' variants because the research does not support them being meaningfully better. Micronized for solubility.",
    citations: ["creatine-meta", "creatine-cognition"],
    suggestedUse:
      "One scoop daily, any time. Timing does not meaningfully matter despite what the internet tells you. Take with water or any beverage.",
    batchNumber: "CR-2026-02-A",
    testingLab: "Eurofins Microbiology Laboratories",
    servings: 60,
  },
  {
    slug: "l-theanine",
    name: "L-Theanine",
    form: "SUNTHEANINE · 200MG",
    category: "mood-sleep",
    price: 26,
    benefit:
      "Calm without sedation. Pairs with caffeine to remove the jitter without killing the focus.",
    description:
      "Suntheanine — the patented pure L-isomer used in the majority of clinical trials on theanine. Pairs particularly well with caffeine, attenuating the jittery edge while preserving the focus benefits.",
    dosage: "200mg per capsule",
    formRationale:
      "Suntheanine is the patented pure L-isomer form, which research has used in the majority of clinical trials. Generic theanine is often a mix of L- and D- isomers, with only the L- form active.",
    citations: ["theanine-caffeine", "theanine-anxiety"],
    suggestedUse:
      "One capsule with morning coffee, or 1–2 capsules during high-stress periods.",
    batchNumber: "LT-2026-03-A",
    testingLab: "Alkemist Labs",
    servings: 60,
  },
];

export const featuredProductSlugs = [
  "vitamin-d3-k2",
  "magnesium-glycinate",
  "omega-3",
  "creatine-monohydrate",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
