import { areEqualMonthAndYear } from "./areEqualMonthAndYear"

export const areEqualDates = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false
    return areEqualMonthAndYear(date1, date2) && date1.getDate() === date2.getDate();
}