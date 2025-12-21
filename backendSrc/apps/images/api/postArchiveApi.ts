import type { Env } from '../../..'

interface ArchiveImage {
  id: number
  key: string
  archiveId: number
  relatedPhotos: ArchiveImage[]
}

export async function postArchiveApi(request: Request, env: Env) {
  try {
    const formData = await request.formData()

    const archiveFile = formData.get('archive') as File | null
    if (!archiveFile) {
      return new Response(
        JSON.stringify({ error: 'Archive file is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const title = (formData.get('title') as string) || ''
    const description = (formData.get('description') as string) || ''
    const downloadFreeInput = formData.get('downloadFree') as string | null
    const downloadFree = downloadFreeInput === 'true' ? 1 : 0

    const tagsInput = formData.get('tags') as string
    const selectedTagIds: number[] = tagsInput ? JSON.parse(tagsInput) : []

    const categoriesInput = formData.get('categories') as string
    const selectedCategoryIds: number[] = categoriesInput ? JSON.parse(categoriesInput) : []

    const archiveExt = archiveFile.name.split('.').pop()
    const archiveKey = crypto.randomUUID() + '.' + archiveExt
    const archiveBuffer = await archiveFile.arrayBuffer()

    await env.PRIVATE_BUCKET.put(archiveKey, archiveBuffer, {
      httpMetadata: { contentType: archiveFile.type }
    })

    const archiveResult = await env.DB.prepare(`
      INSERT INTO archives (key, title, description, download_free)
      VALUES (?, ?, ?, ?)
    `).bind(archiveKey, title, description, downloadFree).run()

    const archiveId = archiveResult.meta.last_row_id

    const archiveImagesFiles = formData.getAll('archiveImages') as File[]
    const savedImages: ArchiveImage[] = []

    for (const img of archiveImagesFiles) {
      const ext = img.name.split('.').pop()
      const key = crypto.randomUUID() + '.' + ext
      const buffer = await img.arrayBuffer()

      await env.PUBLIC_WATERMARKED_BUCKET.put(key, buffer, {
        httpMetadata: { contentType: img.type }
      })

      const imgResult = await env.DB.prepare(`
        INSERT INTO archive_images (archive_id, key)
        VALUES (?, ?)
      `).bind(archiveId, key).run()

      savedImages.push({
        id: imgResult.meta.last_row_id,
        key,
        archiveId,
        relatedPhotos: []
      })
    }

    savedImages.forEach(img => {
      img.relatedPhotos = savedImages.filter(i => i.id !== img.id)
    })

    if (selectedTagIds.length > 0) {
      for (const tagId of selectedTagIds) {
        await env.DB.prepare(`INSERT INTO archive_tags (archive_id, tag_id) VALUES (?, ?)`)
          .bind(archiveId, tagId).run()
        await env.DB.prepare(`UPDATE tags SET usage_count = usage_count + 1 WHERE id = ?`)
          .bind(tagId).run()
      }
    }

    if (selectedCategoryIds.length > 0) {
      for (const categoryId of selectedCategoryIds) {
        await env.DB.prepare(`INSERT INTO archive_categories (archive_id, category_id) VALUES (?, ?)`)
          .bind(archiveId, categoryId).run()
        await env.DB.prepare(`UPDATE categories SET usage_count = usage_count + 1 WHERE id = ?`)
          .bind(categoryId).run()
      }
    }

    return new Response(JSON.stringify({
      success: true,
      archive: {
        id: archiveId,
        key: archiveKey,
        images: savedImages
      }
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('postArchiveApi error:', err)
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}