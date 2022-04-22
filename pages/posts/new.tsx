import type { ReactElement } from 'react';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { PostNew } from '../../components/PostNew/PostNew';
import type { NextPageWithLayout } from '../../types/common';

const NewPostPage: NextPageWithLayout = () => {
  return (
    <PostNew />
  );
}

NewPostPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default NewPostPage;