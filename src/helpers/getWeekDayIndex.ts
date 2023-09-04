import { WeekStartDay } from '@/interfaces/calendar';

const daysInWeek = 7;

export const getWeekDayIndex = (date: Date, weekStartDay: WeekStartDay): number => {
    const index = date.getDay() - weekStartDay;
    if (index < 0) {
        return daysInWeek + index;
    } else {
        return index;
    }
};
