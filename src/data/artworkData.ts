
import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Blekksprut",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    description: "An exploration of form and fluidity through ink, inspired by the graceful movements of an octopus.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/2yftr8rql3x3zc7231ew3/IMG_4867.JPG?rlkey=fgutaemxriyqhq736s3mowea4&st=wy8eptao&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 2,
    title: "Dream Sequence",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    description: "A visual journey through the subconscious, exploring the ethereal nature of dreams and memory.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/gf6as5359k84qmvblpe4e/IMG_4815.JPG?rlkey=orx84rucxceji4x6hcj391g7j&st=0dd9t40e&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 3,
    title: "Mulvarp",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    description: "An exploration of organic forms and textures, inspired by the unseen movements beneath the earth.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/8vrfmg97ir1nos7huhfsu/IMG_4756.JPG?rlkey=myyxwl4pedll8yxw4lvx5pgpx&st=khr3h1yk&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 4,
    title: "Perlen",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    description: "A study in light and translucency, capturing the iridescent quality of pearls and their symbolic depth.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/fs8agttnl5bahrma0fxcl/Perle01.jpg?rlkey=wjvfjdsr9nuvd93jwccz0e5k2&st=rzzub6f6&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 5,
    title: "Bryllupsstolen",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    description: "A contemporary exploration of form and structure, reflecting on the ceremonial significance of marriage.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/ga3quntiameqo0x2swe3u/IMG_4842.JPG?rlkey=p4g8gkdc6n60aumdh7l6fs736&st=6wn13oli&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 6,
    title: "Untitled",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media",
    description: "An abstract interpretation of energy and flow, allowing viewers to find their own meaning in the composition.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/aayffts5nuwnkdov1b2c0/IMG_4878.JPG?rlkey=u9zaotwctok4acwuf4hmd2dml&st=0qyipsso&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 7,
    title: "T-banen",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media",
    description: "Urban rhythms captured in abstract form, inspired by the movement and energy of Oslo's metro system.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/60cpoedslwwb1u3h4i7rr/IMG_4742.JPG?rlkey=eut76w8rqgfz8i8l1piusqyou&st=5d72yiov&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 8,
    title: "Myggstikk",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media",
    description: "A playful exploration of texture and pattern, inspired by nature's smallest interventions.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/hxwh5dd32xjxazzt08n1y/IMG_4849.JPG?rlkey=2bf7jxjngcre57akxgdxp5f80&st=ez2bv1xl&dl=0",
    category: "Mixed Media",
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
