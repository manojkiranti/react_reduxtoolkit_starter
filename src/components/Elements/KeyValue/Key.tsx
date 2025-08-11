import { ReactNode } from 'react';
import { Typography, theme } from 'antd';
const { useToken } = theme;
type KeyProps = {
  children: ReactNode;
};
const Key = ({ children }: KeyProps) => {
  const { token } = useToken();
  return <Typography.Text style={{ color: token.colorTextLabel, fontSize:"13px" }}>{children}</Typography.Text>;
};

export default Key;
