import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Checkbox, Row, Col } from 'antd';
import type { CheckboxOptionType } from 'antd/es/checkbox/Group';
import { ErrorText } from '../Elements';

interface CheckboxGroupFieldProps {
  title?: string;
  label?: string; // Optional group label
  name: string;
  control: Control<any>;
  error?: string;
  options: CheckboxOptionType[]; // [{ label, value }]
  columns?: number; // for layout, optional
}

const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  title,
  label,
  name,
  control,
  error,
  options,
  columns = 3,
}) => (
  <div className="form-control">
    {title && <label>{title}</label>}
    {label && <div style={{ marginBottom: 8 }}>{label}</div>}

    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox.Group
          value={field.value || []}
          onChange={field.onChange}
          style={{ width: '100%' }}
        >
          <Row gutter={[8, 8]}>
            {options.map((option, idx) => (
              <Col key={option.value} span={24 / columns}>
                <Checkbox value={option.value}>{option.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}
    />
    {error && <ErrorText error={error} />}
  </div>
);

export default CheckboxGroupField;
