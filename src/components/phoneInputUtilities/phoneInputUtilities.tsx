// Phone input formatting utilities for Uzbekistan numbers

/**
 * Formats phone number for display with proper spacing
 * Input: "998901234567" or "901234567"
 * Output: "+998 (90) 123-45-67"
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // If starts with 998, use it; otherwise add 998
  let phoneDigits = digits;
  if (!digits.startsWith('998') && digits.length > 0) {
    phoneDigits = '998' + digits;
  }

  // Remove extra 998 if user typed it twice
  if (phoneDigits.startsWith('998998')) {
    phoneDigits = phoneDigits.substring(3);
  }

  // Limit to 12 digits total (998 + 9 local digits)
  phoneDigits = phoneDigits.substring(0, 12);

  // Format: +998 (XX) XXX-XX-XX
  if (phoneDigits.length >= 3) {
    let formatted = '+998';

    if (phoneDigits.length > 3) {
      const localNumber = phoneDigits.substring(3);

      if (localNumber.length >= 1) {
        if (localNumber.length === 1) {
          formatted += ` (${localNumber}`;
        } else if (localNumber.length === 2) {
          formatted += ` (${localNumber})`;
        } else if (localNumber.length <= 5) {
          formatted += ` (${localNumber.substring(0, 2)}) ${localNumber.substring(2)}`;
        } else if (localNumber.length <= 7) {
          formatted += ` (${localNumber.substring(0, 2)}) ${localNumber.substring(
            2,
            5,
          )}-${localNumber.substring(5)}`;
        } else {
          // Full format: +998 (90) 123-45-67
          formatted += ` (${localNumber.substring(0, 2)}) ${localNumber.substring(
            2,
            5,
          )}-${localNumber.substring(5, 7)}-${localNumber.substring(7, 9)}`;
        }
      }
    }

    return formatted;
  }

  return '+998';
};

/**
 * Extracts clean phone number for API calls
 * Input: "+998 (90) 123-45-67"
 * Output: "998901234567"
 */
export const cleanPhoneNumber = (formattedPhone: string): string => {
  return formattedPhone.replace(/\D/g, '');
};

/**
 * Validates Uzbekistan phone number
 * Must be 9 digits after country code 998
 */
export const validateUzbekPhoneNumber = (phone: string): boolean => {
  const cleaned = cleanPhoneNumber(phone);

  // Must start with 998 and have exactly 12 digits total
  if (!cleaned.startsWith('998') || cleaned.length !== 12) {
    return false;
  }

  // Local number must be 9 digits and start with valid operator codes
  const localNumber = cleaned.substring(3);
  const validOperatorCodes = [
    '90',
    '91',
    '93',
    '94',
    '95',
    '97',
    '98',
    '99',
    '88',
    '77',
    '71',
    '74',
    '75',
    '78',
    '79',
    '33',
  ];

  return validOperatorCodes.some((code) => localNumber.startsWith(code));
};

/**
 * Handles phone input change with formatting
 */
export const handlePhoneInputChange = (
  value: string,
  setter: (value: string) => void,
  errorSetter?: (error: boolean) => void,
) => {
  const formatted = formatPhoneNumber(value);
  setter(formatted);

  if (errorSetter) {
    errorSetter(false);
  }
};

/**
 * Gets cursor position after formatting
 */
export const getCursorPosition = (
  oldValue: string,
  newValue: string,
  oldCursor: number,
): number => {
  const oldClean = oldValue.replace(/\D/g, '');
  const newClean = newValue.replace(/\D/g, '');

  if (newClean.length > oldClean.length) {
    // Added digit
    return newValue.length;
  } else if (newClean.length < oldClean.length) {
    // Removed digit
    return Math.max(5, oldCursor - 1); // Don't go before +998
  }

  return oldCursor;
};
