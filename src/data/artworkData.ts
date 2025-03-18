
import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Hav av blekk",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/87f960bd-2b05-4267-a2f8-a0e03f468113.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Blekksprut - mixed media artwork by Kassia Marin featuring octopus-inspired forms on tile"
  },
  {
    id: 2,
    title: "Bryllupsstolen",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/5b09e1ec-f5ea-4d76-a157-0e06c79cdc2d.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Bryllupsstolen - mixed media artwork by Kassia Marin with wedding chair motif on tile"
  },
  {
    id: 3,
    title: "Tapt i gresset",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/6ad71666-c4c5-4fb9-b88f-78e3a8fbec67.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Tapt i gresset - contemporary mixed media artwork by Kassia Marin with abstract forms on tile"
  },
  {
    id: 4,
    title: "På grensen av overflaten",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/223e8770-bb1d-4b57-a1ab-87674a9ff856.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "På grensen av overflaten - mixed media artwork by Kassia Marin with blue water-inspired elements"
  },
  {
    id: 5,
    title: "Dream Sequence",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/04f9fa7b-1c69-4339-b387-7fb359953c64.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Dream Sequence - abstract mixed media artwork by Kassia Marin featuring portrait and window elements"
  },
  {
    id: 6,
    title: "Untitled",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/c4fab030-0eb7-49ee-9735-9d722de013e2.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Untitled abstract mixed media artwork by Norwegian artist Kassia Marin featuring red and blue floral forms"
  },
  {
    id: 7,
    title: "T-bane.7",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/b440404c-d22c-4228-b72d-613f0d67dbeb.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "T-banen - mixed media artwork by Kassia Marin inspired by Oslo metro system featuring urban scenes"
  },
  {
    id: 8,
    title: "Hva hvis vi begge blir stukke?",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/deae348f-fc92-40e5-8bd5-6c546b74f155.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Hva hvis vi begge blir stukke? - textured mixed media artwork by Kassia Marin with portrait elements"
  },
  {
    id: 9,
    title: "Vulcan",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/lovable-uploads/2cbe1798-fbb2-49f9-8f45-1af14ebcd25d.png",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Vulcan - abstract grid-based mixed media artwork by Kassia Marin with blue and red elements"
  },
  {
    id: 10,
    title: "Kan jeg sove på panseret ditt?",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    imageSrc: "/lovable-uploads/eb961aa0-b928-4d46-a8ad-08bcbd13f05d.png",
    category: "Ink and aquarelle on tile",
    available: true,
    additionalImages: [],
    alt: "Kan jeg sove på panseret ditt? - mixed media artwork by Kassia Marin featuring taxi and text elements"
  },
];

/**
 * Helper function to get artwork by ID
 * @param id Artwork ID
 * @returns Artwork object or undefined if not found
 */
export const getArtworkById = (id: number): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};
