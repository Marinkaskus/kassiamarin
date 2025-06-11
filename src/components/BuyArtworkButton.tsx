
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useArtworkPrice } from '@/hooks/useArtworkPrices';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2 } from 'lucide-react';

interface BuyArtworkButtonProps {
  artworkId: number;
  artworkTitle: string;
}

const BuyArtworkButton: React.FC<BuyArtworkButtonProps> = ({ artworkId, artworkTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: priceData, isLoading: priceLoading } = useArtworkPrice(artworkId);

  const handlePurchase = async () => {
    if (!priceData?.available) {
      toast({
        title: "Ikke tilgjengelig",
        description: "Dette kunstverket er ikke tilgjengelig for kjøp.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          artworkId,
          buyerEmail: null, // Will be collected in Stripe checkout
          buyerName: null,
          shippingAddress: null
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Betalingsfeil",
        description: "Kunne ikke starte betalingsprosessen. Prøv igjen.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (priceLoading) {
    return (
      <Button disabled variant="outline" size="sm">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Laster...
      </Button>
    );
  }

  if (!priceData) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
    }).format(price / 100);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        Pris: {formatPrice(priceData.price)}
      </div>
      <Button 
        onClick={handlePurchase}
        disabled={!priceData.available || isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Behandler...
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {priceData.available ? 'Kjøp nå' : 'Solgt'}
          </>
        )}
      </Button>
    </div>
  );
};

export default BuyArtworkButton;
