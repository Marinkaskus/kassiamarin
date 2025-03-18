
import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Hav av blekk",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Blekksprut_2024_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Blekksprut - mixed media artwork by Kassia Marin featuring octopus-inspired forms on tile"
  },
  {
    id: 5,
    title: "Bryllupsstolen",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Bryllupsstolen_2025_ramme.jpg",
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
    imageSrc: "/images/artwork/Mulvarp_2025_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Mulvarp - contemporary mixed media artwork by Kassia Marin with mole-inspired elements on tile"
  },
  {
    id: 4,
    title: "På grensen av overflaten",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Perlen_2025_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Perlen - mixed media artwork by Kassia Marin featuring pearl-like elements on tile"
  },
  {
    id: 2,
    title: "Dream Sequence",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Drommer_2025_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Dream Sequence - abstract mixed media artwork by Kassia Marin exploring dreamlike themes on tile"
  },
  {
    id: 6,
    title: "Untitled",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Untitled_2025_ramme-2.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Untitled abstract mixed media artwork by Norwegian artist Kassia Marin"
  },
  {
    id: 7,
    title: "T-bane.7",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/T-banen_2025_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "T-banen - mixed media artwork by Kassia Marin inspired by Oslo metro system"
  },
  {
    id: 8,
    title: "Hva hvis vi begge blir stukke?",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Mygg_2025_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Myggstikk - textured mixed media artwork by Kassia Marin with mosquito bite theme"
  },
  {
    id: 9,
    title: "Vulcan",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "/images/artwork/Vulcan_2025_ramme.jpg",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Vulcan - vibrant mixed media artwork by Kassia Marin with volcanic-inspired elements"
  },{
    id: 10,
    title: "Kan jeg sove på panseret ditt?",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    imageSrc: "/images/artwork/Kan-jeg-sove-p-pansere-ditt-_2025_ramme_kassiamarin.jpg",
    category: "Ink and aquarelle on tile",
    available: true,
    additionalImages: [],
    alt: "Taxi - urban-inspired mixed media artwork by Kassia Marin featuring taxi themes"
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
