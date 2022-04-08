import type { ReactElement } from 'react';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { PostsSearch } from '../../components/PostsSearch/PostsSearch';
import { PostsProvider } from '../../contexts/PostsContext';
import type { NextPageWithLayout } from '../../types/common';

const IndexPage: NextPageWithLayout = () => {
  return (
    <PostsProvider>
      <PostsSearch />
    </PostsProvider>
  );
}

IndexPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default IndexPage;