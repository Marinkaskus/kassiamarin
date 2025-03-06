
import { Artwork } from "@/types/Artwork";

// Gallery categories (if you want to organize by type)
export const artworkCategories = [
  "All",
  "Paintings",
  "Mixed Media",
  "Watercolor",
  "Installations"
];

/**
 * Main artworks collection
 * 
 * To add a new artwork:
 * 1. Add a new object to this array
 * 2. Assign a unique ID (increment from the highest current ID)
 * 3. Fill in the details (title, year, size, medium, etc.)
 * 4. Add the main image URL to imageSrc
 * 5. Optionally add additional images in additionalImages array
 * 6. Set category and availability if needed
 */
export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Tranquility in Motion",
    year: "2023",
    size: "60 × 80 cm",
    medium: "Oil on canvas",
    description: "An exploration of stillness within movement, inspired by the Norwegian fjords.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/2jytnvu8o98vgm8rjs5nx/2L5A5997.JPG?rlkey=i3x29ifeoaud9x9t2vdjbza18&st=m5xh57hc&dl=0",
    category: "Paintings",
    available: true,
    additionalImages: []
  },
  {
    id: 2,
    title: "Echoes of Memory",
    year: "2022",
    size: "50 × 70 cm",
    medium: "Acrylic on canvas",
    description: "A visual representation of how memories fade and transform over time.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/fon52yeofhk9l8qw5fujp/2L5A5963.jpg?rlkey=vavbxmfxxu42hm6uc39u84k3l&st=t8rgx9jv&dl=0",
    category: "Paintings",
    available: true,
    additionalImages: []
  },
  {
    id: 3,
    title: "Urban Whispers",
    year: "2021",
    size: "40 × 60 cm",
    medium: "Mixed media",
    description: "Exploring the hidden narratives and overlooked details of city life.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/cswbeyjg5e5blime22rwa/2L5A5988.JPG?rlkey=hib4omvi8202oszrst9x5l3wj&st=siunjjsl&dl=0",
    category: "Mixed Media",
    available: false,
    additionalImages: []
  },
  {
    id: 4,
    title: "Fractured Perspectives",
    year: "2023",
    size: "65 × 85 cm",
    medium: "Oil and ink on canvas",
    description: "A study of how perception shifts and breaks depending on individual experience.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/11ylxog7ysek28cs2u6oh/2L5A5975.JPG?rlkey=6jocfmdggnxgybkgr6n0w5qvu&st=f8utwh2i&dl=0",
    category: "Paintings",
    available: true,
    additionalImages: []
  },
  {
    id: 5,
    title: "Seasons of Self",
    year: "2022",
    size: "45 × 45 cm",
    medium: "Watercolor",
    description: "A cyclical representation of personal growth and transformation.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/b5v8uq9woucs38b0aa5f9/thumb-2.jpg?rlkey=1bho4jusi8tta9308753ntxds&st=d5n97g6j&dl=0",
    category: "Watercolor",
    available: true,
    additionalImages: []
  },
  {
    id: 6,
    title: "Liminal Spaces",
    year: "2021",
    size: "70 × 90 cm",
    medium: "Oil on canvas",
    description: "Exploring the transitional moments between defined states of being.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/57pgme3kvk86cxkq5thhj/cc10.jpg?rlkey=jdl06lbz3fvwk4kchy2mbrfav&st=6wtjh55f&dl=0",
    category: "Paintings",
    available: true,
    additionalImages: []
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

/**
 * Helper function to get artworks by category
 * @param category Category name
 * @returns Array of artworks in the specified category
 */
export const getArtworksByCategory = (category: string): Artwork[] => {
  if (category === "All") return artworks;
  return artworks.filter(artwork => artwork.category === category);
};
