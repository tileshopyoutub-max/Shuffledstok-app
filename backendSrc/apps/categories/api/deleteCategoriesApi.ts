import { Env } from "../../..";

export async function DeleteCategoryApi(request: Request, env: Env) {
    try {
        const { id } = await request.json();

        if (!id) {
            return Response.json({
                success: false, error: "Category ID is required"
            }, { status: 400 });
        }

        const category = await env.DB.prepare(
            `SELECT c.*, COUNT(ic.image_id) as image_count
       FROM categories c
       LEFT JOIN image_categories ic ON c.id = ic.category_id
       WHERE c.id = ?
       GROUP BY c.id`
        ).bind(id).first<{ name: string; usage_count: number; image_count: number }>();

        if (!category) {
            return Response.json({
                success: false, error: "Category not found"
            }, { status: 404 });
        }

        if (category.image_count > 0) {
            return Response.json({
                success: false, error: `Cannot delete category "${category.name}". It is used by ${category.image_count} image(s).`
            }, { status: 400 });
        }

        await env.DB.prepare(`DELETE FROM categories WHERE id = ?`).bind(id).run();

        return Response.json({
            success: true,
            message: `category "${category.name}" deleted successfully`
        });

    } catch (err) {
        console.error("Error deleting category:", err);
        return Response.json({
            success: false, error: "Failed to delete category"
        }, { status: 500 });
    }
}