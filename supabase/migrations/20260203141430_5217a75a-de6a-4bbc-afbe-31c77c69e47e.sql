-- Create storage bucket for artwork images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artworks', 'artworks', true);

-- Allow public read access to artwork images
CREATE POLICY "Public can view artwork images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'artworks');

-- Allow admins to upload artwork images
CREATE POLICY "Admins can upload artwork images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'artworks' AND public.is_admin());

-- Allow admins to update artwork images
CREATE POLICY "Admins can update artwork images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'artworks' AND public.is_admin());

-- Allow admins to delete artwork images
CREATE POLICY "Admins can delete artwork images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'artworks' AND public.is_admin());