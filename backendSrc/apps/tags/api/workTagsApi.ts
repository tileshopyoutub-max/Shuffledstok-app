import { Env } from "../../..";
import { Tag } from "../../../types";

//Получение тегов
export async function GetTagsApi(_: Request, env: Env) {
    try {
        const { results } = await env.DB.prepare(`
            SELECT
                id,
                name,
                usage_count,
                created_at
            FROM tags
            ORDER BY name ASC
            `).all<Tag>();

        return Response.json({
            success: true,
            tags: results
        })
    } catch (err) {
        return Response.json({
            success: false, error: 'Failed to fetch tags'
        }, { status: 500 })
    }
}

//Создание тега

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

//Изменение тега

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

//Удаление тега
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