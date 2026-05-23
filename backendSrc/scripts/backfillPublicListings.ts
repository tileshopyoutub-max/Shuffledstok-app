/**
 * Backfill public_listings for images and archives.
 *
 * Local:  npm run backfill:listings:local
 * Remote: npm run backfill:listings:remote  (requires --confirm-remote)
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  resolvePrimaryCategory,
  untitledFallbackSlugBase,
  type EntityType,
} from "../shared/primaryCategory";
import { allocateUniqueSlug, buildBaseSlug } from "../shared/slug";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const DB_NAME = "shuffledstok-db";

type D1Mode = "local" | "remote";

type EntityRow = {
  id: number;
  title: string | null;
  categories: string | null;
};

type BackfillStats = {
  created: number;
  skipped: number;
  duplicateTitleGroups: number;
  suffixedSlugs: number;
  emptySlugPrevented: number;
  byEntity: { image: number; archive: number };
};

function parseArgs(argv: string[]): {
  mode: D1Mode;
  confirmRemote: boolean;
} {
  const hasLocal = argv.includes("--local");
  const hasRemote = argv.includes("--remote");
  const confirmRemote = argv.includes("--confirm-remote");

  if (hasLocal && hasRemote) {
    throw new Error("Use only one mode flag: --local or --remote.");
  }

  if (!hasLocal && !hasRemote) {
    throw new Error(
      "Missing D1 mode. Use --local or --remote (see npm run backfill:listings:local | backfill:listings:remote)."
    );
  }

  const mode: D1Mode = hasRemote ? "remote" : "local";

  if (mode === "remote" && !confirmRemote) {
    throw new Error(
      "Remote backfill blocked: pass --confirm-remote (npm run backfill:listings:remote does this for you)."
    );
  }

  return { mode, confirmRemote };
}

function wranglerD1Flag(mode: D1Mode): string {
  return mode === "local" ? "--local" : "--remote";
}

function logRunHeader(mode: D1Mode): void {
  const flag = wranglerD1Flag(mode);
  const label = mode === "local" ? "LOCAL" : "REMOTE (production D1)";

  console.log("\n========================================");
  console.log("PUBLIC LISTINGS BACKFILL");
  console.log(`Mode: ${label}`);
  console.log(`Wrangler flag: ${flag}`);
  console.log(`Database: ${DB_NAME}`);
  if (mode === "remote") {
    console.log("WARNING: writes go to remote/production D1.");
  }
  console.log("========================================\n");
}

function d1Json<T>(mode: D1Mode, command: string): T[] {
  const flag = wranglerD1Flag(mode);
  const output = execSync(
    `npx wrangler d1 execute ${DB_NAME} ${flag} --command ${JSON.stringify(command)} --json`,
    { cwd: ROOT, encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
  );

  const parsed = JSON.parse(output) as Array<{ results: T[] }>;
  return parsed[0]?.results ?? [];
}

function d1Exec(mode: D1Mode, command: string): void {
  const flag = wranglerD1Flag(mode);
  execSync(
    `npx wrangler d1 execute ${DB_NAME} ${flag} --command ${JSON.stringify(command)}`,
    { cwd: ROOT, stdio: "inherit" }
  );
}

function escapeSql(value: string): string {
  return value.replace(/'/g, "''");
}

function parseCategories(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

function listingExists(mode: D1Mode, entityType: EntityType, entityId: number): boolean {
  const rows = d1Json<{ id: number }>(
    mode,
    `SELECT id FROM public_listings WHERE entity_type = '${entityType}' AND entity_id = ${entityId} LIMIT 1`
  );
  return rows.length > 0;
}

function loadEntities(mode: D1Mode, entityType: EntityType): EntityRow[] {
  if (entityType === "image") {
    return d1Json<EntityRow>(
      mode,
      "SELECT i.id, i.title, GROUP_CONCAT(DISTINCT c.name) AS categories FROM images i LEFT JOIN image_categories ic ON i.id = ic.image_id LEFT JOIN categories c ON c.id = ic.category_id GROUP BY i.id ORDER BY i.created_at ASC, i.id ASC"
    );
  }

  return d1Json<EntityRow>(
    mode,
    "SELECT a.id, a.title, GROUP_CONCAT(DISTINCT c.name) AS categories FROM archives a LEFT JOIN archive_categories ac ON a.id = ac.archive_id LEFT JOIN categories c ON c.id = ac.category_id GROUP BY a.id ORDER BY a.created_at ASC, a.id ASC"
  );
}

function backfillEntityType(
  mode: D1Mode,
  entityType: EntityType,
  taken: Set<string>,
  titleCount: Map<string, number>,
  stats: BackfillStats
): void {
  const rows = loadEntities(mode, entityType);

  for (const row of rows) {
    if (listingExists(mode, entityType, row.id)) {
      stats.skipped += 1;
      continue;
    }

    const categoryNames = parseCategories(row.categories);
    const primaryCategory = resolvePrimaryCategory(categoryNames);
    const fallbackBase = untitledFallbackSlugBase(primaryCategory, entityType);
    const baseSlug = buildBaseSlug(row.title, fallbackBase);

    if (baseSlug === fallbackBase) {
      stats.emptySlugPrevented += 1;
    }

    const normalizedTitle = (row.title ?? "").trim().toLowerCase();
    if (normalizedTitle) {
      const count = (titleCount.get(normalizedTitle) ?? 0) + 1;
      titleCount.set(normalizedTitle, count);
      if (count === 2) stats.duplicateTitleGroups += 1;
    }

    const { slug, suffix } = allocateUniqueSlug(baseSlug, taken);
    if (suffix !== null) stats.suffixedSlugs += 1;

    d1Exec(
      mode,
      `INSERT INTO public_listings (slug, entity_type, entity_id, primary_category) VALUES ('${escapeSql(slug)}', '${entityType}', ${row.id}, '${primaryCategory}')`
    );

    stats.created += 1;
    stats.byEntity[entityType] += 1;
  }
}

function verify(mode: D1Mode): void {
  const images = d1Json<{ count: number }>(
    mode,
    "SELECT COUNT(*) AS count FROM images"
  )[0]?.count;
  const archives = d1Json<{ count: number }>(
    mode,
    "SELECT COUNT(*) AS count FROM archives"
  )[0]?.count;
  const listings = d1Json<{ count: number }>(
    mode,
    "SELECT COUNT(*) AS count FROM public_listings"
  )[0]?.count;
  const dupes = d1Json<{ slug: string; c: number }>(
    mode,
    "SELECT slug, COUNT(*) AS c FROM public_listings GROUP BY slug HAVING c > 1"
  );
  const orphansImages = d1Json<{ id: number }>(
    mode,
    "SELECT i.id FROM images i LEFT JOIN public_listings pl ON pl.entity_type = 'image' AND pl.entity_id = i.id WHERE pl.id IS NULL"
  );
  const orphansArchives = d1Json<{ id: number }>(
    mode,
    "SELECT a.id FROM archives a LEFT JOIN public_listings pl ON pl.entity_type = 'archive' AND pl.entity_id = a.id WHERE pl.id IS NULL"
  );

  console.log("\n=== Verification ===");
  console.log({ mode, images, archives, listings });
  console.log("duplicate slugs:", dupes.length);
  console.log("orphan images:", orphansImages.length);
  console.log("orphan archives:", orphansArchives.length);
}

function main(): void {
  const { mode } = parseArgs(process.argv.slice(2));
  logRunHeader(mode);

  const stats: BackfillStats = {
    created: 0,
    skipped: 0,
    duplicateTitleGroups: 0,
    suffixedSlugs: 0,
    emptySlugPrevented: 0,
    byEntity: { image: 0, archive: 0 },
  };

  const taken = new Set(
    d1Json<{ slug: string }>(mode, "SELECT slug FROM public_listings").map(
      (row) => row.slug
    )
  );
  const titleCount = new Map<string, number>();

  console.log("Backfilling images...");
  backfillEntityType(mode, "image", taken, titleCount, stats);

  console.log("Backfilling archives...");
  backfillEntityType(mode, "archive", taken, titleCount, stats);

  console.log("\n=== Backfill stats ===");
  console.log(JSON.stringify({ mode, ...stats }, null, 2));

  verify(mode);
  console.log(`\nDone (${mode} D1).\n`);
}

try {
  main();
} catch (err) {
  console.error("\nBackfill aborted:", (err as Error).message);
  process.exit(1);
}
