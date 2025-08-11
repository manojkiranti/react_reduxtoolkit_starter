import { FC, ReactNode } from 'react';
import { Row, Col, theme } from 'antd';

import { Container } from '@/components/Elements';

import Logo from '@/assets/images/logo.png';
import styles from '../styles/Login.module.scss';
interface AuthLayoutProps {
  children: ReactNode;
  banner?: ReactNode;
}

const { useToken } = theme;

const AuthLayout: FC<AuthLayoutProps> = ({ children, banner }) => {
  const { token } = useToken();

  return (
    <div style={{background: token.colorWhite, minHeight: '100vh' }}>
      <Container fullWidth={true} style={{ padding: '0' }}>
        <Row>
          <Col xs={24} md={12}>
            
            <div
              style={{
                padding: '2rem',
              }}
            >
              <img src={Logo} alt="Logo" style={{ height: '60px' }} />
            </div>
            <div className={styles.formContainerStyles}>{children}</div>
          </Col>
          <Col xs={0} md={12}>
            {banner}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthLayout;
