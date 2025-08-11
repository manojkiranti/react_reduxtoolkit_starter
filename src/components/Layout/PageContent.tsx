import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { title } from 'process';
import React, { FC } from 'react';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { retry } from '@reduxjs/toolkit/query';
import { Link } from 'react-router-dom';
const defaultItems = [
  {
    href: '/dashboard',
    title: <HomeOutlined />,
  },
]

interface ContainerWrapperProps {
  children: React.ReactNode;
  breacrumbItems?: BreadcrumbItemType[];
};


const PageContent:FC<ContainerWrapperProps> = ({ children, breacrumbItems }) => {
  const updatedBreacrumbItems: BreadcrumbItemType[] = [
    ...defaultItems,
   ...(breacrumbItems || []),
  ]
  return (
    <>
      <div style={{padding:"1rem 0"}}>
        {/* <Breadcrumb items={updatedBreacrumbItems} /> */}
        <Breadcrumb>
          {updatedBreacrumbItems.map((item, index) => (
            <Breadcrumb.Item key={index}>
              <Link to={item.href as string}>{item.title}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      {children}
    </>
  );
};

export default PageContent;
