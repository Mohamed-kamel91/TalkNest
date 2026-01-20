import { ContentLayout } from '@/components/layouts';
import { CreatePost } from '@/features/posts/components/create-post';

export const NewPost = () => {
  return (
    <ContentLayout title="Create Post" size="2xl" className="mx-auto">
      <CreatePost />
    </ContentLayout>
  );
};
