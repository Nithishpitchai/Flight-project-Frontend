import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');  // Replace with your real key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded yet. Please try again in a moment.');
      return;
    }

    setLoading(true);

    try {
      // Backend should create the payment intent securely
      const { data } = await axios.post('/api/payment', { amount: 5000 }); // Amount in cents ($50)

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(`❌ Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('✅ Payment successful!');
      }
    } catch (error) {
      toast.error(`Server Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border rounded-lg">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full p-3 rounded-lg text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Processing...' : 'Pay $100000'}
        </button>
      </form>
    </div>
  );
}

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
