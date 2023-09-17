import { dateFormat } from '@/constants';

export const convertToDate = (date: string): Date | null => {
  const matches = date.match(dateFormat);
  if (!matches || !matches.length) return null;
  const [day, month, year] = matches[0]
    .match(/[0-9]{1,4}/g)!
    .slice()
    .map((number) => Number(number));
  if (day === 0 || month === 0) return null;
  if (!isValidDate(day, month - 1, year)) return null;
  return new Date(year, month - 1, day, 0, 0);
};

const isValidDate = (day: number, month: number, year: number) => {
  const date = new Date(year, month, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month &&
    date.getFullYear() === year
  );
};
