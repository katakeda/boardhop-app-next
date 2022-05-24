import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { OrderStatus } from '../../../types/common';
import { methodNotAllowed } from '../../../utils/backend/http';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? '', {
  // @ts-ignore
  apiVersion: null,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    default:
      return methodNotAllowed(req, res);
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    payment_intent: paymentIntentId,
    payment_intent_client_secret: paymentIntentClientSecret,
    redirect_status: redirectStatus,
  } = req.query;

  if (!paymentIntentId || !paymentIntentClientSecret || !redirectStatus) {
    // TODO: Set redirect url
    // Invalid request. Redirect somewhere
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId.toString()
  );
  if (!paymentIntent) {
    // TODO: Set redirect url
    // Something went wrong. Redirect somewhere
  }

  const status =
    paymentIntent.status === 'succeeded'
      ? OrderStatus.COMPLETE
      : paymentIntent.status === 'canceled'
      ? OrderStatus.CANCELED
      : OrderStatus.PENDING;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: paymentIntent.metadata.postId,
      // TODO: replace with customer
      userId: paymentIntent.customer ?? 'dde6cdb0-23d1-4657-a60d-2d04d4d6530c',
      paymentId: paymentIntent.id,
      status: status,
      // TODO: replace with real message
      message: 'Test Message',
      quantity: parseInt(paymentIntent.metadata.quantity),
      total: paymentIntent.amount,
    }),
  };
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/orders`,
    options
  );

  if (response.status >= 400) {
    // TODO: Set redirect url
    // Should we rollback our paymentIntent?
    // Redirect somewhere
    return res.redirect(req.url ?? '/')
  }

  const order = await response.json();

  res.redirect(`/user/receipts/${order.id}`);
};

export default handler;
