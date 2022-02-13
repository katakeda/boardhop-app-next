import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { Dashboard } from '../../../components/User/Dashboard';
import type { NextPageWithLayout } from '../../../types/common';

const IndexPage: NextPageWithLayout = () => {
  return (
    <Dashboard />
  );
}

IndexPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default IndexPage;