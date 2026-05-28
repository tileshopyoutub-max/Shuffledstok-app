import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITEMAP_SOURCE_URL =
  process.env.SITEMAP_SOURCE_URL ||
  "https://shuffledstok-app.tileshopyoutub.workers.dev/sitemap.xml";

const outputPath = resolve(process.cwd(), "public", "sitemap.xml");

const res = await fetch(SITEMAP_SOURCE_URL, {
  headers: { Accept: "application/xml,text/xml,*/*" },
});

if (!res.ok) {
  throw new Error(
    `Sitemap fetch failed (${res.status}): ${SITEMAP_SOURCE_URL}`
  );
}

const body = await res.text();
const contentType = res.headers.get("content-type") || "";

if (!body.trimStart().startsWith("<?xml")) {
  throw new Error(
    `Sitemap source did not return XML (content-type: ${contentType || "unknown"})`
  );
}

const legacyPatterns = ["/2025/", "/category/", "/listing/", "/home/"];
for (const pattern of legacyPatterns) {
  if (body.includes(pattern)) {
    throw new Error(`Sitemap contains legacy path pattern: ${pattern}`);
  }
}

writeFileSync(outputPath, body, "utf8");
console.log(`Wrote ${outputPath} (${body.length} bytes) from ${SITEMAP_SOURCE_URL}`);
