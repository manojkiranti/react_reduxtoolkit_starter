import { FC, ReactNode, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

interface PhoneInputFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
  required?: boolean;
  suffix?: string | ReactNode;
}

const PhoneInputField: FC<PhoneInputFieldProps> = ({
  label,
  control,
  name,
  error,
  required = false,
  suffix,
}) => {
  const [length, setLength] = useState<number>(0);
  const handlePhoneChange = (
    phone: string,
    meta: {
      country: {
        dialCode: string;
      };
    },
    onChange: (value: string) => void
  ) => {
    const digitsOnly = phone.replace(/\D/g, '');
    const dialCode = meta?.country?.dialCode || '';
    
    // Remove dial code from start if it exists
    let nationalNumber = digitsOnly;
    if (dialCode && digitsOnly.startsWith(dialCode)) {
      nationalNumber = digitsOnly.slice(dialCode.length);
    }

    setLength(nationalNumber.length);
    onChange(phone);
  };

  return (
    <div className="form-control">
      {label && <FormLabel required={required} label={label} />}
      <div className="input-container" style={{ position: 'relative' }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <PhoneInput
              className="custom-phone-input"
              defaultCountry="au"
              value={field.value || ''}
              // onChange={(phone) => field.onChange(phone)}
              onChange={(phone, meta) => handlePhoneChange(phone, meta, field.onChange)}
            />
          )}
        />
        {suffix && (
          <div
            className="suffix"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              translate: '-10% 25%',
            }}
          >
            {suffix}
          </div>
        )}
      </div>
      <div style={{ fontSize: '0.875rem', color: '#888', marginTop: '4px' }}>
        Length: {length} digit{length !== 1 ? 's' : ''}
      </div>
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default PhoneInputField;
