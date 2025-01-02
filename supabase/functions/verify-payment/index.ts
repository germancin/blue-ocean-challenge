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
      console.error('Missing required parameters:', { email, amount, paymentId });
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Checking payment for:', {
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
      throw fetchError;
    }

    if (!payment) {
      console.log('No payment found with ID:', paymentId);
      return new Response(
        JSON.stringify({ status: 'no_payment_found' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
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
      throw new Error('Failed to fetch transactions');
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
      // Get block confirmation count
      const latestBlockResponse = await fetch(`${TRON_API_URL}/wallet/getnowblock`);
      const latestBlockData = await latestBlockResponse.json();
      const currentBlock = latestBlockData.block_header.raw_data.number;
      const txBlock = matchingTx.block;
      const blocksConfirmed = currentBlock - txBlock;
      
      console.log('Transaction found with confirmations:', {
        currentBlock,
        txBlock,
        blocksConfirmed,
        transactionId: matchingTx.transaction_id
      });

      // If we have enough confirmations (e.g., 19 blocks), mark as success
      if (blocksConfirmed >= 19) {
        const { error: updateError } = await supabaseClient
          .from('payments')
          .update({ 
            status: 'success',
            transaction_hash: matchingTx.transaction_id,
          })
          .eq('id', paymentId);

        if (updateError) {
          console.error('Error updating payment:', updateError);
          throw updateError;
        }

        console.log('Payment marked as success');
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
      console.log('Payment still pending, waiting for confirmations');
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

    console.log('No matching transaction found, payment still pending');
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