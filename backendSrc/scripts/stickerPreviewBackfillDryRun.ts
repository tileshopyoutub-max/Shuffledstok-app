/**
 * Sticker preview backfill — dry-run and apply (R2 public previews only).
 *
 * Dry-run:
 *   npm run backfill:sticker-preview:dry-run -- --id 173
 *   npm run backfill:sticker-preview:dry-run -- --all
 *
 * Mass apply (29 stickers, remote R2 only):
 *   npm run backfill:sticker-preview:apply-all
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT_ROOT = path.join(ROOT, "backfill-out");
const DB_NAME = "shuffledstok-db";
const PUBLIC_BUCKET = "previews";
const PRIVATE_BUCKET = "customer-data";

type D1Mode = "local" | "remote";

type StickerMeta = {
  id: number;
  key: string;
  title: string | null;
  slug: string | null;
  primary_category: string | null;
};

type Bbox = { x: number; y: number; w: number; h: number };

type TrimResult = {
  buffer: Buffer;
  originalSize: { w: number; h: number };
  trimmedSize: { w: number; h: number };
  bbox: Bbox | null;
  paddingRemovedPx: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null;
  fullyTransparent: boolean;
};

type ProcessResult = {
  meta: StickerMeta;
  publicKey: string;
  privateKey: string;
  outDir: string;
  publicFormat: string;
  publicSizeBytes: number;
  privateFormat: string;
  privateSizeBytes: number;
  trim: TrimResult;
  previewCandidateBytes: number;
  manifestPath: string;
};

type ApplyResult = {
  imageId: number;
  slug: string | null;
  publicKey: string;
  status: "applied" | "skipped";
  reason?: string;
  backupPath?: string;
  backupFormat?: string;
  backupBytes?: number;
  appliedBytes?: number;
};

type ParsedArgs = {
  mode: D1Mode;
  ids: number[];
  slugs: string[];
  all: boolean;
  apply: boolean;
};

function parseArgs(argv: string[]): ParsedArgs {
  const hasLocal = argv.includes("--local");
  const hasRemote = argv.includes("--remote");
  const confirmRemote = argv.includes("--confirm-remote");
  const apply = argv.includes("--apply");
  const confirmApply = argv.includes("--confirm-apply");
  const all = argv.includes("--all");

  if (hasLocal && hasRemote) {
    throw new Error("Use only one mode flag: --local or --remote.");
  }
  if (!hasLocal && !hasRemote) {
    throw new Error("Missing mode: --local or --remote.");
  }

  const mode: D1Mode = hasRemote ? "remote" : "local";
  if (mode === "remote" && !confirmRemote) {
    throw new Error(
      "Remote requires --confirm-remote (reads/writes production D1 + R2)."
    );
  }
  if (apply && mode === "remote" && !confirmApply) {
    throw new Error(
      "Remote apply requires --confirm-apply (overwrites public R2 previews)."
    );
  }

  const ids: number[] = [];
  const slugs: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--id" && argv[i + 1]) {
      ids.push(Number(argv[++i]));
    } else if (arg === "--ids" && argv[i + 1]) {
      for (const part of argv[++i]!.split(",")) {
        const n = Number(part.trim());
        if (!Number.isNaN(n)) ids.push(n);
      }
    } else if (arg === "--slug" && argv[i + 1]) {
      slugs.push(argv[++i]!);
    }
  }

  if (!all && ids.length === 0 && slugs.length === 0) {
    throw new Error(
      "Specify targets: --all, --id <n>, --ids <n,n,...>, or --slug <slug>."
    );
  }

  return { mode, ids, slugs, all, apply };
}

function wranglerD1Flag(mode: D1Mode): string {
  return mode === "local" ? "--local" : "--remote";
}

function wranglerR2Flag(mode: D1Mode): string {
  return mode === "local" ? "--local" : "--remote";
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

function getPrivateKey(publicKey: string): string {
  return publicKey.replace(/^compressed_/, "").replace(/^wm_/, "");
}

function sniffFormat(header: Buffer): string {
  if (header.length >= 8 && header[0] === 0x89 && header[1] === 0x50) {
    return "PNG";
  }
  if (header.length >= 3 && header[0] === 0xff && header[1] === 0xd8) {
    return "JPEG";
  }
  if (
    header.length >= 12 &&
    header.subarray(0, 4).toString("ascii") === "RIFF" &&
    header.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "WEBP";
  }
  return header.length >= 4
    ? `unknown(${header.subarray(0, 4).toString("hex")})`
    : "unknown";
}

function mimeForFormat(format: string): string {
  if (format === "PNG") return "image/png";
  if (format === "JPEG") return "image/jpeg";
  if (format === "WEBP") return "image/webp";
  return "application/octet-stream";
}

function getR2Object(mode: D1Mode, bucket: string, key: string): Buffer | null {
  const r2Flag = wranglerR2Flag(mode);
  const tmp = path.join(
    OUT_ROOT,
    `.tmp-${process.pid}-${Math.random().toString(36).slice(2)}.bin`
  );

  fs.mkdirSync(OUT_ROOT, { recursive: true });

  try {
    execSync(
      `npx wrangler r2 object get ${bucket}/${key} ${r2Flag} --file ${JSON.stringify(tmp)}`,
      { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 }
    );
    return fs.readFileSync(tmp);
  } catch {
    return null;
  } finally {
    try {
      fs.unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

function putR2Object(
  mode: D1Mode,
  bucket: string,
  key: string,
  filePath: string,
  contentType: string
): void {
  const r2Flag = wranglerR2Flag(mode);
  execSync(
    `npx wrangler r2 object put ${bucket}/${key} ${r2Flag} --file ${JSON.stringify(filePath)} --content-type ${contentType}`,
    { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 }
  );
}

function loadAllStickers(mode: D1Mode): StickerMeta[] {
  const sql =
    "SELECT i.id, i.key, i.title, pl.slug, pl.primary_category FROM images i LEFT JOIN public_listings pl ON pl.entity_type = 'image' AND pl.entity_id = i.id WHERE pl.primary_category = 'stickers' OR EXISTS (SELECT 1 FROM image_categories ic JOIN categories c ON c.id = ic.category_id WHERE ic.image_id = i.id AND LOWER(c.name) = 'stickers') GROUP BY i.id ORDER BY i.id ASC";
  return d1Json<StickerMeta>(mode, sql);
}

function loadStickerById(mode: D1Mode, id: number): StickerMeta | null {
  const sql = `SELECT i.id, i.key, i.title, pl.slug, pl.primary_category FROM images i LEFT JOIN public_listings pl ON pl.entity_type = 'image' AND pl.entity_id = i.id WHERE i.id = ${id}`;
  const rows = d1Json<StickerMeta>(mode, sql);
  return rows[0] ?? null;
}

function loadStickerBySlug(mode: D1Mode, slug: string): StickerMeta | null {
  const escaped = slug.replace(/'/g, "''");
  const sql = `SELECT i.id, i.key, i.title, pl.slug, pl.primary_category FROM images i JOIN public_listings pl ON pl.entity_type = 'image' AND pl.entity_id = i.id WHERE pl.slug = '${escaped}'`;
  const rows = d1Json<StickerMeta>(mode, sql);
  return rows[0] ?? null;
}

function resolveTargets(
  mode: D1Mode,
  all: boolean,
  ids: number[],
  slugs: string[]
): StickerMeta[] {
  if (all) {
    return loadAllStickers(mode);
  }

  const byId = new Map<number, StickerMeta>();

  for (const id of ids) {
    const row = loadStickerById(mode, id);
    if (!row) {
      console.warn(`[warn] id=${id} not found in D1`);
      continue;
    }
    byId.set(row.id, row);
  }

  for (const slug of slugs) {
    const row = loadStickerBySlug(mode, slug);
    if (!row) {
      console.warn(`[warn] slug=${slug} not found in D1`);
      continue;
    }
    byId.set(row.id, row);
  }

  return [...byId.values()].sort((a, b) => a.id - b.id);
}

const ALPHA_THRESHOLD = 1;

async function trimTransparentPadding(source: Buffer): Promise<TrimResult> {
  const img = await loadImage(source);
  const w = img.width;
  const h = img.height;

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, w, h);

  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alpha = data[(y * w + x) * 4 + 3]!;
      if (alpha > ALPHA_THRESHOLD) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return {
      buffer: source,
      originalSize: { w, h },
      trimmedSize: { w, h },
      bbox: null,
      paddingRemovedPx: null,
      fullyTransparent: true,
    };
  }

  const tw = maxX - minX + 1;
  const th = maxY - minY + 1;
  const out = createCanvas(tw, th);
  const octx = out.getContext("2d");
  octx.drawImage(canvas, minX, minY, tw, th, 0, 0, tw, th);

  return {
    buffer: out.toBuffer("image/png"),
    originalSize: { w, h },
    trimmedSize: { w: tw, h: th },
    bbox: { x: minX, y: minY, w: tw, h: th },
    paddingRemovedPx: {
      left: minX,
      top: minY,
      right: w - maxX - 1,
      bottom: h - maxY - 1,
    },
    fullyTransparent: false,
  };
}

async function processOne(
  mode: D1Mode,
  meta: StickerMeta,
  apply: boolean
): Promise<ProcessResult | null> {
  const publicKey = meta.key;
  const privateKey = getPrivateKey(publicKey);
  const outDir = path.join(OUT_ROOT, String(meta.id));

  console.log(`\n--- id=${meta.id} slug=${meta.slug ?? "(none)"} ---`);
  console.log(`public:  ${PUBLIC_BUCKET}/${publicKey}`);
  console.log(`private: ${PRIVATE_BUCKET}/${privateKey}`);

  const publicBytes = getR2Object(mode, PUBLIC_BUCKET, publicKey);
  const privateBytes = getR2Object(mode, PRIVATE_BUCKET, privateKey);

  if (!privateBytes) {
    console.error(`[skip] private object missing: ${privateKey}`);
    return null;
  }

  const privateFormat = sniffFormat(privateBytes.subarray(0, 16));
  if (privateFormat !== "PNG" && privateFormat !== "WEBP") {
    console.error(
      `[skip] private format ${privateFormat} — expected PNG/WebP for trim`
    );
    return null;
  }

  let publicFormat = "n/a";
  let publicSizeBytes = 0;
  if (publicBytes) {
    publicFormat = sniffFormat(publicBytes.subarray(0, 16));
    publicSizeBytes = publicBytes.length;
  } else {
    console.warn(`[warn] public preview missing: ${publicKey}`);
  }

  if (apply && publicFormat === "PNG") {
    console.log(`[skip] public already PNG — not overwriting`);
    return null;
  }

  fs.mkdirSync(outDir, { recursive: true });

  const privatePath = path.join(outDir, "private-original.png");
  fs.writeFileSync(privatePath, privateBytes);

  const publicPath = path.join(outDir, "public-current.bin");
  if (publicBytes) {
    fs.writeFileSync(publicPath, publicBytes);
  } else {
    fs.writeFileSync(
      publicPath,
      Buffer.from("/* missing in R2 */\n", "utf-8")
    );
  }

  const trim = await trimTransparentPadding(privateBytes);
  const previewPath = path.join(outDir, "preview-candidate.png");
  fs.writeFileSync(previewPath, trim.buffer);

  const manifest = {
    mode: apply ? "apply" : "dry-run",
    apply,
    generatedAt: new Date().toISOString(),
    imageId: meta.id,
    slug: meta.slug,
    title: meta.title,
    primaryCategory: meta.primary_category,
    publicKey,
    privateKey,
    buckets: {
      public: PUBLIC_BUCKET,
      private: PRIVATE_BUCKET,
    },
    source: {
      private: {
        format: privateFormat,
        sizeBytes: privateBytes.length,
        ...trim.originalSize,
        savedAs: "private-original.png",
      },
      public: {
        exists: Boolean(publicBytes),
        format: publicFormat,
        sizeBytes: publicSizeBytes,
        savedAs: "public-current.bin",
      },
    },
    trim: {
      alphaThreshold: ALPHA_THRESHOLD,
      originalSize: trim.originalSize,
      trimmedSize: trim.trimmedSize,
      bbox: trim.bbox,
      paddingRemovedPx: trim.paddingRemovedPx,
      fullyTransparent: trim.fullyTransparent,
      areaReductionPct:
        trim.bbox && trim.originalSize.w > 0 && trim.originalSize.h > 0
          ? Math.round(
              (1 -
                (trim.trimmedSize.w * trim.trimmedSize.h) /
                  (trim.originalSize.w * trim.originalSize.h)) *
                1000
            ) / 10
          : null,
    },
    previewCandidate: {
      path: "preview-candidate.png",
      sizeBytes: trim.buffer.length,
      format: "PNG",
    },
    note: apply
      ? "Applied to R2 public preview only."
      : "DRY-RUN only — no R2 put, no D1 update.",
  };

  const manifestPath = path.join(outDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const areaReductionPct = manifest.trim.areaReductionPct as number | null;
  console.log(
    `trim: ${trim.originalSize.w}x${trim.originalSize.h} → ${trim.trimmedSize.w}x${trim.trimmedSize.h}` +
      (areaReductionPct != null ? ` (${areaReductionPct}% smaller canvas)` : "")
  );
  console.log(`wrote: ${outDir}`);

  return {
    meta,
    publicKey,
    privateKey,
    outDir,
    publicFormat,
    publicSizeBytes,
    privateFormat,
    privateSizeBytes: privateBytes.length,
    trim,
    previewCandidateBytes: trim.buffer.length,
    manifestPath,
  };
}

