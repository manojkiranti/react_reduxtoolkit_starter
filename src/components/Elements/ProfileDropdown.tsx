import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Modal, Space, theme } from 'antd';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { clearAuthToken } from '@/store/slices/auth/authSlice';
import { AuthUser } from '@/shared/types';
import Profile from '@/pages/profile/components/Profile';


// const { useBreakpoint } = Grid;
const iconStyle = { fontSize: '16px' };

const { useToken } = theme;
interface ProfileDropdownProps {
  userDetail: AuthUser | null;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ userDetail }) => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // const screen = useBreakpoint();
  // const showEmail = screen?.md ? true : false;

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: (
        <div
          style={{
            cursor: 'default',
            color: token.colorText,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderBottom: '1px solid #e0e0e0',
            padding: '8px 0px',
          }}
        >
          <Avatar>
            {userDetail?.name
              ? userDetail?.name?.charAt(0).toUpperCase()
              : userDetail?.email?.charAt(0).toUpperCase()}
          </Avatar>
          <span
            style={{
              fontWeight: '500',
            }}
          >
            {userDetail?.email}
          </span>
        </div>
      ),
    },
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined style={iconStyle} />,
    },
    {
      key: '2',
      icon: <LogoutOutlined style={iconStyle} />,
      label: 'Log Out',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
      dispatch(clearAuthToken());
      navigate('/auth');
    }
    if (e.key === '1') {
      setIsProfileModalOpen(true)
    }
  };

  return (
    <>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={['click']}
        overlayStyle={{ width: '300px' }}
      >
        <a
          onClick={(e) => e.preventDefault()}
          style={{ color: token.colorText}}
        >
          <Space>
            <Avatar>
              {userDetail?.name
                ? userDetail?.name?.charAt(0).toUpperCase()
                : userDetail?.email?.charAt(0).toUpperCase()}
            </Avatar>
            {/* {showEmail && (
              <span
                style={{
                  fontWeight: '500',
                }}
              >
                {userDetail?.email}
              </span>
            )} */}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Modal
        title="Profile"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isProfileModalOpen}
        onCancel={() => setIsProfileModalOpen(false)}
        footer={null}
      >
      <Profile  handleProfileUpdate={() => setIsProfileModalOpen(false)}/>
      </Modal>
    </>
  );
};

export default ProfileDropdown;
