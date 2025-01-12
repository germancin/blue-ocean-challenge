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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      throw new Error('Email service not configured');
    }

    const { email, paymentId } = await req.json();
    console.log('Processing request for:', { email, paymentId });

    if (!email || !paymentId) {
      throw new Error('Email and paymentId are required');
    }

    // Check if payment exists
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (fetchError || !payment) {
      console.error('Error fetching payment:', fetchError);
      throw new Error('Payment not found');
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

    // Create user if doesn't exist
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) {
      console.error('Error listing users:', userError);
      throw new Error('Failed to check existing users');
    }

    const existingUser = users?.find(u => u.email === email);
    if (!existingUser) {
      console.log('Creating new user for:', email);
      const tempPassword = Math.random().toString(36).slice(-8);
      const { error: createError } = await supabase.auth.admin.createUser({
        email: email,
        password: tempPassword,
        email_confirm: true
      });

      if (createError) {
        console.error('Error creating user:', createError);
        throw new Error('Failed to create user account');
      }
    }

    // Generate password reset link
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${SUPABASE_URL}/profile?changePassword=true`
      }
    });

    if (linkError || !linkData?.properties?.action_link) {
      console.error('Error generating recovery link:', linkError);
      throw new Error('Failed to generate password reset link');
    }

    const recoveryLink = linkData.properties.action_link;
    console.log('Generated recovery link successfully');

    // Send email
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
      }),
    });

    const emailData = await emailRes.json();
    
    if (!emailRes.ok) {
      console.error('Resend API error:', emailData);
      throw new Error(`Failed to send email: ${JSON.stringify(emailData)}`);
    }

    // Update payment record
    const { error: updateError } = await supabase
      .from('payments')
      .update({ email_sent: true })
      .eq('id', paymentId);

    if (updateError) {
      console.error('Error updating email_sent status:', updateError);
      throw new Error('Failed to update email status');
    }

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in check-and-send-emails:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});