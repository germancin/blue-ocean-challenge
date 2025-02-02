import { useLocation, useNavigate } from 'react-router-dom';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ISubscriber {
  email: string;
  name?: string;
}

interface IPayment {
  id: string;
  email: string;
  amount: number;
  status: string;
  email_sent: boolean;
}

// ---- Helper Functions ---- //

async function fetchSubscriberAndPayment(subscriberId: string | null): Promise<{ subscriber: ISubscriber | null; payment: IPayment | null }> {
  if (!subscriberId) return { subscriber: null, payment: null };

  // 1) Fetch subscriber info
  const { data: subscriber, error: subscriberError } = await supabase.from('subscribers').select('email').eq('id', subscriberId).maybeSingle();

  if (subscriberError) {
    console.error('Error fetching subscriber details:', subscriberError);
    return { subscriber: null, payment: null };
  }

  // 2) Fetch payment info for subscriber
  if (subscriber) {
    const { data: payment, error: paymentError } = await supabase.from('payments').select('*').eq('email', subscriber.email).maybeSingle();

    if (paymentError) {
      console.error('Error fetching payment details:', paymentError);
      return { subscriber, payment: null };
    }
    return { subscriber, payment };
  }

  return { subscriber: null, payment: null };
}

async function fetchMerchantAddress(): Promise<string> {
  try {
    const {
      data: { MERCHANT_ADDRESS },
      error,
    } = await supabase.functions.invoke('get-merchant-address');
    if (error) {
      console.error('Error fetching merchant address:', error);
      return '';
    }
    return MERCHANT_ADDRESS || '';
  } catch (err) {
    console.error('Error in fetchMerchantAddress:', err);
    return '';
  }
}

async function handlePaymentEmailSending(payment: IPayment | null): Promise<void> {
  if (!payment || payment.email_sent) return;

  try {
    const { error: functionError } = await supabase.functions.invoke('check-and-send-emails', {
      body: {
        email: payment.email,
        paymentId: payment.id,
        amount: payment.amount,
      },
    });

    if (functionError) {
      console.error('Failed to send email:', functionError);
    }
  } catch (err) {
    console.error('Error in handlePaymentEmailSending:', err);
  }
}

async function fetchSubscriberByEmail(email: string): Promise<ISubscriber | null> {
  try {
    const { data: subscriber, error } = await supabase.from('subscribers').select('*').eq('email', email).maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return subscriber;
  } catch (error) {
    console.error('Error fetching subscriber:', error);
    return null;
  }
}

async function handlePaymentCheck(
  email: string,
  currentPaymentStatus: string,
  setCurrentPaymentStatus: (status: string) => void,
  navigate: (path: string, state?: any) => void
): Promise<void> {
  if (!email) return;

  try {
    // 1) If status is 'pending', check for existing pending payment
    if (currentPaymentStatus === 'pending') {
      const { data: existingPayment, error: fetchError } = await supabase.from('payments').select('*').eq('email', email).eq('status', 'pending').maybeSingle();

      if (fetchError) throw new Error(fetchError.message);

      if (existingPayment) {
        // Verify the payment via Supabase Function
        const { data: verification, error: functionError } = await supabase.functions.invoke('verify-payment', {
          body: {
            email,
            amount: existingPayment.amount,
            paymentId: existingPayment.id,
          },
        });

        console.log('payment verify:', verification);

        if (functionError) {
          throw new Error(functionError.message);
        }

        if (verification?.status === 'success') {
          await handlePaymentEmailSending(existingPayment);
          setCurrentPaymentStatus('success');
          const subscriber = await fetchSubscriberByEmail(email);

          navigate('/next-step', {
            state: {
              email,
              name: subscriber?.name,
            }
          });
          return;
        }
      }

      // 2) If there's no pending payment, check if there's one with status 'success'
      const { data: successfulPayment, error: successFetchError } = await supabase.from('payments').select('*').eq('email', email).eq('status', 'success').maybeSingle();

      if (successFetchError) throw new Error(successFetchError.message);

      if (successfulPayment) {
        await handlePaymentEmailSending(successfulPayment);
        setCurrentPaymentStatus('success');
        const subscriber = await fetchSubscriberByEmail(email);

        navigate('/next-step', {
          state: {
            email,
            name: subscriber?.name,
          }
        });
      }
    }
    // 3) If currentPaymentStatus is 'success', check to ensure email is sent
    else if (currentPaymentStatus === 'success') {
      const { data: successfulPayment, error: successFetchError } = await supabase.from('payments').select('*').eq('email', email).eq('status', 'success').maybeSingle();

      if (successFetchError) throw new Error(successFetchError.message);

      if (successfulPayment) {
        await handlePaymentEmailSending(successfulPayment);
        setCurrentPaymentStatus('success');
        const subscriber = await fetchSubscriberByEmail(email);

        navigate('/next-step', {
          state: {
            email,
            name: subscriber?.name,
          }
        });
      }
    }
  } catch (error) {
    console.error('Error handling payment check:', error);
  }
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const subscriberId = searchParams.get('sid');

  const [email, setEmail] = useState(location.state?.email || '');
  const [paymentAmount, setPaymentAmount] = useState<number | null>(location.state?.paymentAmount || null);
  const [merchantAddress, setMerchantAddress] = useState('');
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(location.state?.paymentStatus || 'pending');
  const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function initPaymentData() {
			console.log('Fetching payment details for subscriberId:', subscriberId);

			const { subscriber, payment } = await fetchSubscriberAndPayment(subscriberId);

			// Update local state
			if (payment) {
				setEmail(payment.email);
				setPaymentAmount(payment.amount);
				setCurrentPaymentStatus(payment.status || 'pending');
			}

			// If we have the data from the DB, we're not loading anymore.
			if (payment?.email && payment?.amount && payment?.status) {
				setLoading(false);
			}
		}

		initPaymentData();
	}, [subscriberId]);

	// 2) Fetch merchant address and check if we already have the needed data
	useEffect(() => {
		async function initMerchantData() {
			console.log('Fetching merchant address...');
			const address = await fetchMerchantAddress();
			setMerchantAddress(address);

			if (email && paymentAmount && currentPaymentStatus) {
				setLoading(false);
			}
		}

		initMerchantData();
	}, [currentPaymentStatus, email, paymentAmount]);

	// 3) Continuously check payment status every 30 seconds
	useEffect(() => {
		const intervalId = setInterval(() => {
			handlePaymentCheck(email, currentPaymentStatus, setCurrentPaymentStatus, navigate);
		}, 30000);

		// Cleanup on unmount
		return () => clearInterval(intervalId);
	}, [currentPaymentStatus, email, navigate]);

	// 4) If still loading, show a spinner
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
			</div>
		);
	}

    // 5) Render the UI
    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <PaymentInformationCard />
                    <PaymentDetailsCard amount={paymentAmount} email={email} />
                    <PaymentInstructionsCard amount={paymentAmount} merchantAddress={merchantAddress} transactionStatus={currentPaymentStatus} />
                </div>
            </div>
        </div>
    );
};

export default Payment;
