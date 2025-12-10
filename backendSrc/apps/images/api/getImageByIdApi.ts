import type { Env } from "../../..";
import { addWatermark } from "../../../../src/shared/addWatermark";

export async function getImageByIdApi(request: Request, env: Env) {
    const key = request.url.split('/image/')[1]
    if (!key) return new Response("Missing key", { status: 400 })

    const object = await env.PUBLIC_WATERMARKED_BUCKET.get(key)
    if (!object) return new Response("Not found", { status: 404 })

    const arrayBuffer = await object.arrayBuffer()
    const watermarkedBuffer = await addWatermark(arrayBuffer)

    return new Response(new Uint8Array(watermarkedBuffer), {
      headers: { 'Content-Type': 'image/png' }
    })
  }