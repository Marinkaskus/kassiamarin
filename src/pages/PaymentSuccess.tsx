
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });

      if (error) throw error;
      
      if (data?.status === 'paid') {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setVerificationStatus('error');
    }
  };

  return (
    <Layout>
      <div className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  {verificationStatus === 'success' ? (
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  ) : verificationStatus === 'loading' ? (
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500 text-2xl">✗</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  {verificationStatus === 'success' 
                    ? 'Takk for ditt kjøp!' 
                    : verificationStatus === 'loading'
                    ? 'Bekrefter betaling...'
                    : 'Betalingsfeil'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationStatus === 'success' && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Din bestilling har blitt bekreftet. Du vil motta en e-post med detaljer om leveringen.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Bestillings-ID: {sessionId}
                    </p>
                  </div>
                )}
                
                {verificationStatus === 'error' && (
                  <p className="text-muted-foreground">
                    Det oppstod en feil under bekreftelsen av betalingen. Kontakt oss hvis du har betalt og ikke mottar en bekreftelse.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button asChild variant="outline">
                    <Link to="/gallery">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Tilbake til galleri
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/">
                      <Home className="h-4 w-4 mr-2" />
                      Til forsiden
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
