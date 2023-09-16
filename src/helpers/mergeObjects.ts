import { defaultStyles } from '@/constants';
import { CalendarStyles } from '@/types/calendar';

export function mergeObjects<T extends object>(object1: T, object2: T) {
  Object.assign(object1, object2);
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
