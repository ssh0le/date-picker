import { weekDays } from '@/constants';
import { WeekStartDay } from '@/interfaces/calendar';

export const getWeekDays = (startDay: WeekStartDay) => {
    const weekDaysCopy = weekDays.slice();
    if (startDay === WeekStartDay.Monday) {
        weekDaysCopy.push(weekDaysCopy.shift()!);
        return weekDaysCopy;
    } 
    return weekDaysCopy;
};
