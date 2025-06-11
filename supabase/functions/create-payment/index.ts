
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  artworkId: number;
  buyerEmail?: string;
  buyerName?: string;
  shippingAddress?: any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Payment request started");
    
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    // Create Supabase client for reading artwork prices
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Service role client for writing orders
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { artworkId, buyerEmail, buyerName, shippingAddress }: PaymentRequest = await req.json();
    console.log("Payment request for artwork:", artworkId);

    // Get artwork price
    const { data: priceData, error: priceError } = await supabaseClient
      .from("artwork_prices")
      .select("*")
      .eq("artwork_id", artworkId)
      .eq("available", true)
      .single();

    if (priceError || !priceData) {
      throw new Error("Artwork not found or not available for purchase");
    }

    console.log("Found artwork price:", priceData.price);

    // Get user if authenticated
    let userId = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData } = await supabaseClient.auth.getUser(token);
      userId = userData.user?.id;
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: { 
              name: `Kunstverk ID: ${artworkId}`,
              description: "Original kunstwerk av Kassia Marin"
            },
            unit_amount: priceData.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/gallery`,
      customer_email: buyerEmail,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["NO", "SE", "DK", "FI", "DE", "NL", "GB", "FR"],
      },
    });

    // Create order record
    const { error: orderError } = await supabaseService
      .from("orders")
      .insert({
        user_id: userId,
        artwork_id: artworkId,
        stripe_session_id: session.id,
        amount: priceData.price,
        currency: "nok",
        status: "pending",
        buyer_email: buyerEmail,
        buyer_name: buyerName,
        shipping_address: shippingAddress,
      });

    if (orderError) {
      console.error("Error creating order:", orderError);
    }

    console.log("Payment session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
