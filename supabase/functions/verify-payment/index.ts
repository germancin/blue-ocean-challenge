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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, amount, paymentId } = await req.json();
    
    if (!email || !amount || !paymentId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Checking payment for email:', email, 'amount:', amount);

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get pending payment
    const { data: payment, error: fetchError } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .eq('status', 'pending')
      .single();

    if (fetchError) {
      console.error('Error fetching payment:', fetchError);
      if (fetchError.code === 'PGRST116') {
        return new Response(
          JSON.stringify({ status: 'no_payment_found' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
      throw fetchError;
    }

    // Verify email and amount match to prevent unauthorized access
    if (payment.email !== email || payment.amount !== amount) {
      console.error('Email or amount mismatch for payment ID:', paymentId);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
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
      throw new Error('Failed to fetch transactions');
    }

    const data = await response.json();
    console.log('Fetched transactions:', data);

    const transactions = data.data || [];
    
    // Look for a matching transaction with exact amount
    const matchingTx = transactions.find(tx => {
      const txAmount = Number(tx.value) / 1_000_000; // Convert from TRC20 decimals
      
      console.log('Comparing transaction:', {
        txAmount,
        paymentAmount: payment.amount,
        txTo: tx.to.toLowerCase(),
        merchantAddress: MERCHANT_ADDRESS?.toLowerCase()
      });
      
      // Match only by amount and recipient address
      return Math.abs(txAmount - payment.amount) < 0.01 && // Allow for small rounding differences
             tx.to.toLowerCase() === MERCHANT_ADDRESS?.toLowerCase();
    });

    if (matchingTx) {
      console.log('Found matching transaction:', matchingTx);

      // Get block confirmation count
      const latestBlockResponse = await fetch(`${TRON_API_URL}/wallet/getnowblock`);
      const latestBlockData = await latestBlockResponse.json();
      const currentBlock = latestBlockData.block_header.raw_data.number;
      const txBlock = matchingTx.block;
      const blocksConfirmed = currentBlock - txBlock;
      
      // If we have enough confirmations (e.g., 19 blocks), mark as success
      if (blocksConfirmed >= 19) {
        // Update payment status to success
        const { error: updateError } = await supabaseClient
          .from('payments')
          .update({ 
            status: 'success',
            transaction_hash: matchingTx.transaction_id,
          })
          .eq('id', paymentId)
          .eq('status', 'pending');

        if (updateError) {
          console.error('Error updating payment:', updateError);
          throw updateError;
        }

        return new Response(
          JSON.stringify({ 
            status: 'success', 
            transaction: matchingTx,
            blocksConfirmed 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }

      // If not enough confirmations, return pending with block count
      return new Response(
        JSON.stringify({ 
          status: 'pending', 
          blocksConfirmed 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    console.log('No matching transaction found');
    return new Response(
      JSON.stringify({ status: 'pending', blocksConfirmed: 0 }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});