import { message } from 'antd';
export const displayError = (error: any): void => {
  console.log('Raw error:', error?.data?.error);

  const errorData = error?.data?.error;

  // Case 1: error is a string
  if (typeof errorData === 'string') {
    message.error(errorData);
    return;
  }

  // Case 2: nested error.error is a string (Django format)
  if (typeof errorData?.error === 'string') {
    message.error(errorData.error);
    return;
  }

  // Case 3: NestJS format: error.errors is an object with key-message pairs
  if (
    errorData?.errors &&
    typeof errorData.errors === 'object' &&
    !Array.isArray(errorData.errors)
  ) {
    Object.entries(errorData.errors).forEach(([key, val]) => {
      message.error(`${key} - ${val}`);
    });
    return;
  }

  // Case 4: Django-style validation map like { phone: ["msg"] }
  const isValidationMap =
    errorData &&
    typeof errorData === 'object' &&
    Object.values(errorData).every(
      (val) => Array.isArray(val) || typeof val === 'string'
    );

  if (isValidationMap) {
    Object.entries(errorData).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        message.error(`${key} - ${val.join(', ')}`);
      } else {
        message.error(`${key} - ${val}`);
      }
    });
    return;
  }

  // Case 5: Deep structure with "details"
  if (
    errorData?.details &&
    typeof errorData.details === 'object'
  ) {
    Object.entries(errorData.details).forEach(([key, val]) => {
      if (
        typeof val === 'object' &&
        val !== null &&
        !Array.isArray(val)
      ) {
        Object.entries(val).forEach(([subKey, messages]) => {
          if (Array.isArray(messages)) {
            message.error(`${key}.${subKey} - ${messages.join(', ')}`);
          } else {
            message.error(`${key}.${subKey} - ${messages}`);
          }
        });
      } else if (Array.isArray(val)) {
        message.error(`${key} - ${val.join(', ')}`);
      } else {
        message.error(`${key} - ${val}`);
      }
    });
    return;
  }

  // Case 6: error.message exists
  if (typeof errorData?.message === 'string') {
    message.error(errorData.message);
    return;
  }

  // Final fallback
  message.error('An unexpected error occurred');
};

export const displaySuccess = (successMsg: any = 'Successfull'): void => {
  message.success(successMsg);
};

export const displayWarning = (warningMsg: any = 'Warning'): void => {
  message.warning(warningMsg);
};
export const displayInfo = (infoMsg: any = 'Info'): void => {
  message.info(infoMsg);
};
export const displayErrorText = (errorMsg: any = 'Error'): void => {
  message.error(errorMsg);
};
