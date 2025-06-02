// src/App.jsx
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(1000); // по умолчанию 10.00 USD
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) }),
      });
      const data = await res.json();
      const stripe = await (await import('@stripe/stripe-js')).loadStripe('pk_test_ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ');
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      alert('Ошибка при оплате');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Оплата через Stripe</h1>
      <label>
        Сумма (в центах):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="50"
          step="50"
          style={{ marginLeft: 10 }}
        />
      </label>
      <br /><br />
      <button onClick={handlePay} disabled={loading}>
        {loading ? 'Загрузка...' : `Оплатить $${(amount / 100).toFixed(2)}`}
      </button>
    </div>
  );
}

export default App;
