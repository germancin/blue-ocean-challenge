import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get all successful payments where email hasn't been sent
    const { data: payments, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'success')
      .eq('email_sent', false);

    if (fetchError) {
      console.error('Error fetching payments:', fetchError);
      throw fetchError;
    }

    console.log('Found payments requiring emails:', payments?.length);

    if (!payments || payments.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No pending emails to send' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = await Promise.all(payments.map(async (payment) => {
      try {
        // Send email via Resend
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Elite Trading Tournament <tournament@elitetraderhub.co>',
            to: [payment.email],
            subject: 'Payment Confirmation - Elite Trading Tournament',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb; margin-bottom: 24px;">🎉 Payment Confirmed!</h1>
                
                <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
                  Thank you for your payment of ${payment.amount} USDT. Your registration for the Elite Trading Tournament has been confirmed!
                </p>

                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
                  <h2 style="color: #1f2937; margin-bottom: 12px;">Transaction Details:</h2>
                  <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                    <li>Amount: ${payment.amount} USDT</li>
                    <li>Transaction Hash: ${payment.transaction_hash}</li>
                    <li>Date: ${new Date(payment.created_at).toLocaleDateString()}</li>
                  </ul>
                </div>

                <p style="font-size: 16px; line-height: 1.5; color: #374151;">
                  If you have any questions, feel free to reach out to our support team at support@elitetraderhub.co
                </p>

                <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
                  Best regards,<br>
                  The Elite Trading Tournament Team
                </p>
              </div>
            `
          })
        });

        if (!emailRes.ok) {
          throw new Error(`Failed to send email: ${await emailRes.text()}`);
        }

        // Update payment record to mark email as sent
        const { error: updateError } = await supabase
          .from('payments')
          .update({ email_sent: true })
          .eq('id', payment.id);

        if (updateError) {
          throw updateError;
        }

        console.log(`Successfully sent email for payment ${payment.id}`);
        return { success: true, paymentId: payment.id };

      } catch (error) {
        console.error(`Failed to process payment ${payment.id}:`, error);
        return { success: false, paymentId: payment.id, error: error.message };
      }
    }));

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
})