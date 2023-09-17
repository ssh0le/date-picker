import { defaultStyles } from '@/constants';
import { CalendarStyles } from '@/types/calendar';

export function mergeObjects<T>(...objects: T[]): T {
  if (!objects.length) return {} as T;
  return objects.reduce((acc, cur) => ({ ...acc, ...cur }));
}

export const mergeWithDefaultStyles = (
  styles: CalendarStyles | undefined,
): Required<CalendarStyles> => {
  if (!styles) return defaultStyles;
  const mergedStyles = JSON.parse(JSON.stringify(defaultStyles));
  Object.keys(styles).forEach((key) => {
    if (styles[key]) {
      mergedStyles[key] = { ...styles[key] };
    }
  });
  return mergedStyles;
};
