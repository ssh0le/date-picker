import { WeekStartDay } from '@/types/calendar';

const daysInWeek = 7;

export const getDayOfWeekIndex = (date: Date, weekStartDay: WeekStartDay): number => {
    const index = date.getDay() - weekStartDay;
    if (index < 0) {
        return daysInWeek + index;
    } else {
        return index;
    }
};