async function applyOne(
  mode: D1Mode,
  meta: StickerMeta
): Promise<ApplyResult> {
  const processed = await processOne(mode, meta, true);
  if (!processed) {
    const publicBytes = getR2Object(mode, PUBLIC_BUCKET, meta.key);
    const publicFormat = publicBytes
      ? sniffFormat(publicBytes.subarray(0, 16))
      : "n/a";
    const reason =
      publicFormat === "PNG"
        ? "public already PNG"
        : "prepare failed (missing private or unsupported format)";

    return {
      imageId: meta.id,
      slug: meta.slug,
      publicKey: meta.key,
      status: "skipped",
      reason,
    };
  }

  const publicBytes = fs.readFileSync(
    path.join(processed.outDir, "public-current.bin")
  );
  const publicFormat = sniffFormat(publicBytes.subarray(0, 16));
  const backupPath = path.join(processed.outDir, "public-backup-before-apply.bin");

  if (publicFormat !== "n/a" && publicBytes.length > 32) {
    fs.writeFileSync(backupPath, publicBytes);
    console.log(
      `backup: ${backupPath} (${publicFormat}, ${publicBytes.length} B)`
    );
  } else {
    console.warn(`[warn] no valid public bytes to backup for id=${meta.id}`);
  }

  const previewPath = path.join(processed.outDir, "preview-candidate.png");
  putR2Object(
    mode,
    PUBLIC_BUCKET,
    processed.publicKey,
    previewPath,
    "image/png"
  );
  console.log(
    `applied: ${PUBLIC_BUCKET}/${processed.publicKey} ← preview-candidate.png`
  );

  const applyLog = {
    appliedAt: new Date().toISOString(),
    imageId: meta.id,
    slug: meta.slug,
    publicKey: processed.publicKey,
    backupFile: "public-backup-before-apply.bin",
    backupFormat: publicFormat,
    backupBytes: publicBytes.length,
    backupContentType: mimeForFormat(publicFormat),
    appliedFile: "preview-candidate.png",
    appliedBytes: processed.previewCandidateBytes,
    appliedContentType: "image/png",
  };
  fs.writeFileSync(
    path.join(processed.outDir, "apply-log.json"),
    JSON.stringify(applyLog, null, 2)
  );

  return {
    imageId: meta.id,
    slug: meta.slug,
    publicKey: processed.publicKey,
    status: "applied",
    backupPath,
    backupFormat: publicFormat,
    backupBytes: publicBytes.length,
    appliedBytes: processed.previewCandidateBytes,
  };
}

