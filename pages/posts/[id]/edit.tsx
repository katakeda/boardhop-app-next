import type { ReactElement } from 'react';
import { DefaultLayout } from '../../../components/Common/DefaultLayout';
import { PostEdit } from '../../../components/PostEdit/PostEdit';
import type { NextPageWithLayout } from '../../../types/common';

const PostEditPage: NextPageWithLayout = () => {
  return (
    <PostEdit />
  );
}

PostEditPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default PostEditPage;