import type { Env } from '../../..'

export async function GetImagesApi(_: Request, env: Env) {
  try {
    const { results } = await env.DB.prepare(
      `
      SELECT
        i.id,
        i.key,
        i.title,
        i.description,
        i.has_watermark,
        i.created_at,
        GROUP_CONCAT(DISTINCT t.name) AS tags,
        GROUP_CONCAT(DISTINCT c.name) AS categories
      FROM images i
      LEFT JOIN image_tags it ON i.id = it.image_id
      LEFT JOIN tags t ON t.id = it.tag_id
      LEFT JOIN image_categories ic ON i.id = ic.image_id
      LEFT JOIN categories c ON c.id = ic.category_id
      GROUP BY i.id
      ORDER BY i.created_at DESC
      LIMIT 100
    `,
    ).all()
    console.log(results)
    const images = results.map((img: any) => ({
      ...img,
      tags: img.tags ? img.tags.split(',').map((tag: string) => tag.trim()) : [],
      categories: img.categories ? img.categories.split(',').map((c: string) => c.trim()) : [],
      url: `https://shuffledstok-app.tileshopyoutub.workers.dev/image/${img.key}`,
    }))

    return new Response(JSON.stringify(images), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
