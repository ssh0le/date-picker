export const getDateYearAndMonth = (date: Date): [number, number] => {
    return [date.getFullYear(), date.getMonth()];
};
