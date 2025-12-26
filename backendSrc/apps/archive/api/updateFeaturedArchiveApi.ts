import type { Env } from '../../..'

export async function updateFeaturedArchiveApi(request: Request, env: Env) {
  try {
    const { id, value } = await request.json() as { id: number; value: number }

    if (!id || value === undefined) {
      return new Response(JSON.stringify({ error: 'id and value are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await env.DB.prepare(`
      UPDATE archives SET featured = ? WHERE id = ?
    `).bind(value, id).run()

    return new Response(JSON.stringify({ success: true, id, featured: value }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}