function printDryRunSummary(results: ProcessResult[]): void {
  console.log("\n========================================");
  console.log("DRY-RUN SUMMARY (no apply)");
  console.log("========================================\n");

  for (const r of results) {
    const t = r.trim;
    console.log(`id=${r.meta.id} slug=${r.meta.slug ?? "(none)"}`);
    console.log(`  public:  ${r.publicFormat} ${r.publicSizeBytes} B`);
    console.log(
      `  private: ${r.privateFormat} ${r.privateSizeBytes} B (${t.originalSize.w}x${t.originalSize.h})`
    );
    console.log(
      `  candidate: PNG ${r.previewCandidateBytes} B (${t.trimmedSize.w}x${t.trimmedSize.h})`
    );
    console.log(`  output: ${r.outDir}`);
    console.log("");
  }
}

function printApplySummary(results: ApplyResult[]): void {
  const applied = results.filter((r) => r.status === "applied");
  const skipped = results.filter((r) => r.status === "skipped");

  console.log("\n========================================");
  console.log("APPLY SUMMARY");
  console.log("========================================");
  console.log(`applied: ${applied.length}`);
  console.log(`skipped: ${skipped.length}`);

  const summaryPath = path.join(OUT_ROOT, "apply-summary.json");
  fs.mkdirSync(OUT_ROOT, { recursive: true });
  fs.writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        completedAt: new Date().toISOString(),
        applied,
        skipped,
      },
      null,
      2
    )
  );
  console.log(`\nWrote ${summaryPath}`);
}

