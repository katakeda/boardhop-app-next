import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../../types/common';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Posts } from '../../components/Posts/Posts';
import { PostsProvider } from '../../contexts/PostsContext';

const IndexPage: NextPageWithLayout = () => {
  return (
    <PostsProvider>
      <Posts />
    </PostsProvider>
  );
}

IndexPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default IndexPage;