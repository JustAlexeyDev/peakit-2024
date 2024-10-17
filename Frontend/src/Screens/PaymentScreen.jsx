import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import "./Styles/PaymentScreen.css";

const stripePromise = loadStripe('pk_test_your_public_key');

const PaymentScreen = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Получите токен от Stripe
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Отправьте paymentMethod.id на ваш сервер для обработки платежа
    const response = await fetch('http://your-backend-url/process-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        amount: totalPrice * 100, // Stripe ожидает сумму в центах
      }),
    });

    const result = await response.json();

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Платеж успешно обработан
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="payment-screen">
      <h2>Оплата</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Обработка...' : `Оплатить ${totalPrice} ₽`}
        </button>
      </form>
    </div>
  );
};

const PaymentScreenWrapper = ({ totalPrice }) => (
  <Elements stripe={stripePromise}>
    <PaymentScreen totalPrice={totalPrice} />
  </Elements>
);

export default PaymentScreenWrapper;