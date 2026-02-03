-- Add scale column to control image size
ALTER TABLE public.artworks 
ADD COLUMN scale DECIMAL DEFAULT 1.0;

COMMENT ON COLUMN public.artworks.scale IS 'Image scale factor. 1.0 is full size, 0.8 is 80%, etc.';