import type { Env } from '../../..'
import { normalizeText } from '../normalizeText'

export async function PostImageApi(request: Request, env: Env) {
  try {
    const formData = await request.formData()

    const originalFile = formData.get('file') as File | null
    const watermarkedFile = formData.get('watermarkFile') as File | null
    const compressorFile = formData.get('compressorFile') as File | null

    const title = normalizeText(formData.get('title'))
    const description = normalizeText(formData.get('description'))

    const tagsInput = formData.get('tags') as string
    const selectedTagIds: number[] = tagsInput ? JSON.parse(tagsInput) : []

    const categoriesInput = formData.get('categories') as string
    const selectedCategoryIds: number[] = categoriesInput ? JSON.parse(categoriesInput) : []

    const downloadFreeInput = formData.get('downloadFree') as string | null
    const downloadFree = downloadFreeInput === 'true' ? 1 : 0

    if (!originalFile) {
      return new Response('No file uploaded', { status: 400 })
    }

    // Генерируем безопасный key
    const fileExt = originalFile.name.split('.').pop()
    const key = crypto.randomUUID() + '.' + fileExt

    // ---------- R2 ----------
    const originalBuffer = await originalFile.arrayBuffer()

    await env.PRIVATE_BUCKET.put(key, originalBuffer, {
      httpMetadata: { contentType: originalFile.type },
    })

    let publicKey = key

    if (watermarkedFile) {
      const watermarkedBuffer = await watermarkedFile.arrayBuffer()
      publicKey = `wm_${key}`
      await env.PUBLIC_WATERMARKED_BUCKET.put(publicKey, watermarkedBuffer, {
        httpMetadata: { contentType: watermarkedFile.type },
      })
    } else if (compressorFile) {
      const compressorBuffer = await compressorFile.arrayBuffer()
      publicKey = `compressed_${key}`
      await env.PUBLIC_WATERMARKED_BUCKET.put(publicKey, compressorBuffer, {
        httpMetadata: { contentType: compressorFile.type },
      })
    }

    // ---------- D1 ----------
    const result = await env.DB.prepare(
      `
      INSERT INTO images (key, title, description, has_watermark, download_free, featured)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
    )
      .bind(publicKey, title, description, watermarkedFile ? 1 : 0, downloadFree, 0)
      .run()

    const imageId = result.meta.last_row_id

    if (selectedTagIds.length > 0) {
      for (const tagId of selectedTagIds) {
        await env.DB.prepare(`INSERT INTO image_tags (image_id, tag_id) VALUES (?, ?)`).bind(imageId, tagId).run()

        await env.DB.prepare(`UPDATE tags SET usage_count = usage_count + 1 WHERE id = ?`).bind(tagId).run()
      }
    }

    if (selectedCategoryIds.length > 0) {
      for (const categoryId of selectedCategoryIds) {
        await env.DB.prepare(`INSERT INTO image_categories (image_id, category_id) VALUES (?, ?)`)
          .bind(imageId, categoryId)
          .run()

        await env.DB.prepare(`UPDATE categories SET usage_count = usage_count + 1 WHERE id = ?`).bind(categoryId).run()
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        key: publicKey,
        id: imageId,
        featured: 0,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
