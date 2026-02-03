
import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [];

/**
 * Helper function to get artwork by ID
 * @param id Artwork ID
 * @returns Artwork object or undefined if not found
 */
export const getArtworkById = (id: number): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};
