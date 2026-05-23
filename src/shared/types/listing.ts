export type PrimaryCategory = "wallpapers" | "icons" | "stickers";

export type EntityType = "image" | "archive";

export interface ListingMeta {
  slug: string | null;
  primaryCategory: PrimaryCategory | null;
}

export interface PublicListingInfo {
  slug: string;
  primaryCategory: PrimaryCategory;
  entityType: EntityType;
  entityId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicImageAsset {
  type: "image";
  id: number;
  key: string;
  title: string | null;
  description: string | null;
  has_watermark: number;
  created_at: string;
  tags: string[];
  categories: string[];
  downloadFree: boolean;
  priceCents: number;
  featured: number;
  url: string;
}

export interface PublicArchiveAsset {
  type: "archive";
  id: number;
  title: string | null;
  description: string | null;
  downloadFree: boolean;
  priceCents: number;
  featured: number;
  created_at: string;
  tags: string[];
  categories: string[];
  images: { id: number; key: string; url: string; archiveId: number; sortOrder: number }[];
  preview_image_id?: number;
}

export interface PublicListingResponse {
  listing: PublicListingInfo;
  asset: PublicImageAsset | PublicArchiveAsset;
}
