import type { Env } from "../../..";
import { addWatermark } from "../../../../src/shared/addWatermark";

export async function PostImageApi (request: Request, env: Env) {
  try {
    // Получаем FormData
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) return new Response("No file uploaded", { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const key = file.name // или сгенерировать уникальное имя

    // Сохраняем файл в приватный R2
    console.log("PRIVATE_BUCKET: собираемся сохранять файл", key, 'Размер: ', arrayBuffer.byteLength)
    // await env.PRIVATE_BUCKET.put(key, arrayBuffer, {
    //   httpMetadata: { contentType: file.type },
    // })

    //Версия с watermarked в публичный R2
    const watermarkedBuffer = await addWatermark(arrayBuffer);
    console.log("PUBLIC_WATERMARKED_BUCKET: собираемся сохранять с вотермаркой", key, "размер:", watermarkedBuffer.byteLength);

    // await env.PUBLIC_WATERMARKED_BUCKET.put(key, watermarkedBuffer, {
    //   httpMetadata: { contentType: "image/png" },
    // })

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