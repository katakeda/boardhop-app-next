import type { ReactElement } from 'react';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { NewPost } from '../../components/Posts/NewPost';
import type { NextPageWithLayout } from '../../types/common';

const NewPostPage: NextPageWithLayout = () => {
  return (
    <NewPost />
  );
}

NewPostPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout>{page}</DefaultLayout>
  );
}

export default NewPostPage;