"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51Riz6y00qKyA2T0dd68LGSo8b6w1HxzQYIvZVSqdFweF24itIymgxi863aq5j86Li4Di7MVib9iLWPIcBeJNMem800cIpE69FP');

export default function Home() {
  return (
    <div>
      <h1>Google Pay</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
