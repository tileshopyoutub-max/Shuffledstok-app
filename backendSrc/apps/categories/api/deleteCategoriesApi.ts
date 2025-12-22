import { Env } from "../../..";

export async function DeleteCategoryApi(request: Request, env: Env) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({
                success: false, error: "Category ID is required"
            }, { status: 400 });
        }

        const categoryUsage = await env.DB.prepare(`
            SELECT
                c.*,
                (SELECT COUNT(*) FROM image_categories WHERE category_id = c.id) AS image_count,
                (SELECT COUNT(*) FROM archive_categories WHERE category_id = c.id) AS archive_count
            FROM categories c
            WHERE c.id = ?
        `).bind(id).first<{ name: string; image_count: number; archive_count: number }>();

        if (!categoryUsage) {
            return Response.json({ success: false, error: "Category not found" }, { status: 404 });
        }

        const totalUsage = categoryUsage.image_count + categoryUsage.archive_count;

        if (totalUsage > 0) {
            return Response.json({
                success: false,
                error: `Cannot delete category "${categoryUsage.name}". It is used by ${totalUsage} item(s).`
            }, { status: 400 });
        }

        await env.DB.prepare(`DELETE FROM categories WHERE id = ?`).bind(id).run();

        return Response.json({
            success: true,
            message: `Category "${categoryUsage.name}" deleted successfully`
        });

    } catch (err) {
        console.error("Error deleting category:", err);
        return Response.json({
            success: false, error: "Failed to delete category"
        }, { status: 500 });
    }
}