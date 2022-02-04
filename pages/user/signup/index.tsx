import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { Signup } from '../../../components/User/Signup';
import type { NextPageWithLayout } from '../../../types/common';

const IndexPage: NextPageWithLayout = () => {
  return (
    <Signup />
  );
}

IndexPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default IndexPage;