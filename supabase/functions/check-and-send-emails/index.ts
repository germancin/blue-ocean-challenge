import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
	'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const HOST = 'https://elitetraderhub.co';

serve(async (req) => {
	console.log('Got into check-and-send-emails function');

	if (req.method === 'OPTIONS') {
		return new Response(null, { headers: corsHeaders });
	}

	try {
		if (!Deno.env.get('RESEND_API_KEY')) {
			throw new Error('Email service not configured');
		}

		const { email, paymentId, amount } = await req.json();
		console.log('Processing request for:', { email, paymentId, amount });

		if (!email || !paymentId) {
			throw new Error('Email and paymentId are required');
		}

		const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

		// First check if email was already sent
		const { data: payment, error: fetchError } = await supabase.from('payments').select('email_sent').eq('id', paymentId).single();

		if (fetchError) {
			console.error('Error fetching payment3:', fetchError);
			throw new Error('Payment not found');
		}

		console.log('Payment data:', payment);

		if (payment.email_sent) {
			console.log('Email was already sent for payment:', paymentId);
			return new Response(JSON.stringify({ message: 'Email already sent', success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
		}

		// Generate a temporary password
		const temporaryPassword = crypto.randomUUID();
		console.log('Creating user if not exists:', email);

		// Create the user with the temporary password
		const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
			email: email,
			email_confirm: true,
			password: temporaryPassword,
		});

		if (createUserError && createUserError.message !== 'User already registered') {
			console.log('This user was alredy registered:');
		}

		// Send welcome email with password setup link via Resend
		const emailRes = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
			},
			body: JSON.stringify({
				from: 'Elite Trading Tournament <tournament@elitetraderhub.co>',
				to: [email],
				subject: 'Welcome to Elite Trading Tournament - Set Up Your Password',
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; margin-bottom: 24px;">🎉 Welcome to Elite Trading Tournament!</h1>

            <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
              Thank you for your payment of ${amount} USDT. Your registration for the Elite Trading Tournament has been confirmed!
            </p>

            <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
              To access your account, please click the secure link below to set up your password:
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="https://elitetraderhub.co" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Reset Your Password
              </a>
            </div>

            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <h2 style="color: #1f2937; margin-bottom: 12px;">Next Steps:</h2>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Click the link above and reset your password</li>
                <li style="margin-bottom: 8px;">Access the tournament</li>
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
        `,
			}),
		});

		// Update payment record to mark email as sent
		const { error: updateError } = await supabase.from('payments').update({ email_sent: true }).eq('id', paymentId);

		if (updateError) {
			console.error('Error updating email_sent status:', updateError);
			throw new Error('Failed to update email status');
		}

		console.log('Payment record updated successfully');

		const { data: linkData, error } = await supabase.auth.admin.generateLink({
			type: 'magiclink',
			email,
			options: { redirectTo: `${HOST}/chart?isFirstTime=true` },
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Welcome email sent successfully',
				link: linkData.properties.action_link, // Return the temporary password so we can use it to sign in the user
			}),
			{
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			},
		);
	} catch (error) {
		console.error('Error in check-and-send-emails:', error);
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error occurred',
			}),
			{
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			},
		);
	}
});
