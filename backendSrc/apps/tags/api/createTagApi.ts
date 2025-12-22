import { Env } from "../../..";
import type { Tag } from './../../../types'

export async function CreateTagApi(request: Request, env: Env) {
    let name: string = '';
    try {
        const data = await request.json();
        name = data.name || '';

        if (!name?.trim()) {
            return Response.json({
                success: false, error: 'Tag name is required'
            }, {status: 400})
        }

        const trimmedName = name.trim();

        const result = await env.DB.prepare(
            `INSERT INTO tags (name) VALUES (?)`
        ).bind(trimmedName).run();

        const newTag = await env.DB.prepare(
            `SELECT * FROM tags WHERE id = ?`
        ).bind(result.meta.last_row_id).first<Tag>();

        return Response.json({
            success: true, tag: newTag
        })
    } catch (err: any) {
        if (err.message?.includes('UNIQUE constraint failed')) {
            return Response.json({
                success: false, error: `Tag "${name}" already exists`
            }, { status: 409 })
        }

        return Response.json({
            success: false, error: 'Failed to create tag'
        }, { status: 500 })
    }
}