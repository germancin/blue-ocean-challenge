import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TRON_API_URL = 'https://api.trongrid.io';
const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const MERCHANT_ADDRESS = Deno.env.get('MERCHANT_ADDRESS');

interface TronTransaction {
  transaction_id: string;
  from: string;
  to: string;
  amount: number;
  block_timestamp: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { email } = await req.json();
    console.log('Checking payment for email:', email);

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get pending payment for this email
    const { data: payment, error: fetchError } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('email', email)
      .eq('status', 'pending')
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    if (!payment) {
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    console.log('Found payment:', payment);

    // Check recent transactions to merchant address
    const response = await fetch(
      `${TRON_API_URL}/v1/accounts/${MERCHANT_ADDRESS}/transactions/trc20?limit=20&contract_address=${USDT_CONTRACT}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();
    const transactions: TronTransaction[] = data.data || [];

    // Look for a matching transaction (same amount)
    const matchingTx = transactions.find(tx => {
      const txAmount = Number(tx.amount) / 1_000_000; // Convert from TRC20 decimals
      return txAmount === payment.amount && 
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
        .eq('id', payment.id);

      if (updateError) {
        throw updateError;
      }

      return new Response(
        JSON.stringify({ status: 'success', transaction: matchingTx }),
        { 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ status: 'pending' }),
      { 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});