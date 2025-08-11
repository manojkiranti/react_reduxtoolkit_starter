import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '@/devFrontData/menu';
import { useTheme } from '@/contexts/themeContext';

const { SubMenu } = Menu;

const TabsSubMenuExample: React.FC = () => {
  const { sidebarCollapseState } = useTheme();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>('1');
  const [openKeys, setOpenKeys] = useState<string[]>([]); // state for open submenus
  const menuRef = useRef<HTMLDivElement>(null);

  const [submenuIndicatorStyles, setSubmenuIndicatorStyles] = useState<
    Record<string, React.CSSProperties>
  >({});

  const handleClick = (e: any) => {
    setActiveKey(e.key);

    // Helper function to find the clicked menu item by key (supports nested items)
    const findMenuItem = (items: any[]): any => {
      for (const item of items) {
        if (item.key === e.key) return item;
        if (item.children) {
          const found = findMenuItem(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const clickedItem = findMenuItem(MENU_ITEMS);
    if (clickedItem && clickedItem.link) {
      navigate(clickedItem.link);
    }

    if (MENU_ITEMS.find((item) => item.key === e.key && !item.children)) {
      setOpenKeys([]);
    }
  };

  // When submenu is opened or closed, only allow one submenu open at a time.
  const handleOpenChange = (keys: string[]) => {
    // If keys is empty, all submenus are closed
    if (keys.length === 0) {
      setOpenKeys([]);
      return;
    }
    // Otherwise, take the last key (the one that was just opened)
    const latestOpenKey = keys[keys.length - 1];
    setOpenKeys([latestOpenKey]);
  };

  useEffect(() => {
    if (!menuRef.current) return;
    const newStyles: { [key: string]: React.CSSProperties } = {};
    const globalRect = menuRef.current.getBoundingClientRect();

    MENU_ITEMS.forEach((menu) => {
      if (menu.children && openKeys.includes(menu.key)) {
        // Use the custom data attribute to locate the submenu’s DOM element.
        const submenuElement = menuRef.current!.querySelector(
          `li.ant-menu-submenu[data-submenu-key="${menu.key}"]`,
        );
        if (submenuElement) {
          // Look inside the submenu for the active item.
          const activeChild = submenuElement.querySelector(
            '.ant-menu-item-selected',
          );
          if (activeChild) {
            const childRect = activeChild.getBoundingClientRect();
            newStyles[menu.key] = {
              position: 'absolute',
              left: 30, // Adjust to match your design (should match where you want the indicator)
              top: childRect.top - globalRect.top + 4,
              width: 4,
              height: childRect.height - 10,
              backgroundColor: '#1890ff',
              transition: 'top 0.3s ease, height 0.3s ease',
              zIndex: 1,
            };
          }
        }
      }
    });
    setSubmenuIndicatorStyles(newStyles);
  }, [activeKey, openKeys, sidebarCollapseState]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={menuRef}>
        <Menu
          mode="inline"
          style={{ background: 'transparent' }}
          selectedKeys={[activeKey]}
          onClick={handleClick}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          inlineCollapsed={sidebarCollapseState}
        >
          {MENU_ITEMS.map((menu) =>
            menu.children ? (
              <>
                <SubMenu
                  key={menu.key}
                  icon={<MailOutlined />}
                  title={menu.label}
                  data-submenu-key={menu.key}
                  className="submenu-with-border"
                  onTitleClick={() => {
                    setActiveKey(menu.key);
                    if (menu.link) {
                      navigate(menu.link);
                    }
                  }}
                >
                  {menu.children.map((child) => (
                    <Menu.Item key={child.key} icon={<MailOutlined />}>
                      {child.label}
                    </Menu.Item>
                  ))}
                  <span className="sub-menu-border"></span>
                </SubMenu>
              </>
            ) : (
              <Menu.Item key={menu.key} icon={<MailOutlined />}>
                {menu.label}
              </Menu.Item>
            ),
          )}
        </Menu>
      </div>
      {/* Render the indicator div(s) for submenus outside of the SubMenu components */}
      {Object.entries(submenuIndicatorStyles).map(([key, style]) => (
        <div key={key} style={style} />
      ))}
    </div>
  );
};

export default TabsSubMenuExample;
