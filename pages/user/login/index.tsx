import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { Login } from '../../../components/User/Login';
import type { NextPageWithLayout } from '../../../types/common';

const IndexPage: NextPageWithLayout = () => {
  return (
    <Login />
  );
}

IndexPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default IndexPage;