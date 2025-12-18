import { Env } from "../../..";

export async function DeleteTagApi(request: Request, env: Env) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({
                success: false, error: "Tag ID is required"
            }, { status: 400 });
        }

        const tag = await env.DB.prepare(
            `SELECT t.*, COUNT(it.image_id) as image_count
       FROM tags t
       LEFT JOIN image_tags it ON t.id = it.tag_id
       WHERE t.id = ?
       GROUP BY t.id`
        ).bind(id).first<{ name: string; usage_count: number; image_count: number }>();

        if (!tag) {
            return Response.json({
                success: false, error: "Tag not found"
            }, { status: 404 });
        }

        if (tag.image_count > 0) {
            return Response.json({
                success: false, error: `Cannot delete tag "${tag.name}". It is used by ${tag.image_count} image(s).`
            }, { status: 400 });
        }

        await env.DB.prepare(`DELETE FROM tags WHERE id = ?`).bind(id).run();

        return Response.json({
            success: true,
            message: `Tag "${tag.name}" deleted successfully`
        });

    } catch (err) {
        console.error("Error deleting tag:", err);
        return Response.json({
            success: false, error: "Failed to delete tag"
        }, { status: 500 });
    }
}