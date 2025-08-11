import { useTheme } from '@/contexts/themeContext';
import styles from './Sidebar.module.scss';
import MenuList from '../MenuList';

import Logo from '@/assets/images/logo.png';
import { Button, Grid } from 'antd';

import { Scrollbars } from 'rc-scrollbars';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const renderThumb = ({ style, ...props }: any) => {
  const thumbStyle = {
    backgroundColor: '#fff',
    borderRadius: '5px',
    opacity: 0.5,
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const { useBreakpoint } = Grid;

const Sidebar = () => {
  const { sidebarCollapseState, toggleSidebarState } = useTheme();

  const toggleCollapsed = () => {
    toggleSidebarState();
  };

  return (
    <div
      className={`sidebar-container ${styles['sidebar-container']} ${sidebarCollapseState ? styles.sidebarContainerCollapse : ''}`}
    >
      <div className="sidebar">
        <div
          className={styles['sidebar-logo-container']}
          style={{
            justifyContent: sidebarCollapseState ? 'center' : 'space-between',
          }}
        >
          <img
            src={Logo}
            style={{
              width: sidebarCollapseState ? '0%' : '150px',
              paddingRight: sidebarCollapseState ? '0' : '1rem',
            }}
            alt="Broker Copilot"
          />
          <Button
            onClick={toggleCollapsed}
            type="text"
            icon={
              sidebarCollapseState ? (
                <MenuUnfoldOutlined
                  style={{ fontSize: '22px', color: '#fff' }}
                />
              ) : (
                <MenuFoldOutlined style={{ fontSize: '22px', color: '#fff' }} />
              )
            }
          />
        </div>
        <Scrollbars
          style={{
            height: 'calc(100vh - 80px)',
          }}
          renderThumbHorizontal={renderThumb}
          renderThumbVertical={renderThumb}
        >
          <div className={styles['sidebar-body']}>
            <MenuList />
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Sidebar;
