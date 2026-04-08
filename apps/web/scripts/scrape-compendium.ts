import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "src", "data");

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseField(lines: string[], label: string): string {
  const line = lines.find((l) => l.startsWith(label + ":"));
  return line ? line.substring(label.length + 1).trim() : "";
}

interface RawCard {
  id: string;
  text: string;
  links: { text: string; href: string }[];
}

// Extract raw text + links from all cards on page
const extractCards = `
(() => {
  const cards = document.querySelectorAll('.search-public-crearcloum');
  return Array.from(cards).map(card => ({
    id: card.id,
    text: card.innerText,
    links: Array.from(card.querySelectorAll('a')).map(a => ({
      text: (a.textContent || '').trim(),
      href: a.href
    }))
  }));
})()
`;

function parseIntervention(raw: RawCard) {
  const lines = raw.text.split("\n").filter((l) => l.trim());

  const name = lines[0] || "";
  const desc = lines.find((l) => l.length > 80 && !l.includes(":")) || "";
  const pop = parseField(lines, "Intended population");
  const effects = parseField(lines, "Key intervention effects");
  const location = parseField(lines, "Location");
  const years = parseField(lines, "Study years");
  const structural = parseField(lines, "Structural components");
  const ehe = parseField(lines, "EHE pillars");

  const efficacyLines = lines.filter(
    (l) =>
      (l.includes("EBI") || l.includes(" EI")) &&
      !l.startsWith("EHE") &&
      !l.includes(":")
  );

  const citation =
    lines.filter((l) => l.length > 50 && l.includes(".")).pop() || "";

  let yearRange = null;
  if (years) {
    const m = years.match(/(\d{4})\s*-\s*(\d{4})/);
    if (m) yearRange = { start: parseInt(m[1]), end: parseInt(m[2]) };
  }

  let studyLocation: string | null = null;
  if (location) {
    // US state abbreviation pattern or common US markers
    if (/\b[A-Z]{2}\b/.test(location) || /united states|US\b/i.test(location)) {
      studyLocation = "Domestic";
    } else {
      studyLocation = "International";
    }
  }

  let duration: string | null = null;
  const descLower = desc.toLowerCase();
  if (descLower.includes("single session") || descLower.includes("one session")) {
    duration = "Single-session";
  } else if (
    descLower.includes("multi") ||
    descLower.includes("sessions") ||
    descLower.includes("week")
  ) {
    duration = "Multi-session";
  }

  return {
    id: slugify(name),
    name,
    description: desc,
    populations: pop ? [pop] : [],
    keyEffects: effects
      ? effects.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    strategies: structural
      ? structural
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s && s !== "None")
      : [],
    efficacyRating: efficacyLines.map((l) => l.trim()).join("; "),
    ehePillars: ehe
      ? ehe.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    studyLocation,
    duration,
    yearRange,
    publications: raw.links
      .filter((l) => l.href && !l.href.includes("HIVCompendium"))
      .map((l) => ({
        title: l.text,
        url: l.href,
        citation: "",
      })),
    contactEmail: null,
  };
}

function parsePublication(raw: RawCard) {
  const lines = raw.text.split("\n").filter((l) => l.trim());

  const title = (lines[0] || "").trim();
  const pubType = parseField(lines, "Publication type");
  const pubDate = parseField(lines, "Publication date");
  const pop = parseField(lines, "Intended population");
  const outcomes = parseField(lines, "Key outcomes");
  const ehe = parseField(lines, "EHE pillars");

  const citation =
    lines.filter((l) => l.length > 50 && l.includes(".")).pop() || "";
  const am = citation.match(/^(.+?)\s*\(\d{4}\)/);
  const authors = am ? am[1].trim() : "";
  const ym = pubDate.match(/\d{4}/);
  const year = ym ? parseInt(ym[0]) : null;

  const linkObj: Record<string, string> = {};
  raw.links.forEach((l) => {
    if (l.href.includes("pubmed.ncbi")) linkObj.pubmed = l.href;
    else if (l.href.includes("ncbi.nlm.nih.gov/pmc")) linkObj.pmc = l.href;
    else if (l.href.includes("doi.org")) linkObj.doi = l.href;
    else if (l.href.includes("prospero")) linkObj.prospero = l.href;
    else if (l.text.includes("Journal") || l.text.includes("Article"))
      linkObj.doi = linkObj.doi || l.href;
    else if (l.text.includes("PubMed Central")) linkObj.pmc = l.href;
    else if (l.text.includes("PubMed")) linkObj.pubmed = l.href;
  });

  return {
    id: slugify(title).substring(0, 80),
    title,
    authors,
    publicationType: pubType,
    publicationYear: year,
    populations: pop
      ? pop.split(";").map((s) => s.trim()).filter(Boolean)
      : [],
    keyOutcomes: outcomes
      ? outcomes.split(";").map((s) => s.trim()).filter(Boolean)
      : [],
    ehePillars: ehe
      ? ehe.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    links: linkObj,
    citation,
  };
}

