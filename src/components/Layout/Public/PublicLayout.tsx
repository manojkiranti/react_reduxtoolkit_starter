import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Flex, Row } from 'antd';
import { Container } from '../../Elements';

import WHATSAPP from '@/assets/images/social/whatsapp.png';

import { LOGO } from '@/constant/assets';
import styles from './PublicLayout.module.scss';

const Header = () => {
  return (
    <header className={styles.publicHeader}>
      <Container>
        <Row gutter={30} align="middle">
          <Col xl={12}>
            <div>
              <img src={LOGO} alt="Odin Mortgage" />
            </div>
          </Col>
          <Col xl={12}>
            <Flex justify="flex-end">
              <Button
                style={{ height: 'auto' }}
                icon={<img style={{ width: '24px' }} src={WHATSAPP} alt="" />}
              >
                {' '}
                Chat with us for help
              </Button>
            </Flex>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/app/dashboard');
  };
  return (
    <footer className={styles.publicFooter}>
      <Container>
        <Row gutter={30} align="middle">
          <Col xl={24}>
            <Flex justify="flex-end">
              <Button type="primary" onClick={handleContinue}>
                Continue
              </Button>
            </Flex>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default PublicLayout;
