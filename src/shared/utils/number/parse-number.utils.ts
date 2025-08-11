export const parseNumber = (input: string): number => {
  if (!input) {
    return 0;
  }

  const cleaned = input.replace(/,/g, "");
  const num = Number(cleaned);
  if (isNaN(num)) {
    throw new Error("Invalid number format");
  }
  return num;
};