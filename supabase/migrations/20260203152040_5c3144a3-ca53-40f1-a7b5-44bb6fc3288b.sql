-- Add alignment and show_info columns to support multi-image artworks
ALTER TABLE public.artworks 
ADD COLUMN alignment TEXT DEFAULT NULL,
ADD COLUMN show_info BOOLEAN DEFAULT true;

-- Add comment for documentation
COMMENT ON COLUMN public.artworks.alignment IS 'Override alignment: left, right, or center. NULL uses automatic pattern.';
COMMENT ON COLUMN public.artworks.show_info IS 'Whether to show the info line below the image. Default true.';