export const getShortFormattedDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(new Date(date.getFullYear(), date.getMonth(), 1));
};

export const getLongFormattedDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
  return formatter.format(date);
};

export const getMonthShortName = (date: Date) => {
  return date.toLocaleString('en-US', { month: 'short' });
};
