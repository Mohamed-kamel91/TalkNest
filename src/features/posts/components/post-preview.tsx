import {
  BookmarkIcon,
  MessageCircleIcon,
  ShareIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import { Link } from 'react-router';

import { UserAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/stack';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils/cn';
import {
  formatDateTime,
  formatPostPreviewDate,
} from '@/lib/utils/date-format';
import { getFullName } from '@/lib/utils/name-utils';
import { getTopic } from '@/lib/utils/topic-utils';

import type { Post } from '@/types/api';

type PostPreviewProps = React.ComponentProps<'article'> & {
  post: Post;
};

export const PostPreview = ({
  className,
  post,
  ...props
}: PostPreviewProps) => {
  if (!post.author) return null;

  const topic = getTopic(post.topic.name);

  return (
    <article
      className={cn(
        'relative max-w-2xl p-5',
        'hover:bg-accent cursor-pointer sm:rounded-3xl',
        'transition-colors',
        className,
      )}
      {...props}
    >
      <Link
        to={`/${post.author.slug}/${post.slug}`}
        className="wrap-break-word absolute inset-0 rounded-3xl"
      >
        <span className="opacity-0">{post.title}</span>
      </Link>

      {/* Avatar, name, topic and  time */}
      <Stack justify="between" align="center">
        <Stack align="center">
          <UserAvatar
            firstName={post.author.firstName}
            lastName={post.author.lastName}
            avatarUrl={post.author.avatarUrl}
          />
          <Stack
            direction="col"
            justify="center"
            className="relative gap-0"
          >
            <p className="truncate text-sm font-medium hover:underline">
              {getFullName(
                post.author.firstName,
                post.author.lastName,
              )}
            </p>
            <Stack
              align="center"
              className="text-muted-foreground gap-1 text-xs"
            >
              <Link
                to={paths.topic.getHref(post.topic.name)}
                className="whitespace-nowrap hover:underline"
              >
                {topic.label}
              </Link>
              <span>•</span>
              <time
                className="whitespace-nowrap"
                dateTime={new Date(post.createdAt).toISOString()}
                title={formatDateTime(post.createdAt)}
              >
                {formatPostPreviewDate(post.createdAt)}
              </time>
            </Stack>
          </Stack>
        </Stack>

        <div className="relative">
          <Button
            type="button"
            className="hover:bg-accent-elevated"
            variant="ghost"
            icon={<BookmarkIcon />}
            iconOnly
            aria-label="Bookmark post"
          />
        </div>
      </Stack>

      {/* title and body */}
      <div className="mt-5">
        <div className="relative">
          <h2
            className={cn(
              'text-xl font-bold md:text-2xl',
              'transition-colors hover:opacity-85',
            )}
          >
            <Link
              to={`/${post.author.slug}/${post.slug}`}
              className="block"
            >
              {post.title}
            </Link>
          </h2>
        </div>
        <p className="mt-1 line-clamp-3">{post.content}</p>
      </div>

      {/* like, comments, share, bookmark */}
      <Stack align="center" className="mt-5">
        <Button
          variant="elevated"
          size="sm"
          radius="circle"
          icon={<ThumbsUpIcon />}
        >
          55
        </Button>
        <Button
          variant="elevated"
          size="sm"
          radius="circle"
          icon={<MessageCircleIcon />}
        >
          21
        </Button>
        <Button
          variant="elevated"
          size="sm"
          radius="circle"
          icon={<ShareIcon />}
        >
          Share
        </Button>
      </Stack>
    </article>
  );
};
