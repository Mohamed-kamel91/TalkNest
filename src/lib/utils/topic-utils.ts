import { TOPICS } from '@/features/posts/constants';

import type { TopicName } from '@/types/api';

export const getTopic = (topic: TopicName) =>
  TOPICS.find((t) => t.value === topic) as (typeof TOPICS)[number];
