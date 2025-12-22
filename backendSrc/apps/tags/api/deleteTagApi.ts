import { Env } from "../../..";

export async function DeleteTagApi(request: Request, env: Env) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({
                success: false, error: "Tag ID is required"
            }, { status: 400 });
        }

        const tagUsage = await env.DB.prepare(`
            SELECT
                t.*,
                (SELECT COUNT(*) FROM image_tags WHERE tag_id = t.id) AS image_count,
                (SELECT COUNT(*) FROM archive_tags WHERE tag_id = t.id) AS archive_count
            FROM tags t
            WHERE t.id = ?
        `).bind(id).first<{ name: string; image_count: number; archive_count: number }>();

        if (!tagUsage) {
            return Response.json({ success: false, error: "Tag not found" }, { status: 404 });
        }

        const totalUsage = tagUsage.image_count + tagUsage.archive_count;

        if (totalUsage > 0) {
            return Response.json({
                success: false,
                error: `Cannot delete tag "${tagUsage.name}". It is used by ${totalUsage} item(s).`
            }, { status: 400 });
        }

        await env.DB.prepare(`DELETE FROM tags WHERE id = ?`).bind(id).run();

        return Response.json({
            success: true,
            message: `Tag "${tagUsage.name}" deleted successfully`
        });

    } catch (err) {
        console.error("Error deleting tag:", err);
        return Response.json({
            success: false, error: "Failed to delete tag"
        }, { status: 500 });
    }
}