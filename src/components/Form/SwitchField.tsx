import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Switch } from 'antd';
import { ErrorText } from '../Elements';

interface SwitchFieldProps {
  label?: string;
  control: Control<any>;
  name: string;
  error?: string;
  size?: 'default' | 'small';
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  control,
  name,
  error,
  size = 'default'
}) => {
  return (
    <div className="form-control">
      {label && <label style={{marginRight:"3px"}}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Switch size={size} checked={value} onChange={onChange} ref={ref} />
        )}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};

export default SwitchField;
