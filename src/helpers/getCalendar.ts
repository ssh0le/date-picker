import { CalendarViewType, WeekStartDay } from '@/interfaces/calendar';

import { getDestructuredDate } from './getDateYearAndMonth';
import { getDayOfWeekIndex } from './getWeekDayIndex';

const daysInWeek = 7;

export const getCalendar = (date: Date, weekStart: WeekStartDay, viewType: CalendarViewType): Date[] => {
    if (viewType === CalendarViewType.Month) {
        return getCalendarByMonth(date, weekStart);
    } else {
        return getCalendarByWeek(date, weekStart);
    }
};

const addDaysToDate = (date: Date, days: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
};

const getCalendarByMonth = (date: Date, weekStart: WeekStartDay): Date[] => {
    const calendar = [];
    const [year, month] = getDestructuredDate(date);
    const startOfMonth: Date = new Date(year, month, 1, 0, 0);
    const weekDayIndex = getDayOfWeekIndex(startOfMonth, weekStart);
    const begin: Date = addDaysToDate(startOfMonth, -weekDayIndex);
    const end: number = new Date(year, month + 1, 0).getDate() + weekDayIndex;
    for (let i = 0; i < end || i % daysInWeek !== 0; i++) {
        calendar.push(addDaysToDate(begin, i));
    }
    return calendar;
}

const getCalendarByWeek = (date: Date, weekStart: WeekStartDay): Date[] => {
    const week = [];
    const weekDayIndex = getDayOfWeekIndex(date, weekStart);
    const startOfWeek = addDaysToDate(date, -weekDayIndex);
    while(week.length < daysInWeek) {
        week.push(addDaysToDate(startOfWeek, week.length));
    }
    return week;
}
