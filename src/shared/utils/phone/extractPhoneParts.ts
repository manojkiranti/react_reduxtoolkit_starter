import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

export interface ParsedPhone {
  areaCode: string;
  nationalNumber: string;
  fullNumber: string;
  isValid: boolean;
  country?: string;
}

export const extractPhoneParts = (phone: string): ParsedPhone => {
  const parsed = parsePhoneNumberFromString(phone);

  if (!parsed) {
    return {
      areaCode: '',
      nationalNumber: '',
      fullNumber: phone,
      isValid: false,
    };
  }

  return {
    areaCode: `+${parsed.countryCallingCode}`,
    nationalNumber: parsed.nationalNumber,
    fullNumber: parsed.number,
    isValid: parsed.isValid(),
    country: parsed.country,
  };
};
