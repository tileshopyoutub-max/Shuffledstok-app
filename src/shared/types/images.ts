export interface ImageItems {
  id: number;
  key: string;
  title: string | null;
  description: string | null;
  tags: string[];
  categories: string[];
  downloadFree: boolean;
  has_watermark: number;
  created_at: string;
  url: string;
  featured?: number;
  priceCents: number;
}
