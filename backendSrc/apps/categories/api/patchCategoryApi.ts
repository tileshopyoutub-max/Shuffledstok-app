import { Env } from "../../..";
import { Category } from "../../../types";

export async function UpdateCategoryApi(request: Request, env: Env) {

    let name: string = '';
    try {
        const data = await request.json();
        const { id } = data;
        name = data.name || '';

        if (!id || !name?.trim()) {
            return Response.json({
                success: false, error: "Category ID and name are required"
            }, { status: 400 });
        }

        const trimmedName = name.trim();

        const existingCategory = await env.DB.prepare(
            `SELECT id FROM categories WHERE id = ?`
        ).bind(id).first();

        if (!existingCategory) {
            return Response.json({
                success: false, error: "Category not found"
            }, { status: 404 });
        }

        await env.DB.prepare(
            `UPDATE categories SET name = ? WHERE id = ?`
        ).bind(trimmedName, id).run();

        const updatedCategory = await env.DB.prepare(
            `SELECT * FROM categories WHERE id = ?`
        ).bind(id).first<Category>();

        return Response.json({
            success: true,
            category: updatedCategory
        });

    } catch (err: any) {
        if (err.message?.includes('UNIQUE constraint failed')) {
            return Response.json({
                success: false, error: `Category "${name}" already exists`
            }, { status: 409 });
        }

        console.error("Error updating category:", err);
        return Response.json({
            success: false, error: "Failed to update category"
        }, { status: 500 });
    }
}