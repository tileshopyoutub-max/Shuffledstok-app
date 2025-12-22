import { Env } from "../../..";
import type { Tag } from './../../../types'

export async function UpdateTagApi(request: Request, env: Env) {

    let name: string = '';
    try {
        const data = await request.json();
        const { id } = data;
        name = data.name || '';

        if (!id || !name?.trim()) {
            return Response.json({
                success: false, error: "Tag ID and name are required"
            }, { status: 400 });
        }

        const trimmedName = name.trim();

        const existingTag = await env.DB.prepare(
            `SELECT id FROM tags WHERE id = ?`
        ).bind(id).first();

        if (!existingTag) {
            return Response.json({
                success: false, error: "Tag not found"
            }, { status: 404 });
        }

        await env.DB.prepare(
            `UPDATE tags SET name = ? WHERE id = ?`
        ).bind(trimmedName, id).run();

        const updatedTag = await env.DB.prepare(
            `SELECT * FROM tags WHERE id = ?`
        ).bind(id).first<Tag>();

        return Response.json({
            success: true,
            tag: updatedTag
        });

    } catch (err: any) {
        if (err.message?.includes('UNIQUE constraint failed')) {
            return Response.json({
                success: false, error: `Tag "${name}" already exists`
            }, { status: 409 });
        }

        console.error("Error updating tag:", err);
        return Response.json({
            success: false, error: "Failed to update tag"
        }, { status: 500 });
    }
}