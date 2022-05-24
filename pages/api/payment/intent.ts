import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PaymentIntentItem } from '../../../types/common';
import { DEFAULT_CURRENCY } from '../../../utils/backend/constants';
import { methodNotAllowed } from '../../../utils/backend/http';
import { MAX_QUANTITY } from '../../../utils/constants';

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
    metadata: {
      postId: items[0].id,
      quantity: items[0].quantity,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const calculateTotal = (items: Array<PaymentIntentItem>): number => {
  return items.reduce((prev, curr) => {
    return prev + curr.price * Math.min(curr.quantity, MAX_QUANTITY);
  }, 0);
};

export default handler;
