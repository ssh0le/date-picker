import { CalendarViewType, WeekStartDay } from '@/types/calendar';

import { addMonthsToDate } from './addToDate';
import { getDestructuredDate } from './getDateYearAndMonth';
import { getDayOfWeekIndex } from './getWeekDayIndex';

const daysInWeek = 7;

export const getCalendar = (date: Date, weekStart: WeekStartDay, viewType: CalendarViewType, minDate?: Date, maxDate?: Date): Date[] => {
    if (viewType === CalendarViewType.Month) {
        return getCalendarByMonth(date, weekStart);
    } else if (viewType === CalendarViewType.Week) {
        return getCalendarByWeek(date, weekStart);
    } else {
        return getCalendarByYear(date, minDate, maxDate);
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
    const startOfMonth: Date = new Date(year, month, 1, 0, 0, 0, 0);
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
    startOfWeek.setHours(0, 0, 0, 0);
    while (week.length < daysInWeek) {
        week.push(addDaysToDate(startOfWeek, week.length));
    }
    return week;
}

export const getCalendarByYear = (date: Date, minDate?: Date, maxDate?: Date): Date[] => {
    const year = date.getFullYear();
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const [minYear, minMonth] = minDate ? getDestructuredDate(minDate) : [year, 0];
    const [maxYear, maxMonth] = maxDate ? getDestructuredDate(maxDate) : [year, 11];
    const min = year === minYear ? minMonth : 0;
    const max = year === maxYear ? maxMonth : 11;
    const months = [];
    for (let i = min; i <= max; i++) {
        const nextDate = addMonthsToDate(start, i);
        months.push(nextDate);
    }
    return months;
}
