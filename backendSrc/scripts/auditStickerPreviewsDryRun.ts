/**
 * Dry-run audit: sticker public previews vs private originals in R2.
 * READ-ONLY — no writes to D1 or R2.
 *
 *   npm run audit:sticker-previews:remote
 *   npx tsx backendSrc/scripts/auditStickerPreviewsDryRun.ts --remote --confirm-remote
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const DB_NAME = "shuffledstok-db";
const PUBLIC_BUCKET = "previews";
const PRIVATE_BUCKET = "customer-data";

type D1Mode = "local" | "remote";

type StickerRow = {
  id: number;
  key: string;
  title: string | null;
  has_watermark: number;
  slug: string | null;
  primary_category: string | null;
  categories: string | null;
};

type ObjectProbe = {
  exists: boolean;
  sizeBytes: number | null;
  format: string;
  contentTypeNote: string;
};

type AuditRow = {
  id: number;
  slug: string;
  publicKey: string;
  privateKey: string;
  publicProbe: ObjectProbe;
  privateProbe: ObjectProbe;
  action: "can_backfill" | "missing_private" | "skip";
  skipReason: string;
};

function parseArgs(argv: string[]): { mode: D1Mode; confirmRemote: boolean } {
  const hasLocal = argv.includes("--local");
  const hasRemote = argv.includes("--remote");
  const confirmRemote = argv.includes("--confirm-remote");

  if (hasLocal && hasRemote) {
    throw new Error("Use only one mode flag: --local or --remote.");
  }
  if (!hasLocal && !hasRemote) {
    throw new Error("Missing mode: --local or --remote.");
  }

  const mode: D1Mode = hasRemote ? "remote" : "local";
  if (mode === "remote" && !confirmRemote) {
    throw new Error(
      "Remote audit requires --confirm-remote (reads production D1 + R2)."
    );
  }

  return { mode, confirmRemote };
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
  if (header.length >= 4 && header.subarray(0, 4).toString("ascii") === "GIF8") {
    return "GIF";
  }
  return header.length >= 4
    ? `unknown(${header.subarray(0, 4).toString("hex")})`
    : "unknown";
}

function probeR2Object(
  mode: D1Mode,
  bucket: string,
  key: string
): ObjectProbe {
  const r2Flag = wranglerR2Flag(mode);
  const tmp = path.join(
    os.tmpdir(),
    `sticker-audit-${process.pid}-${Math.random().toString(36).slice(2)}.bin`
  );

  try {
    execSync(
      `npx wrangler r2 object get ${bucket}/${key} ${r2Flag} --file ${JSON.stringify(tmp)}`,
      { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 }
    );

    const stat = fs.statSync(tmp);
    const fd = fs.openSync(tmp, "r");
    const header = Buffer.alloc(16);
    fs.readSync(fd, header, 0, 16, 0);
    fs.closeSync(fd);

    const format = sniffFormat(header);
    return {
      exists: true,
      sizeBytes: stat.size,
      format,
      contentTypeNote: `inferred/${format.toLowerCase()}`,
    };
  } catch {
    return {
      exists: false,
      sizeBytes: null,
      format: "n/a",
      contentTypeNote: "missing",
    };
  } finally {
    try {
      fs.unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

function loadStickers(mode: D1Mode): StickerRow[] {
  const sql =
    "SELECT i.id, i.key, i.title, i.has_watermark, pl.slug AS slug, pl.primary_category, GROUP_CONCAT(DISTINCT c.name) AS categories FROM images i LEFT JOIN public_listings pl ON pl.entity_type = 'image' AND pl.entity_id = i.id LEFT JOIN image_categories ic ON i.id = ic.image_id LEFT JOIN categories c ON c.id = ic.category_id WHERE pl.primary_category = 'stickers' OR EXISTS (SELECT 1 FROM image_categories ic2 JOIN categories c2 ON c2.id = ic2.category_id WHERE ic2.image_id = i.id AND LOWER(c2.name) = 'stickers') GROUP BY i.id ORDER BY i.id ASC";
  return d1Json<StickerRow>(mode, sql);
}

function decideAction(
  publicProbe: ObjectProbe,
  privateProbe: ObjectProbe
): { action: AuditRow["action"]; skipReason: string } {
  if (!privateProbe.exists) {
    return {
      action: "missing_private",
      skipReason: "private object not in R2",
    };
  }

  const privateOk =
    privateProbe.format === "PNG" || privateProbe.format === "WEBP";

  if (!privateOk) {
    return {
      action: "skip",
      skipReason: `private is ${privateProbe.format}, not PNG/WebP source`,
    };
  }

  if (publicProbe.exists && publicProbe.format === "PNG") {
    return {
      action: "skip",
      skipReason: "public preview already PNG",
    };
  }

  if (!publicProbe.exists) {
    return {
      action: "can_backfill",
      skipReason: "public missing; can generate from private",
    };
  }

  if (publicProbe.format === "JPEG") {
    return {
      action: "can_backfill",
      skipReason: "public JPEG (likely baked black); private PNG available",
    };
  }

  return {
    action: "can_backfill",
    skipReason: `public ${publicProbe.format}; regenerate PNG from private`,
  };
}

function formatBytes(n: number | null): string {
  if (n === null) return "-";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function printTable(rows: AuditRow[]): void {
  const cols = [
    ["id", 5],
    ["slug", 28],
    ["publicKey", 36],
    ["pubFmt", 6],
    ["privFmt", 7],
    ["action", 16],
  ] as const;

  const header = cols.map(([h, w]) => h.padEnd(w)).join(" ");
  console.log(header);
  console.log("-".repeat(header.length));

  for (const r of rows) {
    const slug = (r.slug || "(no slug)").slice(0, 28).padEnd(28);
    const pubKey = r.publicKey.slice(0, 36).padEnd(36);
    console.log(
      [
        String(r.id).padEnd(5),
        slug,
        pubKey,
        r.publicProbe.format.padEnd(6),
        r.privateProbe.format.padEnd(7),
        r.action.padEnd(16),
      ].join(" ")
    );
  }
}

function main(): void {
  const { mode } = parseArgs(process.argv.slice(2));

  console.log("\n========================================");
  console.log("STICKER PREVIEW AUDIT (DRY-RUN, READ-ONLY)");
  console.log(`Mode: ${mode.toUpperCase()}`);
  console.log(`D1: ${DB_NAME} | public: ${PUBLIC_BUCKET} | private: ${PRIVATE_BUCKET}`);
  console.log("No writes to D1 or R2.");
  console.log("========================================\n");

  const stickers = loadStickers(mode);
  console.log(`Found ${stickers.length} sticker image(s) in D1.\n`);

  const auditRows: AuditRow[] = [];

  for (let i = 0; i < stickers.length; i++) {
    const row = stickers[i]!;
    const publicKey = row.key;
    const privateKey = getPrivateKey(publicKey);

    process.stdout.write(
      `[${i + 1}/${stickers.length}] id=${row.id} probing R2...\r`
    );

    const publicProbe = probeR2Object(mode, PUBLIC_BUCKET, publicKey);
    const privateProbe = probeR2Object(mode, PRIVATE_BUCKET, privateKey);
    const { action, skipReason } = decideAction(publicProbe, privateProbe);

    auditRows.push({
      id: row.id,
      slug: row.slug || "",
      publicKey,
      privateKey,
      publicProbe,
      privateProbe,
      action,
      skipReason,
    });
  }

  process.stdout.write("\n");

  for (const r of auditRows) {
    console.log(
      JSON.stringify({
        imageId: r.id,
        slug: r.slug || null,
        publicKey: r.publicKey,
        privateKey: r.privateKey,
        publicPreview: {
          exists: r.publicProbe.exists,
          format: r.publicProbe.format,
          contentType: r.publicProbe.contentTypeNote,
          sizeBytes: r.publicProbe.sizeBytes,
        },
        privateOriginal: {
          exists: r.privateProbe.exists,
          format: r.privateProbe.format,
          contentType: r.privateProbe.contentTypeNote,
          sizeBytes: r.privateProbe.sizeBytes,
          sizeHuman: formatBytes(r.privateProbe.sizeBytes),
        },
        action: r.action,
        note: r.skipReason,
      })
    );
  }

  console.log("\n--- Summary table ---\n");
  printTable(auditRows);

  const canBackfill = auditRows.filter((r) => r.action === "can_backfill");
  const missingPrivate = auditRows.filter(
    (r) => r.action === "missing_private"
  );
  const skip = auditRows.filter((r) => r.action === "skip");

  console.log("\n--- Totals ---");
  console.log(`total stickers:        ${auditRows.length}`);
  console.log(`can_backfill:          ${canBackfill.length}`);
  console.log(`missing_private:       ${missingPrivate.length}`);
  console.log(`skip:                  ${skip.length}`);

  const pubJpeg = auditRows.filter((r) => r.publicProbe.format === "JPEG");
  const pubPng = auditRows.filter((r) => r.publicProbe.format === "PNG");
  console.log(`public JPEG:           ${pubJpeg.length}`);
  console.log(`public PNG:            ${pubPng.length}`);

  console.log("\n--- Risks (for future real backfill) ---");
  console.log(
    "- Overwrites public R2 object at same key; CDN/browser cache may lag."
  );
  console.log(
    "- DB images.key unchanged only if same key + PNG bytes replaced."
  );
  console.log(
    "- Trim/resize not in this audit; large artboards stay small in grid until trim phase."
  );
  console.log(
    "- wm_* public keys: private strip still applies; verify watermark assets separately."
  );
  console.log(
    "- Remote R2 GET downloads full object per row (read cost + time)."
  );
  console.log("");
}

main();
