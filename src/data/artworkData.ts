
import { Artwork } from "@/types/Artwork";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Blekksprut",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/6ogoow1um6arrysl7tnd2/Blekksprut_2024.jpg?rlkey=boc74c4y6p1vu9m47ifpyi1nr&st=rigge91a&dl=0",
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
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/ga3quntiameqo0x2swe3u/IMG_4842.JPG?rlkey=p4g8gkdc6n60aumdh7l6fs736&st=6wn13oli&dl=0",
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
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/8vrfmg97ir1nos7huhfsu/IMG_4756.JPG?rlkey=myyxwl4pedll8yxw4lvx5pgpx&st=khr3h1yk&dl=0",
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
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/abaep6vlccql9n2f5bqox/IMG_4731.JPG?rlkey=lm7w3wdcfbwpcm4prcf8sf7za&st=uwtzhr9l&dl=0",
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
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/gf6as5359k84qmvblpe4e/IMG_4815.JPG?rlkey=orx84rucxceji4x6hcj391g7j&st=0dd9t40e&dl=0",
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
    medium: "Mixed media",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/aayffts5nuwnkdov1b2c0/IMG_4878.JPG?rlkey=u9zaotwctok4acwuf4hmd2dml&st=0qyipsso&dl=0",
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
    medium: "Mixed media",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/60cpoedslwwb1u3h4i7rr/IMG_4742.JPG?rlkey=eut76w8rqgfz8i8l1piusqyou&st=5d72yiov&dl=0",
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
    medium: "Mixed media",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/hxwh5dd32xjxazzt08n1y/IMG_4849.JPG?rlkey=2bf7jxjngcre57akxgdxp5f80&st=ez2bv1xl&dl=0",
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
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/grk2wwj3cz001o9isx86x/IMG_4913.JPG?rlkey=pxecnipmb91qnppce9dezb6oy&st=iifyjkf3&dl=0",
    category: "Mixed Media",
    available: true,
    additionalImages: [],
    alt: "Vulcan - vibrant mixed media artwork by Kassia Marin with volcanic-inspired elements"
  },{
    id: 10,
    title: "Taxi",
    year: "2024",
    size: "30 × 60 cm",
    medium: "Mixed media on tile",
    imageSrc: "https://dl.dropboxusercontent.com/s/fi/or47jdo16nn775swl3yqw/IMG_4888.JPG?rlkey=qh39lbg61cb8x1jr5r2gex3c5&st=xmvvh62x&dl=0",
    category: "Mixed Media",
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
