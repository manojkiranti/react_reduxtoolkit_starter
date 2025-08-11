import { FC, useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MENU_ITEMS } from '@/devFrontData/menu';
import { manageMenuList } from '@/shared/utils/menu-utils';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/themeContext';

interface MenuListProps {
  onSelect?: () => void;
}

const MenuList: FC<MenuListProps> = () => {
  const { sidebarCollapseState } = useTheme();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const findMenuKeyByPath = (path: string, items: any[]): string | null => {
    const parts = path.split('/').filter(Boolean);
    for (let i = parts.length; i > 0; i--) {
      const partialPath = `/${parts.slice(0, i).join('/')}`;
      for (const item of items) {
        if (item.link === partialPath) {
          return item.key;
        }
        if (item.children) {
          const childKey = findMenuKeyByPath(partialPath, item.children);
          if (childKey) return childKey;
        }
      }
    }
    return null;
  };

  const findParentKeys = (currentKey: string, items: any[]): string[] => {
    const parentKeys: string[] = [];

    const findParent = (items: any[], targetKey: string) => {
      for (const item of items) {
        if (item.children) {
          if (item.children.some((child: any) => child.key === targetKey)) {
            parentKeys.push(item.key);
          }
          findParent(item.children, targetKey);
        }
      }
    };

    findParent(items, currentKey);
    return parentKeys;
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const menuKey = findMenuKeyByPath(currentPath, MENU_ITEMS);

    if (menuKey) {
      setSelectedKeys([menuKey]);

      // const parentKeys = findParentKeys(menuKey, MENU_ITEMS);
      // if (parentKeys.length > 0) {
      //   setOpenKeys(parentKeys);
      // }
      const parentKeys = findParentKeys(menuKey, MENU_ITEMS);

      const uniqueKeys = Array.from(new Set([...parentKeys]));
      setOpenKeys(uniqueKeys);
    } else {
      // fallback
      // setOpenKeys(['11']); // ✅ optional fallback
    }
  }, [location.pathname]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKeys([e.key]);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const uniqueKeys = Array.from(new Set([...keys]));
    setOpenKeys(uniqueKeys as string[]);
  };

  const updatedItems = manageMenuList(
    MENU_ITEMS.filter((item) => item.display),
  );

  return (
    <Menu
      selectedKeys={selectedKeys}
      onClick={handleMenuClick}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      inlineCollapsed={sidebarCollapseState}
      style={{ background: 'none', border: 'none', width: '100%' }}
      items={updatedItems}
      theme="light"
    />
  );
};

export default MenuList;
