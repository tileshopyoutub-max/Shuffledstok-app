import type { Env } from "../../..";

export async function updateArchiveCategoriesApi(request: Request, env: Env) {
  try {
    const { id, categoryIds } = (await request.json()) as {
      id: number;
      categoryIds: number[];
    };

    if (!id || !Array.isArray(categoryIds)) {
      return new Response(
        JSON.stringify({ error: "id and categoryIds are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const archive = await env.DB.prepare(`SELECT id FROM archives WHERE id = ?`)
      .bind(id)
      .first();

    if (!archive) {
      return new Response(JSON.stringify({ error: "Archive not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await env.DB.prepare(`DELETE FROM archive_categories WHERE archive_id = ?`)
      .bind(id)
      .run();

    for (const categoryId of categoryIds) {
      await env.DB.prepare(
        `INSERT INTO archive_categories (archive_id, category_id)
         VALUES (?, ?)`
      )
        .bind(id, categoryId)
        .run();
    }

    return new Response(JSON.stringify({ success: true, id, categoryIds }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
