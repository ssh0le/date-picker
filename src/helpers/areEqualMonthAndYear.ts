import { getDestructuredDate } from './getDateYearAndMonth';

export const areEqualMonthAndYear = (date1: Date, date2: Date): boolean => {
    const [y1, m1] = getDestructuredDate(date1);
    const [y2, m2] = getDestructuredDate(date2);
    return y1 === y2 && m1 == m2;
};
