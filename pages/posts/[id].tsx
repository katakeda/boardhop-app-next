import type { ReactElement } from 'react';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { PostDetail } from '../../components/Posts/PostDetail';
import type { NextPageWithLayout } from '../../types/common';

const PostDetailPage: NextPageWithLayout = () => {
  return (
    <PostDetail />
  );
}

PostDetailPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default PostDetailPage;