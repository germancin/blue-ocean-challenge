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
    console.log('Starting check-and-send-emails function');
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Double-check to get only payments that need emails
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
        console.log('Processing payment:', payment.id);

        // Extra safety check to ensure email hasn't been sent
        const { data: currentPayment } = await supabase
          .from('payments')
          .select('email_sent')
          .eq('id', payment.id)
          .single();

        if (currentPayment?.email_sent) {
          console.log('Email already sent for payment:', payment.id);
          return { success: true, paymentId: payment.id, skipped: true };
        }

        // Check if user exists and create if not
        const { data: { users }, error: userError } = await supabase.auth
          .admin.listUsers();
        
        const existingUser = users.find(u => u.email === payment.email);

        if (userError) {
          console.error('Error checking user:', userError);
          throw userError;
        }

        if (!existingUser) {
          console.log('Creating new user for:', payment.email);
          const tempPassword = crypto.randomUUID();
          const { error: createError } = await supabase.auth
            .admin.createUser({
              email: payment.email,
              password: tempPassword,
              email_confirm: true
            });

          if (createError) {
            console.error('Error creating user:', createError);
            throw createError;
          }
        }

        // Generate recovery link
        console.log('Generating recovery link for:', payment.email);
        const { data, error: linkError } = await supabase.auth
          .admin.generateLink({
            type: 'recovery',
            email: payment.email,
            options: {
              redirectTo: `${req.headers.get('origin')}/profile?changePassword=true`
            }
          });

        if (linkError) {
          console.error('Error generating recovery link:', linkError);
          throw linkError;
        }

        const recoveryLink = data?.properties?.action_link;
        if (!recoveryLink) {
          throw new Error('Failed to generate recovery link');
        }

        // Update payment record to mark email as sent BEFORE sending email
        // This prevents duplicate emails if the email sending fails
        const { error: updateError } = await supabase
          .from('payments')
          .update({ email_sent: true })
          .eq('id', payment.id);

        if (updateError) {
          console.error('Error updating payment:', updateError);
          throw updateError;
        }

        // Send email via Resend
        console.log('Sending email to:', payment.email);
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

                <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
                  To complete your registration and set up your account, please click the secure link below:
                </p>

                <div style="text-align: center; margin: 32px 0;">
                  <a href="${recoveryLink}" 
                     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Set Your Password
                  </a>
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
          throw new Error(`Failed to send email: ${errorText}`);
        }

        console.log('Email sent successfully for payment:', payment.id);
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