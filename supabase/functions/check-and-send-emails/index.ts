import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log the raw request for debugging
    console.log('Incoming request:', {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries())
    });

    const body = await req.json();
    const { email, paymentId } = body;

    console.log('Processing request for:', { email, paymentId });

    // Validate required fields
    if (!email || !paymentId) {
      console.error('Missing required fields:', { email, paymentId });
      return new Response(
        JSON.stringify({ error: 'Email and paymentId are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate RESEND_API_KEY
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured - RESEND_API_KEY missing' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get payment details
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (fetchError) {
      console.error('Error fetching payment:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Payment not found' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if email was already sent
    if (payment.email_sent) {
      console.log('Email already sent for payment:', paymentId);
      return new Response(
        JSON.stringify({ message: 'Email already sent', success: true }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    try {
      console.log('Attempting to send email via Resend');
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
              <h1 style="color: #2563eb; margin-bottom: 24px;">Payment Confirmed!</h1>
              <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
                Thank you for your payment of ${payment.amount} USDT. Your registration for the Elite Trading Tournament has been confirmed!
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #374151;">
                If you have any questions, feel free to reach out to our support team.
              </p>
            </div>
          `
        }),
      });

      const emailData = await emailRes.json();
      console.log('Resend API response:', emailData);
      
      if (!emailRes.ok) {
        console.error('Resend API error:', emailData);
        return new Response(
          JSON.stringify({ error: 'Failed to send email', details: emailData }),
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
        .eq('id', paymentId);

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
        JSON.stringify({ success: true, emailId: emailData.id }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );

    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailError.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});