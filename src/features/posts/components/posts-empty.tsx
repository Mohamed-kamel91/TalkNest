import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

export const PostsEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No posts yet</EmptyTitle>
        <EmptyDescription>
          Be the first to share something with the community
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
