import type { Env } from "../../..";

export async function DeleteImageApi(request: Request, env: Env) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({
                success: false, error: 'File ID is required'
            }), { status: 404, headers: { "Content-Type": "application/json" } })
        }

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

        const { key, has_watermark } = result;

        const privateKey = key;
        const publicKey = has_watermark ? `wm_${key}` : `compressed_${key}`;

        await env.PRIVATE_BUCKET.delete(privateKey)
        await env.PUBLIC_WATERMARKED_BUCKET.delete(publicKey);

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
        }), { status: 500, headers: { "Content-Type": "application/json" }})
    }
}