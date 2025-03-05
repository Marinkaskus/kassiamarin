
export interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  location: string;
  imageSrc: string;
  additionalImages?: string[];
  videoUrl?: string;
  url?: string;
  norwegianDescription?: string;
}
