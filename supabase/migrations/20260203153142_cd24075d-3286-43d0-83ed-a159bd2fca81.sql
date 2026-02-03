-- Add overlap_previous column to control which artworks overlap with the one above
ALTER TABLE public.artworks 
ADD COLUMN overlap_previous BOOLEAN DEFAULT false;

COMMENT ON COLUMN public.artworks.overlap_previous IS 'Whether this artwork should overlap with the one above it.';