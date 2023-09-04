export const getFormattedDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
    return formatter.format(new Date(date.getFullYear(), date.getMonth(), 1));
};
