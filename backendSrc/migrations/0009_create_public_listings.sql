-- Migration number: 0009
CREATE TABLE IF NOT EXISTS public_listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('image', 'archive')),
  entity_id INTEGER NOT NULL,
  primary_category TEXT NOT NULL CHECK (
    primary_category IN ('wallpapers', 'icons', 'stickers')
  ),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
  UNIQUE (slug),
  UNIQUE (entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_public_listings_category_slug
  ON public_listings (primary_category, slug);

CREATE INDEX IF NOT EXISTS idx_public_listings_entity
  ON public_listings (entity_type, entity_id);
