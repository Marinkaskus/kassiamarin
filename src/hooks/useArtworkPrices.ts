
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ArtworkPrice {
  id: string;
  artwork_id: number;
  price: number;
  currency: string;
  available: boolean;
}

export const useArtworkPrices = () => {
  return useQuery({
    queryKey: ['artwork-prices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artwork_prices')
        .select('*')
        .order('artwork_id');
      
      if (error) throw error;
      return data as ArtworkPrice[];
    },
  });
};

export const useArtworkPrice = (artworkId: number) => {
  return useQuery({
    queryKey: ['artwork-price', artworkId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artwork_prices')
        .select('*')
        .eq('artwork_id', artworkId)
        .single();
      
      if (error) throw error;
      return data as ArtworkPrice;
    },
  });
};
