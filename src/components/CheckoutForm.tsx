"use client"
import React from 'react';
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = React.useState(null);

  React.useEffect(() => {
    if (stripe && elements) {
      fetch('/api/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 100 }),
      })
        .then(res => res.json())
        .then(data => {
          const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
              label: 'Demo total',
              amount: 10000,
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });

          pr.canMakePayment().then(result => {
            if (result) {
              // @ts-expect-error - A known issue with the Stripe library
              setPaymentRequest(pr);
            }
          });
        });
    }
  }, [stripe, elements]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{paymentRequest}} />;
  }

  return <div>Google Pay not available</div>;
};

export default CheckoutForm;
