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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });

  try {
    // Get payments that need emails sent
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'success')
      .eq('email_sent', false);

    if (paymentsError) {
      throw paymentsError;
    }

    if (!payments || payments.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No pending emails' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    for (const payment of payments) {
      try {
        console.log('Processing payment:', payment.id, 'for email:', payment.email);

        // Create user if they don't exist
        const { data: { user }, error: createUserError } = await supabase.auth.admin.createUser({
          email: payment.email,
          email_confirm: true,
          password: crypto.randomUUID(),
        });

        if (createUserError && createUserError.message !== 'User already registered') {
          console.error('Error creating user:', createUserError);
          continue;
        }

        // Generate recovery link
        const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: payment.email,
          options: {
            redirectTo: `${PRODUCTION_URL}/profile`
          }
        });

        if (linkError) {
          console.error('Error generating recovery link:', linkError);
          continue;
        }

        const recoveryLink = linkData?.properties?.action_link;
        if (!recoveryLink) {
          console.error('No recovery link generated');
          continue;
        }

        // Send email with recovery link
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Elite Trading Tournament <tournament@elitetraderhub.co>',
            to: [payment.email],
            subject: 'Welcome to Elite Trading Tournament - Complete Your Registration',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #2563eb; margin-bottom: 24px;">🎉 Welcome to Elite Trading Tournament!</h1>
                
                <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
                  Thank you for your payment of ${payment.amount} USDT. Your registration for the Elite Trading Tournament has been confirmed!
                </p>

                <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
                  To complete your registration and set up your account, please click the secure link below:
                </p>

                <div style="text-align: center; margin: 32px 0;">
                  <a href="${recoveryLink}" 
                     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Set Your Password
                  </a>
                </div>

                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
                  <h2 style="color: #1f2937; margin-bottom: 12px;">Next Steps:</h2>
                  <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Click the link above to access your account</li>
                    <li style="margin-bottom: 8px;">Set up your secure password</li>
                    <li style="margin-bottom: 8px;">Join our trading community</li>
                    <li style="margin-bottom: 8px;">Prepare your trading strategy</li>
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
          const errorText = await emailRes.text();
          console.error('Failed to send email:', errorText);
          continue;
        }

        // Update payment record to mark email as sent
        const { error: updateError } = await supabase
          .from('payments')
          .update({ email_sent: true })
          .eq('id', payment.id);

        if (updateError) {
          console.error('Error updating payment:', updateError);
          continue;
        }

        console.log('Successfully processed payment:', payment.id);
      } catch (error) {
        console.error('Error processing payment:', payment.id, error);
        continue;
      }
    }

    return new Response(
      JSON.stringify({ message: 'Processed payments successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in check-and-send-emails:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});