function deduplicateIds<T extends { id: string }>(items: T[]): T[] {
  const seen: Record<string, number> = {};
  return items.map((item) => {
    if (seen[item.id]) {
      seen[item.id]++;
      return { ...item, id: `${item.id}-${seen[item.id]}` };
    }
    seen[item.id] = 1;
    return item;
  });
}

function buildMetadata(interventions: any[], publications: any[]) {
  const allPops = new Set<string>();
  const allEffects = new Set<string>();
  const allOutcomes = new Set<string>();
  const allStrategies = new Set<string>();
  const allPubTypes = new Set<string>();

  interventions.forEach((i) => {
    i.populations.forEach((p: string) => allPops.add(p));
    i.keyEffects.forEach((e: string) => allEffects.add(e));
    i.strategies.forEach((s: string) => allStrategies.add(s));
  });

  publications.forEach((p) => {
    p.populations.forEach((pop: string) => allPops.add(pop));
    p.keyOutcomes.forEach((o: string) => allOutcomes.add(o));
    if (p.publicationType) allPubTypes.add(p.publicationType);
  });

  return {
    populations: [...allPops].sort(),
    effects: [...allEffects].sort(),
    outcomes: [...allOutcomes].sort(),
    strategies: [...allStrategies].sort(),
    publicationTypes: [...allPubTypes].sort(),
    ehePillars: ["Diagnose", "Treat", "Prevent", "Respond"],
    lastUpdated: new Date().toISOString().split("T")[0],
    treatmentCount: interventions.length,
    preventionCount: publications.length,
  };
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  try {
    // === Treatment Interventions ===
    console.log("Navigating to treatment compendium...");
    await page.goto("https://wwwn.cdc.gov/HIVCompendium/SearchInterventions", {
      waitUntil: "networkidle",
    });
    await page.waitForSelector(".search-public-crearcloum", { timeout: 30000 });
    console.log("Page loaded. Requesting all results...");

    await page.evaluate("ChangePageSize(0)");
    await page.waitForTimeout(5000);
    await page.waitForFunction(
      "document.querySelectorAll('.search-public-crearcloum').length > 100",
      { timeout: 30000 }
    );

    const rawInterventions: RawCard[] = await page.evaluate(extractCards);
    console.log(`Found ${rawInterventions.length} intervention cards`);
    const interventions = deduplicateIds(rawInterventions.map(parseIntervention));
    console.log(`Parsed ${interventions.length} interventions`);

    // === Prevention Publications ===
    console.log("\nNavigating to prevention publications...");
    await page.goto(
      "https://wwwn.cdc.gov/HIVCompendium/SearchPRSPublications",
      { waitUntil: "networkidle" }
    );
    await page.waitForSelector(".search-public-crearcloum", { timeout: 30000 });
    console.log("Page loaded. Requesting all results...");

    await page.evaluate("ChangePageSize(0)");
    await page.waitForTimeout(5000);
    await page.waitForFunction(
      "document.querySelectorAll('.search-public-crearcloum').length > 50",
      { timeout: 30000 }
    );

    const rawPublications: RawCard[] = await page.evaluate(extractCards);
    console.log(`Found ${rawPublications.length} publication cards`);
    const publications = deduplicateIds(rawPublications.map(parsePublication));
    console.log(`Parsed ${publications.length} publications`);

    // === Build metadata and write files ===
    const metadata = buildMetadata(interventions, publications);

    writeFileSync(
      join(DATA_DIR, "compendium-treatment.json"),
      JSON.stringify(interventions, null, 2)
    );
    writeFileSync(
      join(DATA_DIR, "compendium-prevention.json"),
      JSON.stringify(publications, null, 2)
    );
    writeFileSync(
      join(DATA_DIR, "compendium-metadata.json"),
      JSON.stringify(metadata, null, 2)
    );

    console.log("\n=== Summary ===");
    console.log(`Treatment interventions: ${interventions.length}`);
    console.log(`Prevention publications: ${publications.length}`);
    console.log(`Unique populations: ${metadata.populations.length}`);
    console.log(`Unique effects: ${metadata.effects.length}`);
    console.log(`Unique outcomes: ${metadata.outcomes.length}`);
    console.log(`Unique strategies: ${metadata.strategies.length}`);
    console.log(`Files written to: ${DATA_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Scraper failed:", err);
  process.exit(1);
});
