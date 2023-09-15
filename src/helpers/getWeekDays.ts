import { weekDays } from '@/constants';
import { CalendarViewType, WeekStartDay } from '@/types/calendar';

export const getWeekDays = (startDay: WeekStartDay, viewType: CalendarViewType) => {
    if (viewType === CalendarViewType.Year) {
        return [];
    }
    const weekDaysCopy = weekDays.slice();
    if (startDay === WeekStartDay.Monday) {
        weekDaysCopy.push(weekDaysCopy.shift()!);
        return weekDaysCopy;
    }
    return weekDaysCopy;
};
