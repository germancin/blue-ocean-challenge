import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const PRODUCTION_URL = 'https://elitetraderhub.co';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
	email: string;
	amount: number;
}

serve(async (req) => {
	if (req.method === 'OPTIONS') {
		return new Response(null, { headers: corsHeaders });
	}

	try {
		const { email, amount } = (await req.json()) as EmailRequest;
		console.log('Sending confirmation email to:', email, 'for amount:', amount);

		if (!RESEND_API_KEY) {
			throw new Error('RESEND_API_KEY is not configured');
		}

		const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
				detectSessionInUrl: false,
			},
		});

		// Generate recovery link - now we use type: 'recovery' to ensure we get a proper token
		// const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
		//   type: 'recovery',
		//   email: email,
		//   options: {
		//     // The token will be automatically appended to this URL by Supabase
		//     redirectTo: `${PRODUCTION_URL}/profile`
		//   }
		// });

		// if (linkError) {
		//   console.error('Error generating recovery link:', linkError);
		//   throw linkError;
		// }

		// const recoveryLink = linkData?.properties?.action_link;
		// if (!recoveryLink) {
		//   throw new Error('Failed to generate recovery link');
		// }

		// console.log('Generated recovery link:', recoveryLink);

		const emailRes = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'Elite Trading Tournament <tournament@elitetraderhub.co>',
				to: [email],
				subject: 'Welcome to Elite Trading Tournament - Complete Your Registration',
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; margin-bottom: 24px;">🎉 Welcome to Elite Trading Tournament!</h1>

            <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
              Thank you for your payment of ${amount} USDT. Your registration for the Elite Trading Tournament has been confirmed!
            </p>

            <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-bottom: 16px;">
              To complete your registration and set up your account, please click the secure link below:
            </p>

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
        `,
			}),
		});

		if (!emailRes.ok) {
			const errorText = await emailRes.text();
			console.error('Failed to send email:::', errorText);
			throw new Error(`Failed to send email: ${errorText}`);
		}

		const data = await emailRes.json();
		console.log('Email sent successfully:', data);

		return new Response(JSON.stringify(data), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 200,
		});
	} catch (error) {
		console.error('Error sending confirmation email:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
		});
	}
});