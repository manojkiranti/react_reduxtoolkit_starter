import DashboardCard from '../components/DashboardCard';
import { useFetchAdminDashboardDataQuery } from '../apis/dashboardApi';
import {
  BankFilled,
  DollarCircleFilled,
  ShopOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Skeleton } from 'antd';
import { useMemo } from 'react';
import { PageContent } from '@/components/Layout';
const DASHBOARD_DATA = [
  {
    id: 'purchase_application',
    title: 'Purchase Requests',
    data: {},
    icon: <ShopOutlined style={{ fontSize: '50px' }} />,
    link: '/application/broker/purchase',
  },
  {
    id: 'refinance_application',
    title: 'Refinance Requests',
    data: {},
    icon: <BankFilled style={{ fontSize: '50px' }} />,
    link: '/application/broker/refinance',
  },
  // {
  //   id: 'tax_application_count',
  //   title: 'Tax Requests',
  //   data: {},
  //   icon: <DollarCircleFilled style={{ fontSize: '50px' }} />,
  //   link: '/tax',
  // },
];

const Dashboard = () => {
  const { data: fetchedDashboardData, isLoading: dashboardDataLoading } =
    useFetchAdminDashboardDataQuery();

  const dashboardData = useMemo(() => {
    return DASHBOARD_DATA.map((data) => ({
      ...data,
      data: fetchedDashboardData?.data?.[data.id] || {},
    }));
  }, [fetchedDashboardData]);

  return (
    <>
      <PageContent
        breacrumbItems={[{ href: '/dashboard', title: 'Dashboard' }]}
      >
        <Row gutter={[32, 32]}>
          {dashboardDataLoading
            ? DASHBOARD_DATA.map((data) => (
                <Col sm={24} lg={12} xl={8} key={data.id}>
                  <Card>
                    <Skeleton active />
                  </Card>
                </Col>
              ))
            : dashboardData.map((data) => (
                <Col sm={24} lg={12} xl={8} key={data.id}>
                  <DashboardCard
                    id={data.id}
                    data={data.data}
                    title={data.title}
                    icon={data.icon}
                    link={data.link}
                  />
                </Col>
              ))}
        </Row>
      </PageContent>
    </>
  );
};

export default Dashboard;
