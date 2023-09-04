export const addMonthsToDate = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setMonth(date.getMonth() + months);
    return newDate;
};
