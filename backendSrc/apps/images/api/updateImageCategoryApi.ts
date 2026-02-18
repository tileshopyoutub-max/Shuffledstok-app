import type { Env } from "../../..";

export async function updateImageCategoryApi(request: Request, env: Env) {
  try {
    const { id, categoryId } = (await request.json()) as {
      id: number;
      categoryId: number | null;
    };

    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), {
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

    await env.DB.prepare(`DELETE FROM image_categories WHERE image_id = ?`)
      .bind(id)
      .run();

    if (categoryId !== null && categoryId !== undefined) {
      const cat = await env.DB.prepare(`SELECT id FROM categories WHERE id = ?`)
        .bind(categoryId)
        .first<{ id: number }>();

      if (!cat) {
        return new Response(JSON.stringify({ error: "Category not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      await env.DB.prepare(
        `INSERT INTO image_categories (image_id, category_id) VALUES (?, ?)`
      )
        .bind(id, categoryId)
        .run();
    }

    return new Response(
      JSON.stringify({ success: true, id, categoryId: categoryId ?? null }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
