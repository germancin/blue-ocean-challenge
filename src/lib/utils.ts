import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function triggerWebhook(url: string, payload: Record<string, any>): void {
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
		.then((response) => {
			// Optional: Handle any successful response if required
			console.log('Webhook triggered successfully:', response.status);
		})
		.catch((error) => {
			// Handle any errors encountered while sending the request
			console.error('Error triggering webhook:', error);
		});
}

export async function triggerWebhookAsync(url: string, payload: Record<string, any>): Promise<any> {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error(`Error triggering webhook: ${response.statusText}`);
		}

		// Parse and return the JSON response
		const data = await response.json();
		console.log('Webhook triggered successfully:', response.status);
		return data;
	} catch (error) {
		// Handle any errors encountered while sending the request
		console.error(error);
		// Optionally rethrow the error or handle it as needed
		throw error;
	}
}
