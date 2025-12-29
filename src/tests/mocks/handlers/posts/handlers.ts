import { http, HttpResponse } from 'msw';

import { postsPaths } from './constants';
import { db } from '../../db';
import { networkDelay, sanitizeUser } from '../../utils';

type PostFindManyOptions = Parameters<typeof db.post.findMany>[0];
type PostOrderBy = PostFindManyOptions['orderBy'];
type SortByLabels = keyof typeof SORT_BY;

const POSTS_PER_PAGE = 10;
export const SORT_BY = {
  top: 'Top',
  trending: 'Trending',
  latest: 'Latest',
};

const ORDER_BY: Record<keyof typeof SORT_BY, PostOrderBy> = {
  latest: { createdAt: 'desc' },
  top: { createdAt: 'asc' },
  trending: { createdAt: 'asc' },
};

const getPosts = http.get(postsPaths.posts, async ({ request }) => {
  await networkDelay();

  try {
    const url = new URL(request.url);
    const sort =
      (url.searchParams.get('sort') as SortByLabels) || 'latest';
    const page = Number(url.searchParams.get('page') || 1);

    const postCount = db.post.count();
    const totalPages = Math.ceil(postCount / POSTS_PER_PAGE);

    const posts = db.post
      .findMany({
        take: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * (page - 1),
        orderBy: ORDER_BY[sort] || { createdAt: 'asc' },
      })
      .map(({ authorId, ...post }) => {
        const author = db.user.findFirst({
          where: {
            id: {
              equals: authorId,
            },
          },
        });

        return {
          ...post,
          author: author ? sanitizeUser(author) : null,
        };
      });

    return HttpResponse.json(
      {
        data: posts,
        meta: {
          page,
          total: postCount,
          totalPages,
          hasNext: page < totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    return HttpResponse.json(
      { message: error?.message || 'Server Error' },
      { status: error?.statusCode || 500 },
    );
  }
});

export const postHandlers = [getPosts];
