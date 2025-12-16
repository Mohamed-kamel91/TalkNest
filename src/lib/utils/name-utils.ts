const normalize = (value: string | undefined | null): string =>
  value?.trim() ?? '';

const capitalize = (value: string): string =>
  value ? value[0].toUpperCase() + value.slice(1).toLowerCase() : '';

export const getInitials = (first: string, last: string): string => {
  return [first, last]
    .map(normalize)
    .map((name) => name[0])
    .join('')
    .toUpperCase();
};

export const getFullName = (first: string, last: string): string => {
  return [first, last]
    .map(normalize)
    .filter(Boolean)
    .map(capitalize)
    .join(' ');
};
