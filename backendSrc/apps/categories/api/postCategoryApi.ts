import { Env } from "../../..";
import { Category } from "../../../types";

export async function PostCategoryApi(request: Request, env: Env) {
    let name: string = '';
    try {
        const data = await request.json();
        name = data.name || '';

        if (!name?.trim()) {
            return Response.json({
                success: false, error: 'Category name is required'
            }, {status: 400})
        }

        const trimmedName = name.trim();

        const result = await env.DB.prepare(
            `INSERT INTO categories (name) VALUES (?)`
        ).bind(trimmedName).run();

        const newCategory = await env.DB.prepare(
            `SELECT * FROM categories WHERE id = ?`
        ).bind(result.meta.last_row_id).first<Category>();

        return Response.json({
            success: true, category: newCategory
        })
    } catch (err: any) {
        if (err.message?.includes('UNIQUE constraint failed')) {
            return Response.json({
                success: false, error: `Category "${name}" already exists`
            }, { status: 409 })
        }

        return Response.json({
            success: false, error: 'Failed to create category'
        }, { status: 500 })
    }
}