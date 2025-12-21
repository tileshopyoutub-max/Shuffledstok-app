export interface ArchiveImage {
  key: string;
  name: string;
}

export interface ArchiveResponse {
  key: string;
  images: ArchiveImage[];
}