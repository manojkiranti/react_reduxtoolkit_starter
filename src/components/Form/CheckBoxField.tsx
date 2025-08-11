import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Checkbox } from 'antd';
import { ErrorText } from '../Elements';

interface CheckboxFieldProps {
  title?: string;
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
   onChange?: (checked: boolean, name: string) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  title,
  label,
  control,
  name,
  error,
  onChange
}) => {
  return (
    <div className="form-control">
      {title && <label>{title}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={(e) => {
               const checked = e.target.checked;
               field.onChange(checked);
               onChange?.(checked, field.name);
            }}
          >
            {label}
          </Checkbox>
        )}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default CheckboxField;
