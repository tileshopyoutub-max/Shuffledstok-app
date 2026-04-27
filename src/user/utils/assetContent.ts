import type { MediaItem } from "../../components/admin/hooks/useAllMedia";

export type AssetType = "wallpaper" | "icon" | "sticker";

interface AssetContent {
  type: AssetType;
  longDescription: string;
  included: string[];
  bestFor: string[];
  howToUse: string[];
  metaTitle: string;
  metaDescription: string;
}

const LICENSE_NOTE =
  "Free for personal use. Do not resell, redistribute, upload as your own product, or claim ownership of the original files.";

const wallpaperOpener = [
  "This phone wallpaper is designed for people who want a polished lock screen and a cleaner home screen without visual noise.",
  "This wallpaper download is made for iPhone and Android users who want their lock screen and home screen to feel intentional and balanced.",
  "This mobile wallpaper works beautifully on iPhone and Android displays, giving your lock screen and home screen a calm, curated look.",
];

const iconOpener = [
  "This Instagram Story Highlight icon set helps you organize your profile with clean visual labels that are easy to scan.",
  "These Instagram Story Highlight covers are built for creators who want a more consistent profile identity across every category.",
  "This highlight icon pack is ideal when you want your Instagram Story Highlight covers to look professional, minimal, and on-brand.",
];

const stickerOpener = [
  "This digital sticker design is made for creative workflows like digital planning, social media stories, and moodboard layouts.",
  "These stickers add personality to digital planning pages, story slides, and personal creative projects without overpowering your design.",
  "This sticker asset is created for moodboards, journals, social content, and everyday digital creativity with a flexible visual style.",
];

function pickByTitle(title: string, variants: string[]): string {
  const code = title.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return variants[code % variants.length];
}

function inferAssetType(asset: MediaItem): AssetType {
  const source = `${asset.title} ${asset.tags.join(" ")} ${asset.categories.join(
    " "
  )}`.toLowerCase();

  if (source.includes("sticker")) return "sticker";
  if (
    source.includes("icon") ||
    source.includes("instagram") ||
    source.includes("highlight")
  ) {
    return "icon";
  }

  return "wallpaper";
}

function inferPalette(tags: string[]): string {
  const source = tags.join(" ").toLowerCase();
  if (source.includes("beige") || source.includes("neutral")) return "soft neutral tones";
  if (source.includes("dark") || source.includes("oled")) return "deep dark tones";
  if (source.includes("pink") || source.includes("pastel")) return "soft pastel colors";
  if (source.includes("blue")) return "cool blue shades";
  return "balanced modern tones";
}

function inferMood(tags: string[]): string {
  const source = tags.join(" ").toLowerCase();
  if (source.includes("minimal")) return "clean and minimal";
  if (source.includes("cute")) return "playful and cozy";
  if (source.includes("dark")) return "focused and cinematic";
  if (source.includes("aesthetic")) return "curated and stylish";
  return "versatile and modern";
}

export function getLicenseNote() {
  return LICENSE_NOTE;
}

export function buildAssetContent(asset: MediaItem): AssetContent {
  const title = asset.title || "Digital Asset";
  const palette = inferPalette(asset.tags);
  const mood = inferMood(asset.tags);
  const type = inferAssetType(asset);

  if (type === "icon") {
    const longDescription = `${pickByTitle(
      title,
      iconOpener
    )} The "${title}" pack is styled with ${palette} and a ${mood} mood, so it fits modern creator profiles, blogger brands, and small business pages. You can use these covers to separate FAQs, offers, behind-the-scenes, tutorials, or portfolio highlights while keeping your profile consistent. The files are easy to save and reuse, and they work best when paired with matching brand colors and story typography. If you are building a recognizable visual identity, this set gives you a quick way to improve profile navigation and make your highlights feel more intentional.`;

    return {
      type,
      longDescription,
      included: [
        "High-quality Instagram Story Highlight icon cover image",
        "Clean visual style suitable for minimal profile themes",
        "Ready-to-use digital file for quick upload",
      ],
      bestFor: [
        "Creators and influencers",
        "Bloggers and lifestyle pages",
        "Small brands building a consistent Instagram look",
      ],
      howToUse: [
        "Download the icon and save it to your phone.",
        "Open Instagram -> profile -> Story Highlight -> Edit Highlight.",
        "Choose Edit Cover and select the downloaded icon.",
      ],
      metaTitle: `${title} Instagram Highlight Icon – Free Download | ShuffledStock`,
      metaDescription: `Download free Instagram Story Highlight icons for creators, bloggers, and small brands. Style your profile with clean custom highlight covers.`,
    };
  }

  if (type === "sticker") {
    const longDescription = `${pickByTitle(
      title,
      stickerOpener
    )} "${title}" features ${palette} with a ${mood} aesthetic, making it useful for planners, content creators, and hobby designers who want reusable visual elements. Add this sticker to digital planning spreads, social media stories, collage moodboards, and personal design experiments where you need subtle personality without clutter. It can be layered with text, photos, and other graphics to build branded story slides or themed project boards. Whether you are creating for fun or for a content workflow, this sticker gives you an easy starting point for polished, cohesive compositions.`;

    return {
      type,
      longDescription,
      included: [
        "One high-quality digital sticker file",
        "Style-focused design element for layered compositions",
        "Reusable visual asset for personal projects",
      ],
      bestFor: [
        "Digital planning and journaling",
        "Social media stories and templates",
        "Moodboards and personal creative projects",
      ],
      howToUse: [
        "Download the file and add it to your design app or planner.",
        "Place it over photos, backgrounds, or template layouts.",
        "Resize and combine with text or other elements for final export.",
      ],
      metaTitle: `${title} Digital Sticker – Free Download | ShuffledStock`,
      metaDescription: `Download a free digital sticker for planning, moodboards, and social media stories. Creative, reusable sticker asset for personal projects.`,
    };
  }

  const longDescription = `${pickByTitle(
    title,
    wallpaperOpener
  )} "${title}" uses ${palette} with a ${mood} visual direction, making it a strong fit for daily phone personalization. It is designed for both iPhone and Android, and looks great as a lock screen wallpaper when you want an elegant first glance, or as a home screen wallpaper when paired with widgets and clean icon layouts. This download works especially well for users who prefer intentional color harmony and less distraction throughout the day. If you are updating your setup, this wallpaper gives your phone a refined look while staying practical and easy to read.`;

  return {
    type,
    longDescription,
    included: [
      "One high-resolution phone wallpaper image",
      "Format suitable for iPhone and Android screens",
      "Style-forward visual for lock screen and home screen setups",
    ],
    bestFor: [
      "Minimal and aesthetic phone setups",
      "Lock screen refreshes and clean home screen themes",
      "Users who want a cohesive daily device look",
    ],
    howToUse: [
      "Download the wallpaper to your phone gallery.",
      "Open your wallpaper settings on iPhone or Android.",
      "Set the image as lock screen, home screen, or both.",
    ],
    metaTitle: `${title} Phone Wallpaper – Free Download | ShuffledStock`,
    metaDescription: `Download free phone wallpaper for iPhone and Android. Use it on lock screens and home screens for a clean, aesthetic setup.`,
  };
}
