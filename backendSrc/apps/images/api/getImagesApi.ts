import type { Env } from "../../..";

export async function GetImagesApi(_: Request, env: Env) {
  try {
    const { results } = await env.DB.prepare(`
      SELECT
        id,
        key,
        title,
        description,
        tags,
        has_watermark,
        created_at
      FROM images
      ORDER BY created_at DESC
      LIMIT 100
    `).all();

    const images = results.map((img: any) => ({
      ...img,
      tags: img.tags ? img.tags.split(',') : [],
      url: `https://shuffledstok-app.tileshopyoutub.workers.dev/image/${img.key}`,
    }));

    return new Response(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
