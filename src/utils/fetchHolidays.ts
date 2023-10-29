import { apiUrl } from '@/constants';
import { HolidayResponse } from '@/types/holidays';

import { Holiday } from '..';

export const fetchHolidays = async () => {
  try {
    const response = await fetch(apiUrl);
    const responseData: HolidayResponse = await response.json();
    const responseHolidays: Holiday[] = responseData.response.holidays.map(
      ({ name, date: { datetime } }) => {
        const { day, month } = datetime;
        return {
          day,
          month: month - 1,
          name,
        };
      },
    );
    return responseHolidays;
  } catch (error) {
    console.error(error);
    return null;
  }
};
