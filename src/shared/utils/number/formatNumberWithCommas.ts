export const formatNumberWithCommas = (value: number | undefined | null): string => {
  if (value === null || value === undefined || isNaN(value)) return '';
  return value.toLocaleString('en-US'); // Formats like 1,500,000
};