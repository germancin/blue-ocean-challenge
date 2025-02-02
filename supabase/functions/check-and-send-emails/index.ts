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

		const { email, paymentId, amount, i18n } = await req.json();
		console.log('Processing request for:', { email, paymentId, amount, i18n });

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

		// Generate a temporary password...
		// const temporaryPassword = crypto.randomUUID();
		// console.log('Creating user if not exists:', email);

		// Create the user with the temporary password
		// const { data: userData, error: createUserError } = await supabase.auth.admin.createUser({
		// 	email: email,
		// 	email_confirm: true,
		// 	password: temporaryPassword,
		// });

		// if (createUserError && createUserError.message !== 'User already registered') {
		// 	console.log('This user was alredy registered:');
		// }

		// Send welcome email with password setup link via Resend...
		const payload = {
			emailTo: email,
			amount: amount,
			payment: payment,
			i18n,
		};

		fetch('https://n8n.elitetraderhub.co/webhook/payment-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				// Optional: Handle any successful response if required
				console.log('Webhook triggered successfully APyment Email:', response.status);
			})
			.catch((error) => {
				// Handle any errors encountered while sending the request
				console.error('Error triggering webhook Payment Email:', error);
			});

		// Update payment record to mark email as sent
		const { error: updateError } = await supabase.from('payments').update({ email_sent: true }).eq('id', paymentId);

		if (updateError) {
			console.error('Error updating email_sent status:', updateError);
			throw new Error('Failed to update email status');
		}

		console.log('Payment record updated successfully');

		// const { data: linkData, error } = await supabase.auth.admin.generateLink({
		// 	type: 'magiclink',
		// 	email,
		// 	options: { redirectTo: `${HOST}/chart?isFirstTime=true` },
		// });

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Welcome email sent successfully',
				//link: linkData.properties.action_link, // Return the temporary password so we can use it to sign in the user
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
