import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { PostPayment } from '../../../components/PostPayment/PostPayment';
import type { NextPageWithLayout } from '../../../types/common';

const PostPaymentPage: NextPageWithLayout = () => {
  return <PostPayment />;
};

PostPaymentPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <DefaultLayout>{page}</DefaultLayout>
    </>
  );
};

export default PostPaymentPage;
