const apiKey = process.env.HOLIDAYS_KEY as string;
export const params = {
  year: '2023',
  country: 'by',
  api_key: apiKey,
};
export const apiUrl = `https://calendarific.com/api/v2/holidays?${new URLSearchParams(
  params,
)}`;