async function main(): Promise<void> {
  const { mode, ids, slugs, all, apply } = parseArgs(process.argv.slice(2));

  console.log("\n========================================");
  console.log(
    apply
      ? "STICKER PREVIEW BACKFILL — APPLY (R2 public only)"
      : "STICKER PREVIEW BACKFILL — DRY-RUN"
  );
  console.log(`Mode: ${mode.toUpperCase()}`);
  console.log(`Output: ${OUT_ROOT}/{id}/`);
  if (apply) {
    console.log("Writes: R2 previews bucket only");
    console.log("No D1 | No private bucket | No deploy");
  } else {
    console.log("No R2 put | No D1 writes");
  }
  console.log("========================================");

  const targets = resolveTargets(mode, all, ids, slugs);
  if (targets.length === 0) {
    throw new Error("No valid sticker targets resolved from D1.");
  }

  console.log(`\nTargets: ${targets.length} sticker(s)`);

  if (apply) {
    const applyResults: ApplyResult[] = [];
    for (let i = 0; i < targets.length; i++) {
      const meta = targets[i]!;
      console.log(`\n[${i + 1}/${targets.length}] apply id=${meta.id}`);
      try {
        const result = await applyOne(mode, meta);
        applyResults.push(result);
        if (result.status === "skipped") {
          if (result.reason === "public already PNG") {
            console.log(`[skip] id=${meta.id} — public already PNG`);
            continue;
          }
          console.error(
            `\n[STOP] Apply aborted at id=${meta.id}: ${result.reason ?? "unknown"}`
          );
          printApplySummary(applyResults);
          process.exit(1);
        }
      } catch (err) {
        console.error(`\n[STOP] Apply failed at id=${meta.id}:`);
        console.error(err instanceof Error ? err.message : err);
        if (err instanceof Error && err.stderr) {
          console.error(String((err as NodeJS.ErrnoException & { stderr?: Buffer }).stderr));
        }
        printApplySummary(applyResults);
        process.exit(1);
      }
    }
    printApplySummary(applyResults);
    return;
  }

  const results: ProcessResult[] = [];
  for (const meta of targets) {
    const result = await processOne(mode, meta, false);
    if (result) results.push(result);
  }
  printDryRunSummary(results);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
