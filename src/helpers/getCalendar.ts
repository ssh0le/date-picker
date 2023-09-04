import { WeekStartDay } from '@/interfaces/calendar';

import { getDateYearAndMonth } from './getDateYearAndMonth';
import { getWeekDayIndex } from './getWeekDayIndex';

const daysInWeek = 7;

export const getCalendar = (date: Date, weekStart: WeekStartDay): Date[] => {
    const calendar = [];
    console.log('calendar');
    const [year, month] = getDateYearAndMonth(date);
    const startOfMonth: Date = new Date(year, month, 1, 0, 0);
    const weekDayIndex = getWeekDayIndex(startOfMonth, weekStart);
    const begin: Date = addDaysToDate(startOfMonth, -weekDayIndex);
    const end: number = new Date(year, month + 1, 0).getDate() + weekDayIndex;
    for (let i = 0; i < end || i % daysInWeek !== 0; i++) {
        calendar.push(addDaysToDate(begin, i));
    }
    return calendar;
};

const addDaysToDate = (date: Date, days: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
};
