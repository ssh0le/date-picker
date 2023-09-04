export const isWeekEnd = (date: Date) => {
    const dayIndex = date.getDay();
    return dayIndex === 0 || dayIndex == 6;
}