import type { Env } from "../../.."
import type { ArchiveRow } from "../../../types"

export async function getArchivesApi(request: Request, env: Env) {
  try {
    const archivesResult = await env.DB.prepare(`
      SELECT 
        a.id,
        a.title,
        a.description,
        a.download_free,
        GROUP_CONCAT(DISTINCT t.name) AS tags,
        GROUP_CONCAT(DISTINCT c.name) AS categories
      FROM archives a
      LEFT JOIN archive_tags at ON a.id = at.archive_id
      LEFT JOIN tags t ON t.id = at.tag_id
      LEFT JOIN archive_categories ac ON a.id = ac.archive_id
      LEFT JOIN categories c ON c.id = ac.category_id
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `).all<ArchiveRow>()

    const archives = []

    for (const archive of archivesResult.results) {
      const imagesResult = await env.DB.prepare(`
        SELECT id, key, archive_id, sort_order
        FROM archive_images
        WHERE archive_id = ?
        ORDER BY sort_order
      `).bind(archive.id).all()

      const imageList = imagesResult.results.map((img: any) => ({
        id: img.id,
        key: img.key,
        url: `https://shuffledstok-app.tileshopyoutub.workers.dev/image/${img.key}`,
        archiveId: img.archive_id,
        sortOrder: img.sort_order,
        relatedPhotos: imagesResult.results
          .filter((other: any) => other.id !== img.id)
          .map((other: any) => ({
            id: other.id,
            key: other.key,
            url: `https://shuffledstok-app.tileshopyoutub.workers.dev/image/${other.key}`,
            archiveId: archive.id,
            sortOrder: other.sort_order
          }))
      }))

      archives.push({
        id: archive.id,
        title: archive.title,
        description: archive.description,
        download_free: archive.download_free,
        tags: archive.tags ? archive.tags.split(',') : [],
        categories: archive.categories ? archive.categories.split(',') : [],
        images: imageList
      })
    }

    return new Response(JSON.stringify({ archives }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('getArchivesApi error:', err)
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}