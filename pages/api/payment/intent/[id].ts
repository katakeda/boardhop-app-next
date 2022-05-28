import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { methodNotAllowed } from '../../../../utils/backend/http';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY ?? '', {
  // @ts-ignore
  apiVersion: null,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatch(req, res);
    default:
      return methodNotAllowed(req, res);
  }
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !req.query.id ||
    req.query.id === '' ||
    typeof req.query.id !== 'string'
  ) {
    return res.status(400).send('Bad request');
  }

  const paymentIntent = await stripe.paymentIntents.update(req.query.id, {
    metadata: {
      message: req.body.message,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export default handler;
