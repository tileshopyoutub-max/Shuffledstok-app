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

export default function registerSitemapRoutes(router: RouterType) {
  router.get("/sitemap.xml", async (request: Request, env: Env) => {
    const origin = new URL(request.url).origin;

    const staticPaths = [
      "/",
      "/wallpapers",
      "/icons",
      "/stickers",
      "/blog",
      "/blog/how-to-choose-wallpaper-for-iphone",
      "/blog/create-aesthetic-iphone-home-screen",
      "/blog/how-to-use-instagram-highlight-icons",
      "/blog/best-wallpapers-2026",
      "/blog/cute-wallpapers",
      "/blog/minimal-instagram-icons",
    ];

    const staticUrls = staticPaths.map((path) => `${origin}${path}`);

    const { results } = await env.DB.prepare(
      "SELECT id FROM images ORDER BY created_at DESC"
    ).all<{ id: number }>();

    const assetUrls = (results || []).map((row) => `${origin}/download/${row.id}`);
    const allUrls = [...staticUrls, ...assetUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  });
}
