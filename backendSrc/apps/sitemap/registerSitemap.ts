import type { Env } from "../..";
import type { RouterType } from "../../router";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function resolveSiteOrigin(request: Request, env: Env): string {
  const configured = env.PUBLIC_SITE_ORIGIN?.trim().replace(/\/$/, "");
  if (configured) return configured;
  return new URL(request.url).origin;
}

export default function registerSitemapRoutes(router: RouterType) {
  router.get("/sitemap.xml", async (request: Request, env: Env) => {
    const origin = resolveSiteOrigin(request, env);

    const staticPaths = [
      "/",
      "/wallpapers",
      "/stickers",
      "/about",
      "/contact",
      "/privacy",
      "/terms",
      "/license",
      "/blog",
      "/blog/how-to-choose-wallpaper-for-iphone",
      "/blog/create-aesthetic-iphone-home-screen",
      "/blog/how-to-use-instagram-highlight-icons",
      "/blog/best-wallpapers-2026",
      "/blog/cute-wallpapers",
      "/blog/minimal-instagram-icons",
    ];

    const staticUrlEntries = staticPaths.map(
      (path) => `  <url>\n    <loc>${escapeXml(`${origin}${path}`)}</loc>\n  </url>`
    );

    const { results } = await env.DB.prepare(
      `
      SELECT primary_category, slug, updated_at
      FROM public_listings
      ORDER BY created_at DESC
      `
    ).all<{
      primary_category: string;
      slug: string;
      updated_at: string;
    }>();

    const listingUrlEntries = (results || []).map((row) => {
      const loc = `${origin}/${row.primary_category}/${row.slug}`;
      const lastmod = row.updated_at
        ? `\n    <lastmod>${escapeXml(row.updated_at.slice(0, 10))}</lastmod>`
        : "";
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrlEntries, ...listingUrlEntries].join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  });
}
