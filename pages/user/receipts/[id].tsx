import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { ReceiptDetail } from '../../../components/User/ReceiptDetail';
import type { NextPageWithLayout } from '../../../types/common';

const ReceiptDetailPage: NextPageWithLayout = () => {
  return <ReceiptDetail />;
};

ReceiptDetailPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ReceiptDetailPage;
