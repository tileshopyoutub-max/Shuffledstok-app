import type { Env } from "../../..";

function getPrivateKey(publicKey: string): string {
  return publicKey.replace(/^compressed_/, "").replace(/^wm_/, "");
}

function isStickerAsset(
  primaryCategory: string | null | undefined,
  hasStickerCategory: number | boolean | undefined
): boolean {
  if (primaryCategory === "stickers") return true;
  return Boolean(hasStickerCategory);
}

async function findImageDownloadMeta(
  env: Env,
  publicKey: string
): Promise<{
  primary_category: string | null;
  has_sticker_category: number;
} | null> {
  const row = await env.DB.prepare(
    `
    SELECT
      pl.primary_category,
      EXISTS (
        SELECT 1
        FROM image_categories ic
        JOIN categories c ON c.id = ic.category_id
        WHERE ic.image_id = i.id
          AND LOWER(c.name) = 'stickers'
      ) AS has_sticker_category
    FROM images i
    LEFT JOIN public_listings pl
      ON pl.entity_type = 'image' AND pl.entity_id = i.id
    WHERE i.key = ?
    `
  )
    .bind(publicKey)
    .first<{ primary_category: string | null; has_sticker_category: number }>();

  return row ?? null;
}

function attachmentResponse(
  object: R2ObjectBody,
  filename: string
): Response {
  return new Response(object.body as unknown as ReadableStream, {
    headers: {
      "Content-Type":
        object.httpMetadata?.contentType ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

export async function downloadImageApi(request: Request, env: Env) {
  const pathname = new URL(request.url).pathname;
  const match = pathname.match(/^\/image\/(.+)\/download$/);
  const key = match?.[1];

  if (!key) return new Response("Missing key", { status: 400 });

  const meta = await findImageDownloadMeta(env, key);
  const serveFromPrivate =
    meta &&
    isStickerAsset(meta.primary_category, meta.has_sticker_category);

  if (serveFromPrivate) {
    const privateKey = getPrivateKey(key);
    const privateObject = await env.PRIVATE_BUCKET.get(privateKey);

    if (privateObject) {
      return attachmentResponse(privateObject, privateKey);
    }
  }

  const object = await env.PUBLIC_WATERMARKED_BUCKET.get(key);
  if (!object) return new Response("Not found", { status: 404 });

  return attachmentResponse(object, key);
}
