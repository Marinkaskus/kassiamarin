CREATE TABLE IF NOT EXISTS public.workshop_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  age text NOT NULL,
  guardian_name text NOT NULL,
  guardian_phone text NOT NULL,
  email text NOT NULL,
  workshop_dates text[] NOT NULL,
  additional_info text,
  photo_permission boolean DEFAULT false,
  accept_terms boolean DEFAULT false,
  is_processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

GRANT INSERT ON public.workshop_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workshop_registrations TO authenticated;
GRANT ALL ON public.workshop_registrations TO service_role;

ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register for workshops"
ON public.workshop_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view registrations"
ON public.workshop_registrations FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can update registrations"
ON public.workshop_registrations FOR UPDATE TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can delete registrations"
ON public.workshop_registrations FOR DELETE TO authenticated USING (public.is_admin());

-- Restrict direct execution of the SECURITY DEFINER admin check
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- Storage: public bucket should not be listable
DROP POLICY IF EXISTS "Public can view artwork images" ON storage.objects;
CREATE POLICY "Admins can list artwork images"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'artworks' AND public.is_admin());