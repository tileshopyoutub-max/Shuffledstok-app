import { Env } from "../../..";
import { Category } from "../../../types";

export async function GetCategoriesApi(_: Request, env: Env) {
    try {
        const { results } = await env.DB.prepare(`
            SELECT
                id,
                name,
                usage_count,
                created_at
            FROM categories
            ORDER BY name ASC
            `).all<Category>();

        return Response.json({
            success: true,
            categories: results
        })
    } catch (err) {
        return Response.json({
            success: false, error: 'Failed to fetch categories'
        }, { status: 500 })
    }
}





