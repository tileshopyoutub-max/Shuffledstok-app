import { Env } from "../../..";
import type { Tag } from '../../../../src/shared/types/tags'

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