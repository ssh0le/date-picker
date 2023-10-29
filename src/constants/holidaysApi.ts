export const params = {
  year: '2023',
  country: 'by',
  api_key: process.env.HOLIDAY_API_KEY as string,
};
export const apiUrl = `${process.env.HOLIDAY_API_URL}${new URLSearchParams(
  params,
)}`;
