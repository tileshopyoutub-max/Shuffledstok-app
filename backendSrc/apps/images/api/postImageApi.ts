import type { Env } from "../../..";

export async function PostImageApi (request: Request, env: Env) {
  try {
    // Получаем FormData
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) return new Response("No file uploaded", { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const key = file.name // или сгенерировать уникальное имя

    // Сохраняем файл в R2
    await env.PUBLIC_WATERMARKED_BUCKET.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    })

    await env.PRIVATE_BUCKET.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    })

    return new Response(JSON.stringify({ success: true, key }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}