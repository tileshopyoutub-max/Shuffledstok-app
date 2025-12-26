import type { Env } from "../../.."

export async function updateArchivePreviewApi(request: Request, env: Env) {
  try {
    if (request.method !== "PATCH") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[2];

    const body = await request.json();
    const previewImageId = body.preview_image_id;

    if (!previewImageId) {
      return new Response(JSON.stringify({ error: "preview_image_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await env.DB.prepare(`
      UPDATE archives
      SET preview_image_id = ?
      WHERE id = ?
    `).bind(previewImageId, Number(id)).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}