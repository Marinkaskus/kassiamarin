
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
  alignment?: 'left' | 'right' | 'center' | null;  // Override automatic alignment
  showInfo?: boolean;  // Whether to show info line below image
  scale?: number;  // Image scale factor (1.0 = full size, 0.8 = 80%, etc.)
}
