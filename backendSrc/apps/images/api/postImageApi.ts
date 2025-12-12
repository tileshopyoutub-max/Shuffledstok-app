import type { Env } from "../../..";

export async function PostImageApi(request: Request, env: Env) {
  try {
    // Получаем FormData
    const formData = await request.formData()

    //получаем оригинальный файл
    const originalFile = formData.get("file") as File | null;
    //получаем файл с ватермаркой
    const watermarkedFile = formData.get("watermarkFile") as File | null;

    if (!originalFile) return new Response("No file uploaded", { status: 400 })

    const originalArrayBuffer = await originalFile.arrayBuffer()

    // Сохраняем файл в приватный R2
    console.log("PRIVATE_BUCKET: собираемся сохранять файл", originalFile.name, 'Размер: ', originalArrayBuffer.byteLength)
    await env.PRIVATE_BUCKET.put(originalFile.name, originalArrayBuffer, {
      httpMetadata: { contentType: "image/png" },
    })

    //Сохраняем файл в публичный
    if (watermarkedFile) {
      const watermarkedArrayBuffer = await watermarkedFile.arrayBuffer();
      console.log("PUBLICK: Сохраняем с вотермаркой", watermarkedFile.name, 'Размер: ', watermarkedArrayBuffer.byteLength);
      await env.PUBLIC_WATERMARKED_BUCKET.put(watermarkedFile.name, watermarkedArrayBuffer, {
        httpMetadata: { contentType: "image/png" },
      })
    } else {
      console.log("PUBLIC_WATERMARKED_BUCKET: водяной файл не предоставлен, сохраняем оригинал. Размер: ", originalArrayBuffer.byteLength);
      await env.PUBLIC_WATERMARKED_BUCKET.put(originalFile.name, originalArrayBuffer, {
        httpMetadata: { contentType: "image/png" },
      })
    }

    return new Response(JSON.stringify({ success: true, originalFile: originalFile.name, watermarkedFile: watermarkedFile?.name || null}), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}