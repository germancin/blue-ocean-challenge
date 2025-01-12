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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log the raw request body for debugging
    const rawBody = await req.text();
    console.log('Raw request body:', rawBody);

    // Parse the JSON body
    let email, paymentId;
    try {
      const body = JSON.parse(rawBody);
      email = body.email;
      paymentId = body.paymentId;
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Processing email request for:', { email, paymentId });

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

    // Verify RESEND_API_KEY is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get the payment details
    console.log('Fetching payment details for:', { email, paymentId });
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .eq('email', email)
      .single();

    if (fetchError) {
      console.error('Error fetching payment:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Error fetching payment details', details: fetchError }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!payment) {
      console.error('No payment found:', { email, paymentId });
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

    // Send email via Resend
    console.log('Sending confirmation email to:', email);
    try {
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

      const emailData = await emailRes.json();
      console.log('Resend API response:', emailData);

      if (!emailRes.ok) {
        console.error('Failed to send email:', emailData);
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
        .eq('id', paymentId)
        .eq('email', email);

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

      console.log('Email sent and status updated successfully');
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
    console.error('Unexpected error in check-and-send-emails function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});