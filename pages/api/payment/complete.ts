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
    return res.redirect(req.url ?? '/');
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId.toString()
  );
  if (!paymentIntent) {
    // TODO: Set redirect url
    // Something went wrong. Redirect somewhere
    return res.redirect(req.url ?? '/');
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
      Authorization: `Bearer ${req.cookies.boardhop_auth}`,
    },
    body: JSON.stringify({
      postId: paymentIntent.metadata.postId,
      paymentId: paymentIntent.id,
      status: status,
      quantity: parseInt(paymentIntent.metadata.quantity),
      total: paymentIntent.amount,
      message: paymentIntent.metadata.message,
      startDate: paymentIntent.metadata.startDate,
      endDate: paymentIntent.metadata.endDate,
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
    return res.redirect(req.url ?? '/');
  }

  const order = await response.json();

  res.redirect(`/user/receipts/${order.id}`);
};

export default handler;
