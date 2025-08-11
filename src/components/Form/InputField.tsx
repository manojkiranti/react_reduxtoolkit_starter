import { CSSProperties, FC, FocusEvent, ReactNode } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input, InputNumber, theme } from 'antd';
import { ErrorText } from '../Elements';
import FormLabel from './FormLabel';

const { useToken } = theme;

interface InputFieldProps {
  label?: string;
  type?: 'text' | 'number' | 'password';
  placeholder?: string;
  control: Control<any>;
  name: string;
  error?: string;
  readonly?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'borderless' | 'filled';
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  size?: 'large' | 'middle' | 'small';
  formDirection?: 'row' | 'column';
  required?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  visibilityToggle?: {
    visible: boolean;
    onVisibleChange: (visible: boolean) => void;
  };
  inputStyles?: CSSProperties;
  rootStyles?: CSSProperties;
  max?: number;
  onChange?: (value: any) => void;
}

const InputField: FC<InputFieldProps> = ({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  variant = 'outlined',
  readonly = false,
  disabled = false,
  error,
  prefix,
  suffix,
  size = 'middle',
  formDirection = 'column',
  required = false,
  onBlur,
  visibilityToggle,
  inputStyles={width:"100%"},
  rootStyles,
  max,
  onChange, 
}) => {
  const errorStatus = error ? 'error' : undefined;
  const { token } = useToken();
  return (
    <div className={`form-control ${formDirection}`} style={rootStyles}>
      {label && <FormLabel required={required} label={label} />}
      <div className="input-containter">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            if (type === 'password') {
              return (
                <Input.Password
                  {...field}
                  prefix={prefix}
                  suffix={suffix}
                  type={type}
                  readOnly={readonly}
                  variant={variant}
                  placeholder={placeholder}
                  status={errorStatus}
                  size={size}
                  disabled={disabled}
                  onBlur={onBlur}
                  visibilityToggle={visibilityToggle}
                />
              );
            } else if (type === 'number') {
              return (
                <InputNumber
                  {...field}
                  prefix={prefix}
                  suffix={suffix}
                  type={type}
                  readOnly={readonly}
                  variant={variant}
                  placeholder={placeholder}
                  status={errorStatus}
                  size={size}
                  disabled={disabled}
                  onBlur={onBlur}
                  style={inputStyles}
                  max={max}
                
                />
              );
            } else {
              return (
                <Input
                  {...field}
                  prefix={prefix}
                  suffix={suffix}
                  type={type}
                  readOnly={readonly}
                  variant={variant}
                  placeholder={placeholder}
                  status={errorStatus}
                  size={size}
                  disabled={disabled}
                  onBlur={onBlur}
                  style={inputStyles}
              
                />
              );
            }
          }}
        />
        {error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

export default InputField;
