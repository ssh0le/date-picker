import { getDestructuredDate } from './getters';

export const areEqualDates = (
  date1: Date | null,
  date2: Date | null,
): boolean => {
  if (!date1 || !date2) return false;
  return (
    areEqualMonthAndYear(date1, date2) && date1.getDate() === date2.getDate()
  );
};

export const areEqualMonthAndYear = (date1: Date, date2: Date): boolean => {
  const [y1, m1] = getDestructuredDate(date1);
  const [y2, m2] = getDestructuredDate(date2);
  return y1 === y2 && m1 == m2;
};

export const isInRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

export const isWeekEnd = (date: Date) => {
  const dayIndex = date.getDay();
  return dayIndex === 0 || dayIndex == 6;
};
