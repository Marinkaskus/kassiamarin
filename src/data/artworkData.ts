import { Artwork } from "@/types/Artwork";
import varmekablerImg from "@/assets/artworks/varmekabler.png";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Varmekabler",
    year: "2026",
    size: "95 × 65 cm",
    medium: "Ink on ceramic tiles",
    imageSrc: varmekablerImg,
    category: "Ink on ceramic tiles",
    alt: "Varmekabler - ink artwork on ceramic tiles by Kassia Marin featuring feet on traditional blue tile pattern"
  }
];

/**
 * Helper function to get artwork by ID
 * @param id Artwork ID
 * @returns Artwork object or undefined if not found
 */
export const getArtworkById = (id: number): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};
