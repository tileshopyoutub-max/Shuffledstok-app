import type { Env } from '../../..'

export async function deleteArchiveApi(request: Request, env: Env) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id || isNaN(Number(id))) {
      return new Response(
        JSON.stringify({ error: 'Valid archive ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const archiveId = Number(id);

    const archive = await env.DB.prepare(
      'SELECT key FROM archives WHERE id = ?'
    ).bind(archiveId).first<{ key: string }>();

    if (!archive) {
      return new Response(
        JSON.stringify({ error: 'Archive not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const images = await env.DB.prepare(
      'SELECT key FROM archive_images WHERE archive_id = ?'
    ).bind(archiveId).all<{ key: string }>();

    for (const img of images.results) {
      await env.PUBLIC_WATERMARKED_BUCKET.delete(img.key);
    }

    await env.DB.prepare(`
      UPDATE tags
      SET usage_count = usage_count - 1
      WHERE id IN (
        SELECT tag_id FROM archive_tags WHERE archive_id = ?
      )
    `).bind(archiveId).run();

    await env.DB.prepare(`
      UPDATE categories
      SET usage_count = usage_count - 1
      WHERE id IN (
        SELECT category_id FROM archive_categories WHERE archive_id = ?
      )
    `).bind(archiveId).run();
    
    await env.DB.prepare('DELETE FROM archive_images WHERE archive_id = ?').bind(archiveId).run();
    await env.DB.prepare('DELETE FROM archive_tags WHERE archive_id = ?').bind(archiveId).run();
    await env.DB.prepare('DELETE FROM archive_categories WHERE archive_id = ?').bind(archiveId).run();
    await env.PRIVATE_BUCKET.delete(archive.key);
    await env.DB.prepare('DELETE FROM archives WHERE id = ?').bind(archiveId).run();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Archive deleted successfully' 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: (err as Error).message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}