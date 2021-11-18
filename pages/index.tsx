import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../types/common';
import { DefaultLayout } from '../components/Common/DefaultLayout';
import { Home } from '../components/Home/Home';

const IndexPage: NextPageWithLayout = () => {
  return (
    <Home />
  )
}

IndexPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  )
}

export default IndexPage;