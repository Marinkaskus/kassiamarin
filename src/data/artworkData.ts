
import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Blekksprut",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/9h2affspkd8jt085h633h/Blekksprut_2024_ramme.jpg?rlkey=mgbo0s3pqzivvy7dwke4f0k7a&st=zlyecp6v&dl=0",
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
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/794w90ry1wstaccx0ukth/Bryllupsstolen_2025_ramme.jpg?rlkey=zeko4rh9016d5bw54qgy497ls&st=n2gu4dgo&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Bryllupsstolen - mixed media artwork by Kassia Marin with wedding chair motif on tile"
  },
  {
    id: 3,
    title: "Mulvarp",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/qchkqrmgc9b7jtpgv7j56/Mulvarp_2025_-ramme.jpg?rlkey=9nhhbtah7ix5aoupco2e33jch&st=e1ktlg45&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Mulvarp - contemporary mixed media artwork by Kassia Marin with mole-inspired elements on tile"
  },
  {
    id: 4,
    title: "Perlen",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/6y3iuoy4h3hdyfuqrurla/Perlen_2025_ramme.jpg?rlkey=hzfcax2sin66psjky6k2sxzwe&st=c0routno&dl=0",
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
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/f2unucz8lqertfcbvv37b/Dr-mmer_2025_ramme.jpg?rlkey=6davtxwenud59of8mww2x8tfm&st=ldrrc6ud&dl=0",
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
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/apjxzb9ah6xaryaolsvy3/Untitled_2025_ramme-2.jpg?rlkey=vesobjwjoaoyodrpdqf8csm0l&st=o7mv305f&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Untitled abstract mixed media artwork by Norwegian artist Kassia Marin"
  },
  {
    id: 7,
    title: "T-banen",
    year: "2025",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/f6294r8222goqlioes9ed/T-banen_2025_ramme.jpg?rlkey=jpybrmyzj95uam7834heey2c3&st=t4x7uxn6&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "T-banen - mixed media artwork by Kassia Marin inspired by Oslo metro system"
  },
  {
    id: 8,
    title: "Myggstikk",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Ink and aquarelle on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/ylh9ft3c6h5avqg0u3tf3/Mygg_2025_ramme.jpg?rlkey=o5zg6beycd1xdilsl4b17oz6j&st=2238fpfk&dl=0",
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
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/w26bvb1dkpox2247w7vso/Vulcan_2025_ramme.jpg?rlkey=5biz8q03l6g5gono4n4ahltz3&st=x642swk6&dl=0",
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
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/j4keqxeqpzecl81bg1cet/Kan-jeg-sove-p-pansere-ditt-_2025_ramme_kassiamarin.jpg?rlkey=2fez0etbi6yshuzmeusz0ic6q&st=3zhycthr&dl=0",
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
