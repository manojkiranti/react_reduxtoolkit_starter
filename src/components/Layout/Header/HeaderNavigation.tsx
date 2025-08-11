import { MenuTabType } from '@/shared/types';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

import styles from './Header.module.scss';
import { Typography } from 'antd';

interface HeaderNavigationProps {
  tabItems: MenuTabType[];
}

const HeaderNavigation: FC<HeaderNavigationProps> = ({ tabItems }) => {
  return (
    <>
      <ul className={styles.headerMenu}>
        {tabItems?.map((menu) => (
          <li key={menu.key}>
            <NavLink
              to={menu.link as string}
              className={({ isActive }) => (isActive ? styles.active : '')}
              end
            >
              <Typography.Title level={4}>{menu.label}</Typography.Title>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HeaderNavigation;
