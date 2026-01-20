export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: { sort: string }) =>
    [...postKeys.lists(), filters] as const,
};
