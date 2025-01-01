import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    const COINGATE_API_KEY = Deno.env.get('COINGATE_API_KEY');
    if (!COINGATE_API_KEY) {
      throw new Error('COINGATE_API_KEY is not set');
    }

    // Create order with Coingate
    const response = await fetch('https://api.coingate.com/v2/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${COINGATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_id: crypto.randomUUID(),
        price_amount: 99.99, // Your product price
        price_currency: 'USD',
        receive_currency: 'USD',
        title: 'Trading Course Subscription',
        callback_url: `${req.headers.get('origin')}/api/coingate-webhook`,
        cancel_url: `${req.headers.get('origin')}/`,
        success_url: `${req.headers.get('origin')}/success`,
        purchaser_email: email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create Coingate order');
    }

    const order = await response.json();

    return new Response(
      JSON.stringify({ url: order.payment_url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});