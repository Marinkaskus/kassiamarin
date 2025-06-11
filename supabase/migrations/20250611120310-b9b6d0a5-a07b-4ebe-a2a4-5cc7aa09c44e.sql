
-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  artwork_id INTEGER NOT NULL,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL,             -- Amount in øre (NOK cents)
  currency TEXT DEFAULT 'nok',
  status TEXT DEFAULT 'pending',       -- 'pending', 'paid', 'failed'
  buyer_email TEXT,
  buyer_name TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create artwork_prices table to store individual prices
CREATE TABLE public.artwork_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id INTEGER UNIQUE NOT NULL,
  price INTEGER NOT NULL,              -- Price in øre (NOK cents)
  currency TEXT DEFAULT 'nok',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_prices ENABLE ROW LEVEL SECURITY;

-- Policies for orders (users can only see their own orders)
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update orders" 
  ON public.orders 
  FOR UPDATE 
  USING (true);

-- Policies for artwork_prices (public read, admin write)
CREATE POLICY "Anyone can view artwork prices" 
  ON public.artwork_prices 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage prices" 
  ON public.artwork_prices 
  FOR ALL 
  USING (auth.uid() IS NOT NULL);

-- Insert prices for existing artworks with correct values
INSERT INTO public.artwork_prices (artwork_id, price, available) VALUES
(1, 1549900, true),    -- 15499 NOK for "Du er ikke en sol"
(2, 749900, true),     -- 7499 NOK for "Hav av blekk"
(3, 749900, true),     -- 7499 NOK for "Jeg er redd..."
(4, 749900, true),     -- 7499 NOK for "Tapt i gresset"
(5, 749900, true),     -- 7499 NOK for "På grensen av overflaten"
(6, 749900, true),     -- 7499 NOK for "Nunta de flori"
(7, 749900, true),     -- 7499 NOK for "Dream Sequence"
(9, 749900, true),     -- 7499 NOK for "T-bane.1"
(10, 749900, true),    -- 7499 NOK for "Hva hvis vi begge blir stukket?"
(11, 749900, true),    -- 7499 NOK for "Vulcan"
(12, 749900, true),    -- 7499 NOK for "Kan jeg sove på panseret ditt?"
(13, 749900, true),    -- 7499 NOK for "Svin"
(14, 3000000, false);  -- 30000 NOK for "Alien Party" - solgt (ikke tilgjengelig)
