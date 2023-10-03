export const params = {
  year: '2023',
  country: 'by',
  api_key: 'i0TsCn64UwyLgwtm5el4m7FefJCsItxc',
};
export const apiUrl = `https://calendarific.com/api/v2/holidays?${new URLSearchParams(
  params,
)}`;
