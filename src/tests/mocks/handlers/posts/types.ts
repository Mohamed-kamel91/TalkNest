import type { TopicName } from '@/types/api';

export type PostRequestDTO = {
  title: string;
  content: string;
  topic: TopicName;
};
