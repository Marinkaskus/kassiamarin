
export interface Artwork {
  id: number;
  title: string;
  year: string;
  size: string;
  medium: string;
  description?: string;
  imageSrc: string;
  category?: string;
  available?: boolean;
  price?: string;
  additionalImages?: string[];
  alt?: string;  // Added alt property for image accessibility
}
