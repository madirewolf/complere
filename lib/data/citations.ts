export interface CitationData {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  url?: string;
  summary?: string;
}

export const citations: Record<string, CitationData> = {
  "ketamine-bahji-2020": {
    id: "ketamine-bahji-2020",
    authors: "Bahji A, Vazquez GH, Zarate CA",
    title:
      "Comparative efficacy of racemic ketamine and esketamine for depression: a systematic review and meta-analysis",
    journal: "Journal of Affective Disorders",
    year: 2020,
    url: "https://pubmed.ncbi.nlm.nih.gov/33161172/",
    summary:
      "Across 24 trials and ~1,877 patients, racemic ketamine produced response and remission rates roughly twice as high as esketamine, with fewer dropouts.",
  },
  "ketamine-yang-2015": {
    id: "ketamine-yang-2015",
    authors: "Yang C, Shirayama Y, Zhang JC, et al.",
    title:
      "R-ketamine: a rapid-onset and sustained antidepressant without psychotomimetic side effects",
    journal: "Translational Psychiatry",
    year: 2015,
    url: "https://pubmed.ncbi.nlm.nih.gov/26327690/",
    summary:
      "Preclinical work indicating R-ketamine has longer-lasting antidepressant effects than S-ketamine with fewer dissociative side effects.",
  },
  "protein-heavy-metals": {
    id: "protein-heavy-metals",
    authors: "Clean Label Project",
    title:
      "Protein Powder Study: heavy metal contamination across leading retail brands",
    journal: "Clean Label Project Report",
    year: 2024,
    url: "https://cleanlabelproject.org/",
    summary:
      "47% of protein powders sampled exceeded California Prop 65 thresholds for at least one toxic heavy metal.",
  },
  "supp-doping": {
    id: "supp-doping",
    authors: "Mathews NM",
    title:
      "Prohibited contaminants in dietary supplements",
    journal: "Frontiers in Sports and Active Living",
    year: 2023,
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=prohibited+contaminants+dietary+supplements",
    summary:
      "Between 14% and 50% of sport supplements tested positive for undisclosed prohibited substances.",
  },
  "supp-mislabel": {
    id: "supp-mislabel",
    authors: "Cohen PA, Avula B, Wang YH, Katragunta K, Khan I",
    title:
      "Quantity of compounds labeled versus detected in dietary supplements",
    journal: "JAMA Network Open",
    year: 2023,
    url: "https://pubmed.ncbi.nlm.nih.gov/37703017/",
    summary:
      "Roughly 1 in 3 sports supplements did not contain key ingredients listed on the label at any meaningful quantity.",
  },
  "supp-botanical": {
    id: "supp-botanical",
    authors: "Newmaster SG, Grguric M, Shanmughanandhan D, et al.",
    title:
      "DNA barcoding detects contamination and substitution in North American herbal products",
    journal: "BMC Medicine",
    year: 2013,
    url: "https://pubmed.ncbi.nlm.nih.gov/24120035/",
    summary:
      "59% of botanical supplements tested contained plant species not listed on the label.",
  },
  "supp-adulterated": {
    id: "supp-adulterated",
    authors: "Tucker J, Fischer T, Upjohn L, Mazzera D, Kumar M",
    title:
      "Unapproved pharmaceutical ingredients included in dietary supplements associated with U.S. FDA warnings",
    journal: "JAMA Network Open",
    year: 2018,
    url: "https://pubmed.ncbi.nlm.nih.gov/30646174/",
    summary:
      "FDA identified more than 700 dietary supplements adulterated with hidden pharmaceutical ingredients between 2007 and 2016.",
  },
  "supp-poison-control": {
    id: "supp-poison-control",
    authors: "Gummin DD, Mowry JB, et al.",
    title:
      "Annual Report of the American Association of Poison Control Centers",
    journal: "Clinical Toxicology",
    year: 2020,
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=poison+control+annual+report+supplements",
    summary:
      "U.S. poison control centers received approximately 70,000 calls related to dietary supplements in 2019 alone.",
  },
  "vit-d-meta-2024": {
    id: "vit-d-meta-2024",
    authors: "Cui A, Zhang T, Xiao P, et al.",
    title:
      "Global and regional prevalence of vitamin D deficiency in healthy adults: a systematic review and meta-analysis",
    journal: "Bratislava Medical Journal",
    year: 2024,
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=vitamin+D+deficiency+prevalence+meta-analysis+2024",
    summary:
      "Pooled prevalence of vitamin D deficiency in healthy adults estimated at 51.1% globally; adults aged 19–44 most affected.",
  },
  "d3-vs-d2": {
    id: "d3-vs-d2",
    authors: "Tripkovic L, Lambert H, Hart K, et al.",
    title:
      "Comparison of vitamin D2 and vitamin D3 supplementation in raising serum 25-hydroxyvitamin D status",
    journal: "American Journal of Clinical Nutrition",
    year: 2012,
    url: "https://pubmed.ncbi.nlm.nih.gov/22552031/",
    summary:
      "Vitamin D3 was significantly more efficacious than D2 at raising serum 25(OH)D concentrations.",
  },
  "k2-mk7": {
    id: "k2-mk7",
    authors: "Schurgers LJ, Teunissen KJ, Hamulyák K, et al.",
    title:
      "Vitamin K-containing dietary supplements: comparison of synthetic vitamin K1 and natto-derived menaquinone-7",
    journal: "Blood",
    year: 2007,
    url: "https://pubmed.ncbi.nlm.nih.gov/17158229/",
    summary:
      "MK-7 has substantially longer half-life than other K2 forms, supporting sustained extra-hepatic carboxylation of matrix Gla-protein.",
  },
  "mg-bioavailability": {
    id: "mg-bioavailability",
    authors: "Walker AF, Marakis G, Christie S, Byng M",
    title:
      "Mg citrate found more bioavailable than other Mg preparations in a randomised, double-blind study",
    journal: "Magnesium Research",
    year: 2003,
    url: "https://pubmed.ncbi.nlm.nih.gov/14596323/",
    summary:
      "Organic magnesium salts are absorbed substantially better than magnesium oxide in humans.",
  },
  "mg-sleep-rct": {
    id: "mg-sleep-rct",
    authors: "Abbasi B, Kimiagar M, Sadeghniiat K, et al.",
    title:
      "The effect of magnesium supplementation on primary insomnia in elderly: a double-blind placebo-controlled clinical trial",
    journal: "Journal of Research in Medical Sciences",
    year: 2012,
    url: "https://pubmed.ncbi.nlm.nih.gov/23853635/",
    summary:
      "Magnesium supplementation improved subjective measures of insomnia and serum melatonin in older adults.",
  },
  "mg-deficiency-prevalence": {
    id: "mg-deficiency-prevalence",
    authors: "DiNicolantonio JJ, O'Keefe JH, Wilson W",
    title:
      "Subclinical magnesium deficiency: a principal driver of cardiovascular disease and a public health crisis",
    journal: "Open Heart",
    year: 2018,
    url: "https://pubmed.ncbi.nlm.nih.gov/29387426/",
    summary:
      "A substantial fraction of Western populations have subclinical magnesium deficiency, with downstream effects on vitamin D metabolism.",
  },
  "mthfr-prevalence": {
    id: "mthfr-prevalence",
    authors: "Liew SC, Gupta ED",
    title:
      "Methylenetetrahydrofolate reductase (MTHFR) C677T polymorphism: epidemiology, metabolism and clinical implications",
    journal: "European Journal of Medical Genetics",
    year: 2015,
    url: "https://pubmed.ncbi.nlm.nih.gov/25449138/",
    summary:
      "The MTHFR C677T variant, which reduces enzymatic conversion of folic acid to active folate, occurs in roughly 30–40% of populations.",
  },
  "methylfolate-vs-folic": {
    id: "methylfolate-vs-folic",
    authors: "Pietrzik K, Bailey L, Shane B",
    title:
      "Folic acid and L-5-methyltetrahydrofolate: comparison of clinical pharmacokinetics and pharmacodynamics",
    journal: "Clinical Pharmacokinetics",
    year: 2010,
    url: "https://pubmed.ncbi.nlm.nih.gov/20608755/",
    summary:
      "L-5-MTHF bypasses the MTHFR conversion step required for folic acid, providing a directly usable form regardless of genetic variants.",
  },
  "omega3-tg-vs-ee": {
    id: "omega3-tg-vs-ee",
    authors: "Dyerberg J, Madsen P, Møller JM, Aardestrup I, Schmidt EB",
    title:
      "Bioavailability of marine n-3 fatty acid formulations",
    journal: "Prostaglandins, Leukotrienes and Essential Fatty Acids",
    year: 2010,
    url: "https://pubmed.ncbi.nlm.nih.gov/20638827/",
    summary:
      "Triglyceride-form fish oil was approximately 70% more bioavailable than the ethyl ester form in healthy adults.",
  },
  "omega3-cognition": {
    id: "omega3-cognition",
    authors: "Yurko-Mauro K, Alexander DD, Van Elswyk ME",
    title:
      "Docosahexaenoic acid and adult memory: a systematic review and meta-analysis",
    journal: "PLoS ONE",
    year: 2015,
    url: "https://pubmed.ncbi.nlm.nih.gov/25786262/",
    summary:
      "DHA supplementation improved episodic memory in adults with mild memory complaints.",
  },
  "omega3-oxidation-shelf": {
    id: "omega3-oxidation-shelf",
    authors: "Albert BB, Derraik JG, Cameron-Smith D, et al.",
    title:
      "Fish oil supplements in New Zealand are highly oxidised and do not meet label content of n-3 PUFA",
    journal: "Scientific Reports",
    year: 2015,
    url: "https://pubmed.ncbi.nlm.nih.gov/25622422/",
    summary:
      "Most retail fish oil products tested exceeded recommended oxidation thresholds and contained less EPA/DHA than labeled.",
  },
  "creatine-meta": {
    id: "creatine-meta",
    authors: "Kreider RB, Kalman DS, Antonio J, et al.",
    title:
      "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
    journal: "Journal of the International Society of Sports Nutrition",
    year: 2017,
    url: "https://pubmed.ncbi.nlm.nih.gov/28615996/",
    summary:
      "Creatine monohydrate is the most extensively studied form, with consistent benefits for high-intensity performance and recovery.",
  },
  "creatine-cognition": {
    id: "creatine-cognition",
    authors: "Avgerinos KI, Spyrou N, Bougioukas KI, Kapogiannis D",
    title:
      "Effects of creatine supplementation on cognitive function of healthy individuals: a systematic review of randomized controlled trials",
    journal: "Experimental Gerontology",
    year: 2018,
    url: "https://pubmed.ncbi.nlm.nih.gov/29704637/",
    summary:
      "Creatine supplementation improved measures of short-term memory and reasoning, particularly under conditions of stress or sleep deprivation.",
  },
  "theanine-caffeine": {
    id: "theanine-caffeine",
    authors: "Owen GN, Parnell H, De Bruin EA, Rycroft JA",
    title:
      "The combined effects of L-theanine and caffeine on cognitive performance and mood",
    journal: "Nutritional Neuroscience",
    year: 2008,
    url: "https://pubmed.ncbi.nlm.nih.gov/18681988/",
    summary:
      "L-theanine combined with caffeine improved sustained attention and reduced subjective tiredness compared to caffeine alone.",
  },
  "theanine-anxiety": {
    id: "theanine-anxiety",
    authors: "Hidese S, Ogawa S, Ota M, et al.",
    title:
      "Effects of L-theanine administration on stress-related symptoms and cognitive functions in healthy adults",
    journal: "Nutrients",
    year: 2019,
    url: "https://pubmed.ncbi.nlm.nih.gov/31623400/",
    summary:
      "Four-week L-theanine administration was associated with reduced stress-related symptoms and improved cognitive performance.",
  },
};
