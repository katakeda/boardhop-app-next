import type { NextApiRequest, NextApiResponse } from 'next';
import { methodNotAllowed } from '../../../utils/backend/http';
import Stripe from 'stripe';
import {
  DEFAULT_CURRENCY,
  TRANSACTION_RATE,
} from '../../../utils/backend/constants';
import { PaymentIntentItem } from '../../../types/common';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? '', {
  // @ts-ignore
  apiVersion: null,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return methodNotAllowed(req, res);
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { items }: { items: Array<PaymentIntentItem> } = req.body;
  const total = calculateTotal(items);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: DEFAULT_CURRENCY,
    // application_fee_amount: TRANSACTION_RATE * total,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const calculateTotal = (items: Array<PaymentIntentItem>): number => {
  return items.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);
};

export default handler;
