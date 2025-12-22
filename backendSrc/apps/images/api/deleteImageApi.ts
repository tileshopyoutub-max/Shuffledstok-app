import type { Env } from "../../..";

export async function DeleteImageApi(request: Request, env: Env) {
    try {
        const url = new URL(request.url);
        const pathParts = url.pathname.split('/');
        const idString = pathParts[pathParts.length - 1];

        const id = parseInt(idString);

        if (!id) {
            return new Response(JSON.stringify({
                success: false, error: 'File ID is required'
            }), { status: 404, headers: { "Content-Type": "application/json" } })
        }

        await env.DB.prepare(`PRAGMA foreign_keys = ON`).run();

        const result = await env.DB.prepare(`
            SELECT key, has_watermark
            FROM images
            WHERE id = ?
            `).bind(id).first<{ key: string, has_watermark: number }>()

        if (!result) {
            return new Response(JSON.stringify({
                success: false, error: 'Image not found'
            }), { status: 404, headers: { "Content-Type": "application/json" } })
        }

        const { key } = result;

        //убираем приставку для приватного бакета
        function getOriginalKey(key: string) {
            return key
                .replace(/^compressed_/, '')
                .replace(/^wm_/, '');
        }

        const privateKey = getOriginalKey(key);
        const publicKey = key;

        await env.PRIVATE_BUCKET.delete(privateKey)
        await env.PUBLIC_WATERMARKED_BUCKET.delete(publicKey);

        //уменьшаем счетчик count у тега
        await env.DB.prepare(`
            UPDATE tags
            SET usage_count = usage_count - 1
            WHERE id IN (
                SELECT tag_id FROM image_tags WHERE image_id = ?
            )
        `).bind(id).run();

        //уменьшаем счетчик count у категорий
        await env.DB.prepare(`
        UPDATE categories
        SET usage_count = usage_count - 1
        WHERE id IN (
            SELECT category_id FROM image_categories WHERE image_id = ?
        )
        `).bind(id).run();

        await env.DB.prepare(`
            DELETE from images
            WHERE id = ?
        `).bind(id).run()

        return new Response(JSON.stringify({
            success: true, message: 'Image deleted successfully'
        }), { status: 200, headers: { "Content-Type": "application/json" } })

    } catch (err) {

        return new Response(JSON.stringify({
            success: false, error: 'Failed to delete image'
        }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
}