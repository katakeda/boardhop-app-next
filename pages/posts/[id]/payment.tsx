import { ReactElement, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { DefaultLoading } from '../../../components/Common/DefaultLoading';
import { PostPayment } from '../../../components/PostPayment/PostPayment';
import type {
  NextPageWithLayout,
  PaymentIntentItem,
  Post,
} from '../../../types/common';
import { getPost } from '../../../utils/posts';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ''
);

const PostPaymentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const { id, quantity } = router.query;

  useEffect(() => {
    if (post) {
      const quant = typeof quantity === 'string' ? parseInt(quantity) : 1;
      const items: Array<PaymentIntentItem> = [
        { id: post.id, price: post.price, quantity: quant },
      ];
      (async () => {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        };
        const response = await fetch('/api/payment/intent', options);
        const data = await response.json();
        setClientSecret(data.clientSecret);
      })();
    }
  }, [post, quantity]);

  useEffect(() => {
    (async () => {
      const { post, error } = await getPost(id);
      if (!error && post) {
        setPost(post);
      }
    })();
  }, [id]);

  if (!clientSecret || !post) {
    return <DefaultLoading />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PostPayment post={post} clientSecret={clientSecret} />
    </Elements>
  );
};

PostPaymentPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <DefaultLayout>{page}</DefaultLayout>
    </>
  );
};

export default PostPaymentPage;
