import { defaultStyles } from '@/constants';
import { CalendarStyles } from '@/interfaces/calendar';

export const mergeWithDefaultStyles = (
    styles: CalendarStyles | undefined,
): Required<CalendarStyles> => {
    if (!styles) return defaultStyles;
    const mergedStyles = JSON.parse(JSON.stringify(defaultStyles));
    Object.keys(styles).forEach((key) => {
        mergedStyles[key] = { ...mergedStyles[key], ...styles[key] };
    });
    return mergedStyles;
};
