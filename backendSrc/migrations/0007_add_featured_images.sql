-- Migration number: 0007 	 2025-12-25T19:25:21.574Z
-- Добавляем featured для обычных изображений
ALTER TABLE images
ADD COLUMN featured INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_images_featured
ON images(featured);

-- Добавляем featured для изображений архивов
ALTER TABLE archives
ADD COLUMN featured INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_archives_featured
ON archives(featured);

-- Добавляем поле preview_image_id для архивов
ALTER TABLE archives
ADD COLUMN preview_image_id INTEGER NULL;

CREATE INDEX IF NOT EXISTS idx_archives_preview_image
ON archives(preview_image_id);