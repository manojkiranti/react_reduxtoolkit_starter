export const sanitizePhoneNumber = (input: string): string => {
  if (!input) return '';

  // Keep + if it starts the string, remove everything else that's not a digit
  return input
    .replace(/[^\d+]/g, '')     // Remove non-digits and non-+
    .replace(/(?!^)\+/g, '');   // Remove all "+" except at the beginning
};