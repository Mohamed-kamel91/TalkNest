import {
  ClockPlusIcon,
  CircleArrowUpIcon,
  TrendingUpIcon,
  BriefcaseBusinessIcon,
  CpuIcon,
  Gamepad2Icon,
  HandCoinsIcon,
  HeartPulseIcon,
  PaletteIcon,
  PlaneIcon,
  RollerCoasterIcon,
  UtensilsIcon,
  VolleyballIcon,
} from 'lucide-react';

import { paths } from '@/config/paths';

export const SORT_OPTIONS = [
  {
    title: 'Latest',
    value: 'latest',
    to: paths.home.feed.latest.getHref(),
    icon: ClockPlusIcon,
  },
  {
    title: 'Top',
    value: 'top',
    to: paths.home.feed.top.getHref(),
    icon: CircleArrowUpIcon,
  },
  {
    title: 'Trending',
    value: 'trending',
    to: paths.home.feed.trending.getHref(),
    icon: TrendingUpIcon,
  },
] as const;

export const SORT_VALUES = SORT_OPTIONS.map((opt) => opt.value);

export const TOPICS = [
  {
    label: 'Technology',
    value: 'technology',
    to: paths.topic.getHref('technology'),
    icon: CpuIcon,
  },
  {
    label: 'Career',
    value: 'career',
    to: paths.topic.getHref('career'),
    icon: BriefcaseBusinessIcon,
  },
  {
    label: 'Gaming',
    value: 'gaming',
    to: paths.topic.getHref('gaming'),
    icon: Gamepad2Icon,
  },
  {
    label: 'Health & Fitness',
    value: 'health & fitness',
    to: paths.topic.getHref('health & fitness'),
    icon: HeartPulseIcon,
  },
  {
    value: 'travel',
    label: 'Travel',
    to: paths.topic.getHref('travel'),
    icon: PlaneIcon,
  },
  {
    label: 'Food & Cooking',
    value: 'food & cooking',
    to: paths.topic.getHref('food & cooking'),
    icon: UtensilsIcon,
  },
  {
    label: 'Entertainment',
    value: 'entertainment',
    to: paths.topic.getHref('entertainment'),
    icon: RollerCoasterIcon,
  },
  {
    label: 'Sports',
    value: 'sports',
    to: paths.topic.getHref('sports'),
    icon: VolleyballIcon,
  },
  {
    label: 'Art & Design',
    value: 'art & design',
    to: paths.topic.getHref('art & design'),
    icon: PaletteIcon,
  },
  {
    label: 'Finance',
    value: 'finance',
    to: paths.topic.getHref('finance'),
    icon: HandCoinsIcon,
  },
] as const;

export const TOPIC_VALUES = [
  '',
  ...TOPICS.map((t) => t.value),
] as const;

export const TOPIC_LABELS = TOPICS.map((t) => t.label);
