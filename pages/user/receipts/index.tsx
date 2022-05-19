import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { Receipts } from '../../../components/User/Receipts';
import type { NextPageWithLayout } from '../../../types/common';

const IndexPage: NextPageWithLayout = () => {
  return <Receipts />;
};

IndexPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default IndexPage;
