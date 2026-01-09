import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isThisYear,
  format,
} from 'date-fns';

export const formatPostPreviewDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  // Less than 1 hour
  if (hours < 1) {
    return minutes < 1 ? 'now' : `${minutes}m ago`;
  }

  // Less than 24 hours
  if (hours < 24) {
    return `${hours}h ago`;
  }

  // Less than 31 days
  if (days < 30) {
    return `${days}d ago`;
  }

  // Same year
  if (isThisYear(date)) {
    return format(date, 'MMM d');
  }

  return format(date, 'MMM d, yyyy');
};

export const formatDateTime = (
  date: Date | string | number,
  pattern: string = "EEEE, MMMM d, yyyy 'at' h:mm:ss a",
): string => {
  return format(new Date(date), pattern);
};
