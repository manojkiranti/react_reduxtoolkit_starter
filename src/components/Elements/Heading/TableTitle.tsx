import { Typography } from 'antd';
import React from 'react';

interface TableTitleProps {
  children: React.ReactNode | string;
}

const TableTitle: React.FC<TableTitleProps> = ({ children }) => {
  return (
    <Typography.Title
      level={5}
      style={{
        fontSize: '0.9rem',
        margin: '0rem',
      }}
    >
      {children}
    </Typography.Title>
  );
};

export default TableTitle;
