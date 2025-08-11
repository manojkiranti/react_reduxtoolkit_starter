import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { MenuProvider } from '@/contexts/menuContext';
import { useTheme } from '@/contexts/themeContext';
import { useAppSelector } from '@/hooks/reduxHooks';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarCollapseState } = useTheme();
  const { openAIAssistant } = useAppSelector((state) => state.common);
  return (
    <>
      <MenuProvider>
        <Header />
        <div className={`main-layout ${styles.mainLayout} `}>
          {/* <div className={styles.sidebarContainer}> */}
          <Sidebar />
          {/* </div> */}

          <div
            className={
              styles.mainBodyContainer +
              ' main-body-container ' +
              (sidebarCollapseState ? styles.sidebarContainerCollapse : '')
            }
          >
            <div className={`${styles.mainBody}  mainBody`}>{children}</div>
          </div>
        </div>
      </MenuProvider>
    </>
  );
};

export default MainLayout;
