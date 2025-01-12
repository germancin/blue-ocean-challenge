import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const PRODUCTION_URL = 'https://elitetraderhub.co';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    console.log('Processing email for:', email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get the successful payment
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('email', email)
      .eq('status', 'success')
      .single();

    if (fetchError) {
      console.error('Error fetching payment:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Error fetching payment details' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!payment) {
      return new Response(
        JSON.stringify({ message: 'No payment found' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Send email via Resend
    console.log('Sending email to:', email);
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Elite Trading Tournament <tournament@elitetraderhub.co>',
        to: [email],
        subject: 'Payment Confirmation - Elite Trading Tournament',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; margin-bottom: 24px;">🎉 Payment Confirmed!</h1>
            
            <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
              Thank you for your payment of ${payment.amount} USDT. Your registration for the Elite Trading Tournament has been confirmed!
            </p>

            <p style="font-size: 16px; line-height: 1.5; color: #374151;">
              If you have any questions, feel free to reach out to our support team at support@elitetraderhub.co
            </p>

            <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
              Best regards,<br>
              The Elite Trading Tournament Team
            </p>
          </div>
        `
      }),
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error('Failed to send email:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Mark email as sent
    const { error: updateError } = await supabase
      .from('payments')
      .update({ email_sent: true })
      .eq('id', payment.id);

    if (updateError) {
      console.error('Error updating email_sent status:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update email status' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in check-and-send-emails function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});