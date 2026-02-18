import type { Env } from "../../..";

export async function updateArchiveAccessApi(request: Request, env: Env) {
  try {
    const { id, access, price } = (await request.json()) as {
      id: number;
      access: "free" | "premium";
      price?: string;
    };

    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existing = await env.DB.prepare(
      `SELECT id FROM archives WHERE id = ?`
    )
      .bind(id)
      .first<{ id: number }>();

    if (!existing) {
      return new Response(JSON.stringify({ error: "Archive not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const download_free = access === "free" ? 1 : 0;

    let price_cents = 0;

    if (access === "premium") {
      const raw = String(price ?? "").trim();
      const normalized = raw === "—" ? "" : raw.replace(",", ".");

      if (normalized !== "") {
        const n = Number(normalized);

        if (!Number.isFinite(n)) {
          return new Response(
            JSON.stringify({ error: "price must be a number" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        price_cents = Math.round(n * 100);
      }
    }

    if (access === "free") {
      price_cents = 0;
    }

    // 4) update DB
    await env.DB.prepare(
      `UPDATE archives SET download_free = ?, price_cents = ? WHERE id = ?`
    )
      .bind(download_free, price_cents, id)
      .run();

    // 5) respond
    return new Response(
      JSON.stringify({
        success: true,
        id,
        downloadFree: Boolean(download_free),
        priceCents: price_cents,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
