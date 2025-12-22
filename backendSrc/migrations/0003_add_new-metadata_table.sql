-- Migration number: 0003 	 2025-12-17T12:38:03.278Z
CREATE TABLE images_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    has_watermark INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images_new (id, key, title, description, has_watermark, created_at)
SELECT id, key, title, description, has_watermark, created_at
FROM images;

DROP TABLE images;

ALTER TABLE images_new RENAME TO images;