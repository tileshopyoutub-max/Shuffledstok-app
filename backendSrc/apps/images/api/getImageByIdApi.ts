import type { Env } from "../../..";

export async function getImageByIdApi(request: Request, env: Env) {
    const key = request.url.split('/image/')[1]
    if (!key) return new Response("Missing key", { status: 400 })

    const object = await env.PUBLIC_WATERMARKED_BUCKET.get(key)
    if (!object) return new Response("Not found", { status: 404 })

    const arrayBuffer = await object.arrayBuffer()
     const contentType = object.httpMetadata?.contentType || "application/octet-stream"

    return new Response(new Uint8Array(arrayBuffer), {
      headers: { 'Content-Type': contentType }
    })
  }