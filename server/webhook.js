import Stripe from 'stripe';
import dotenv from 'dotenv';
import { updatePaymentStatus } from './db.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function webhookHandler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    updatePaymentStatus(session.id, 'paid');
  }

  res.json({ received: true });
}
