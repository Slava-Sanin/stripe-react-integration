import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import { savePayment } from './db.js';
import webhookHandler from './webhook.js';

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = 4242;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Custom Payment' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    await savePayment(session);
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при создании сессии');
  }
});

// Webhook
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhookHandler);

app.listen(PORT, () => console.log(`🚀 Backend запущен на http://localhost:${PORT}`));
