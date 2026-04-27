import { useEffect } from "react";

interface UseSeoMetaParams {
  title: string;
  description: string;
}

export function useSeoMeta({ title, description }: UseSeoMetaParams) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, [title, description]);
}
