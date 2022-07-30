import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DefaultLayout } from '../../../../components/Common/DefaultLayout';
import { DefaultLoading } from '../../../../components/Common/DefaultLoading';
import { PostEdit } from '../../../../components/PostEdit/PostEdit';
import { NextPageWithLayout, Post } from '../../../../types/common';
import { getPost } from '../../../../utils/frontend/posts';

const PostEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const { post, error } = await getPost(id);
      if (!error && post) {
        setPost(post);
      }
    })();
  }, [id]);

  if (!post) {
    return <DefaultLoading />;
  }

  return <PostEdit post={post} />;
};

PostEditPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default PostEditPage;
