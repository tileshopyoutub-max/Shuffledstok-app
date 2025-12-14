import type { Env } from "../../..";
import { normalizeText } from "../normalizeText";

export async function PostImageApi(request: Request, env: Env) {
  try {
    const formData = await request.formData();

    const originalFile = formData.get("file") as File | null;
    const watermarkedFile = formData.get("watermarkFile") as File | null;

    const title = normalizeText(formData.get("title"));
    const description = normalizeText(formData.get("description"));
    const tags = normalizeText(formData.get("tags"));

    if (!originalFile) {
      return new Response("No file uploaded", { status: 400 });
    }

    // Генерируем безопасный key
    const fileExt = originalFile.name.split('.').pop();
    const key = crypto.randomUUID() + '.' + fileExt;

    // ---------- R2 ----------
    const originalBuffer = await originalFile.arrayBuffer();

    await env.PRIVATE_BUCKET.put(key, originalBuffer, {
      httpMetadata: { contentType: originalFile.type },
    });

    let publicKey = key;

    if (watermarkedFile) {
      const watermarkedBuffer = await watermarkedFile.arrayBuffer();
      publicKey = `wm_${key}`;

      await env.PUBLIC_WATERMARKED_BUCKET.put(publicKey, watermarkedBuffer, {
        httpMetadata: { contentType: "image/png" },
      });
    } else {
      await env.PUBLIC_WATERMARKED_BUCKET.put(publicKey, originalBuffer, {
        httpMetadata: { contentType: originalFile.type },
      });
    }

    // ---------- D1 ----------
    await env.DB.prepare(
      `
      INSERT INTO images (key, title, description, tags, has_watermark)
      VALUES (?, ?, ?, ?, ?)
      `
    ).bind(
      publicKey,
      title,
      description,
      tags,
      watermarkedFile ? 1 : 0
    ).run();

    return new Response(
      JSON.stringify({
        success: true,
        key: publicKey,
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
