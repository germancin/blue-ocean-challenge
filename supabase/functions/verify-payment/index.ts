import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TRON_API_URL = 'https://api.trongrid.io';
const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const MERCHANT_ADDRESS = Deno.env.get('MERCHANT_ADDRESS');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, amount, paymentId } = await req.json();
    
    if (!email || !amount || !paymentId) {
      console.error('Missing required parameters:', { email, amount, paymentId });
      return new Response(
        JSON.stringify({ 
          status: 'error',
          message: 'Missing required parameters' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Starting payment verification for:', {
      email,
      amount: amount.toFixed(3),
      paymentId,
      merchantAddress: MERCHANT_ADDRESS
    });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get payment record
    const { data: payment, error: fetchError } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching payment:', fetchError);
      return new Response(
        JSON.stringify({ 
          status: 'error',
          message: 'Error fetching payment details' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    if (!payment) {
      console.log('No payment found with ID:', paymentId);
      return new Response(
        JSON.stringify({ 
          status: 'error',
          message: 'No payment found' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }

    if (payment.status !== 'pending') {
      console.log('Payment status is not pending:', payment.status);
      return new Response(
        JSON.stringify({ status: payment.status }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    console.log('Found pending payment:', payment);

    // Check recent transactions to merchant address
    const response = await fetch(
      `${TRON_API_URL}/v1/accounts/${MERCHANT_ADDRESS}/transactions/trc20?limit=20&contract_address=${USDT_CONTRACT}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Error fetching transactions:', await response.text());
      return new Response(
        JSON.stringify({ 
          status: 'error',
          message: 'Failed to fetch transactions' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    const data = await response.json();
    console.log('Fetched transactions:', data);

    const transactions = data.data || [];
    const expectedAmount = Number(amount.toFixed(3));
    
    // Look for a matching transaction with exact amount
    const matchingTx = transactions.find(tx => {
      // Convert from USDT's smallest unit (6 decimals) to actual USDT amount
      const txAmountRaw = Number(tx.value) / 1_000_000;
      // Format to 3 decimal places for comparison
      const txAmount = Number(txAmountRaw.toFixed(3));
      
      console.log('Comparing transaction:', {
        txHash: tx.transaction_id,
        rawValue: tx.value,
        txAmountRaw,
        txAmount,
        expectedAmount,
        matches: txAmount === expectedAmount,
        addressMatch: tx.to.toLowerCase() === MERCHANT_ADDRESS?.toLowerCase()
      });
      
      return txAmount === expectedAmount && 
             tx.to.toLowerCase() === MERCHANT_ADDRESS?.toLowerCase();
    });

    if (matchingTx) {
      console.log('Found matching transaction:', matchingTx);
      
      // Update payment status to success
      const { error: updateError } = await supabaseClient
        .from('payments')
        .update({ 
          status: 'success',
          transaction_hash: matchingTx.transaction_id,
        })
        .eq('id', paymentId);

      if (updateError) {
        console.error('Error updating payment:', updateError);
        return new Response(
          JSON.stringify({ 
            status: 'error',
            message: 'Error updating payment status' 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          status: 'success', 
          transaction: matchingTx
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    console.log('No matching transaction found, payment still pending');
    return new Response(
      JSON.stringify({ status: 'pending' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in verify-payment function:', error);
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});