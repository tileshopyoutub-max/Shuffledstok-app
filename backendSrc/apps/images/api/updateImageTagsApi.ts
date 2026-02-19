import type { Env } from "../../..";

export async function updateImageTagsApi(request: Request, env: Env) {
  try {
    const { id, tags } = (await request.json()) as {
      id: number;
      tags: string[];
    };

    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(tags)) {
      return new Response(JSON.stringify({ error: "tags must be an array" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existing = await env.DB.prepare(`SELECT id FROM images WHERE id = ?`)
      .bind(id)
      .first<{ id: number }>();

    if (!existing) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const normalizedTags = tags
      .map((tag) => String(tag).trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    const uniqueTags = [...new Set(normalizedTags)];

    if (uniqueTags.length === 0) {
      return new Response(
        JSON.stringify({
          error: "at least one tag is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await env.DB.prepare(`DELETE FROM image_tags WHERE image_id = ?`)
      .bind(id)
      .run();

    for (const tagName of uniqueTags) {
      const tag = await env.DB.prepare(`SELECT id FROM tags WHERE name = ?`)
        .bind(tagName)
        .first<{ id: number }>();

      let tagId: number;

      if (!tag) {
        const result = await env.DB.prepare(
          `INSERT INTO tags (name) VALUES (?)`
        )
          .bind(tagName)
          .run();

        tagId = result.meta.last_row_id;
      } else {
        tagId = tag.id;
      }

      await env.DB.prepare(
        `INSERT INTO image_tags (image_id, tag_id) VALUES (?, ?)`
      )
        .bind(id, tagId)
        .run();
    }

    return new Response(
      JSON.stringify({ success: true, id, tags: uniqueTags }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
