import type { Env } from "../../..";

export async function downloadImageApi(request: Request, env: Env) {
  const key = request.url.split("/image/")[1]?.replace("/download", "")
  if (!key) return new Response("Missing key", { status: 400 })

  const object = await env.PUBLIC_WATERMARKED_BUCKET.get(key)
  if (!object) return new Response("Not found", { status: 404 })

  return new Response(object.body as unknown as ReadableStream, {
    headers: {
      "Content-Type":
        object.httpMetadata?.contentType ?? "application/octet-stream",

      "Content-Disposition": `attachment; filename="${key}"`,
    },
  })
}
