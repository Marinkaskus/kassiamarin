import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Blekk Series",
    year: "2024",
    size: "60 × 80 cm",
    medium: "Mixed media",
    description: "An exploration of form and fluidity through ink.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/s7aoq3wjxyo537d6kdtvl/Blekk01.jpg?rlkey=cctjghectqbkl9p1u72vmkq8r&st=kl66e109&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 2,
    title: "Dream Sequence",
    year: "2024",
    size: "50 × 70 cm",
    medium: "Mixed media",
    description: "A visual journey through the subconscious.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/agwjy2q9f58npoq3453a5/Dr-mm01.jpg?rlkey=m1d8l1dzghv5aim12mbs8fc6u&st=xi86pxq1&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 3,
    title: "Mulvarp Study",
    year: "2024",
    size: "40 × 60 cm",
    medium: "Mixed media",
    description: "An exploration of organic forms and textures.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/hct82cucfdspwy8z6rpyq/Mulvarp01.jpg?rlkey=pzq2mgsrbnfu1fl5qlywsdneb&st=fm2281m1&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 4,
    title: "Pearl Series",
    year: "2024",
    size: "45 × 65 cm",
    medium: "Mixed media",
    description: "A study in light and translucency.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/fs8agttnl5bahrma0fxcl/Perle01.jpg?rlkey=wjvfjdsr9nuvd93jwccz0e5k2&st=rzzub6f6&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 5,
    title: "Stol Series",
    year: "2024",
    size: "50 × 70 cm",
    medium: "Mixed media",
    description: "A contemporary exploration of form and structure.",
    imageSrc: "https://dl.dropboxusercontent.com/s/vwswa20wjsjivkei3b7sb/Stol01.jpg?rlkey=fthwuyjj9wungozcfwj9w7ens&st=pusa401h&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 6,
    title: "Strøm Series",
    year: "2024",
    size: "60 × 80 cm",
    medium: "Mixed media",
    description: "An abstract interpretation of energy and flow.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/a10i6tuebol83l6nuu2ym/Str-m01.jpg?rlkey=j4tulwf7hvpbzb33hemh0ftmt&st=sqm4i38i&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: []
  },
  {
    id: 7,
    title: "T-banen Series",
    year: "2024",
    size: "55 × 75 cm",
    medium: "Mixed media",
    description: "Urban rhythms captured in abstract form.",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/xop4mpjsgjw454l8znkjl/Tbanen01.jpg?rlkey=xrk14txbac3ilg25atge7xfnt&st=5q6p6432&dl=0",
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
