import { getDestructuredDate } from './getters';

export const areEqualDates = (
  date1: Date | null,
  date2: Date | null,
): boolean => {
  if (!date1 || !date2) return false;
  return getOnlyDate(date1) === getOnlyDate(date2);
};

export const areEqualMonthAndYear = (date1: Date, date2: Date): boolean => {
  const [y1, m1] = getDestructuredDate(date1);
  const [y2, m2] = getDestructuredDate(date2);
  return y1 === y2 && m1 == m2;
};

export const isInRange = (date: Date, start?: Date, end?: Date): boolean => {
  const strDate = getOnlyDate(date);
  if (start && end) {
    return strDate >= getOnlyDate(start) && strDate <= getOnlyDate(end);
  } else if (start && !end) {
    return strDate >= getOnlyDate(start);
  } else if (!start && end) {
    return strDate <= getOnlyDate(end);
  } else {
    return true;
  }
};

export const isToday = (date: Date): boolean => {
  return areEqualDates(new Date(), date);
};

export const isWeekEnd = (date: Date) => {
  const dayIndex = date.getDay();
  return [0, 6].includes(dayIndex);
};

const getOnlyDate = (date: Date): string => {
  const dateCopy = new Date(date);
  dateCopy.setHours(0, 0, 0, 0);
  return dateCopy.toJSON().split('T')[0];
};
