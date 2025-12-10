import type { Env } from "../../..";

export async function GetImagesApi(request: Request, env: Env) {
  try {
    const list = await env.PUBLIC_WATERMARKED_BUCKET.list({ limit: 100 })

    const images = list.objects.map(obj => ({
      key: obj.key,
      url: `https://shuffledstok-app.tileshopyoutub.workers.dev/image/${obj.key}`
    }))

    return new Response(JSON.stringify(images), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}