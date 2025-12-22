-- Migration number: 0006 	 2025-12-21T08:48:03.769Z
CREATE TABLE IF NOT EXISTS archives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    download_free INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для превью-картинок архивов
CREATE TABLE IF NOT EXISTS archive_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    archive_id INTEGER NOT NULL,
    key TEXT NOT NULL UNIQUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
);

-- Связь архивов с тегами
CREATE TABLE IF NOT EXISTS archive_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    archive_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(archive_id, tag_id),
    FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Связь архивов с категориями
CREATE TABLE IF NOT EXISTS archive_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    archive_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(archive_id, category_id),
    FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_archives_key ON archives(key);
CREATE INDEX IF NOT EXISTS idx_archive_images_archive_id ON archive_images(archive_id);
CREATE INDEX IF NOT EXISTS idx_archive_images_key ON archive_images(key);
CREATE INDEX IF NOT EXISTS idx_archive_images_sort ON archive_images(archive_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_archive_tags_archive ON archive_tags(archive_id);
CREATE INDEX IF NOT EXISTS idx_archive_tags_tag ON archive_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_archive_categories_archive ON archive_categories(archive_id);
CREATE INDEX IF NOT EXISTS idx_archive_categories_category ON archive_categories(category_id);
