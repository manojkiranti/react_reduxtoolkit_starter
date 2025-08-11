import { ReactNode } from 'react';
import { Typography, theme } from 'antd';
const { useToken } = theme;
type ValueProps = {
  children: ReactNode;
};
const Value = ({ children }: ValueProps) => {
  const { token } = useToken();
  return <Typography.Text>{children}</Typography.Text>;
};

export default Value;
