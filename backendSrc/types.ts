export interface Category {
  id: number;
  name: string;
  usage_count: number;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  usage_count: number;
  created_at: string;
}

export interface ArchiveRow {
  id: number;
  key: string;
  title: string;
  description: string;
  download_free: number;
  created_at: string;
  tags: string | null;
  categories: string | null;
  featured?: number;
  preview_image_id?: number;
}