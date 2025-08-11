import { Row, Col, Flex, Button } from 'antd';
import { useMenu } from '@/contexts/menuContext';

import { useAppSelector } from '@/hooks/reduxHooks';

import { Container, ProfileDropdown, ThemeToggle } from '@/components/Elements';

import styles from './Header.module.scss';
import { useTheme } from '@/contexts/themeContext';
import { useAppDispatch } from '@/hooks/reduxHooks';
import SearchBar from '@/components/GlobalSearch/SearchBar';
const Header = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapseState } = useTheme();
  const { activeTabs } = useMenu();
  const { userData } = useAppSelector((state) => state.auth);
  return (
    <>
      <header
        className={`main-header ${styles.headerContainer} ${sidebarCollapseState ? styles.sidebarContainerCollapse : ''}`}
      >
        <Container fullWidth={true}>
          <Row gutter={0}>
            <Col xs={12} md={12}>
              <SearchBar />
            </Col>
            <Col xs={12} md={12} style={{ padding: '0' }}>
              <Flex
                justify="flex-end"
                style={{ height: '100%' }}
                align="center"
                gap={10}
              >
                <ThemeToggle />
                
               
                <div className={styles.headerMenuItem}>
                  <ProfileDropdown userDetail={userData} />
                </div>
              </Flex>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
