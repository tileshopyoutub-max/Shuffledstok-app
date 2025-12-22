export interface ArchiveImage {
  id: number;
  key: string;
  archiveId: number;
  sortOrder: number;
  url: string;
  relatedPhotos: ArchiveImage[];
}

export interface ArchiveItem {
  id: number;
  key: string;
  title: string;
  description: string;
  downloadFree: boolean;
  tags: string[];
  categories: string[];
  images: ArchiveImage[];
  created_at?: string;
}