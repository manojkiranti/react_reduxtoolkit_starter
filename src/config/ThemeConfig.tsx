import { FC, ReactNode } from 'react';
import { ConfigProvider, theme, Grid } from 'antd';
import { useTheme } from '../contexts/themeContext';

const { useBreakpoint } = Grid;

interface ThemeConfigProps {
  children: ReactNode;
}

const ThemeConfig: FC<ThemeConfigProps> = ({ children }) => {
  const screens = useBreakpoint();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { theme: currentTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{

        token: {
          fontFamily: 'Poppins',
          colorPrimary: '#1968B3',
          colorBorderSecondary: currentTheme === 'dark' ? '#303030' : '#e1e1e1',
          colorLink: '#003862',
          colorWarning: '#f5bf36',
          colorText: '#475569',
          colorTextHeading: '#1E293B',
          colorTextLabel: '#516f90'
        },
        components: {
          Card: {
            // colorBorder: "@colorBorderSecondary"
          },
          Button: {
            colorPrimary: '#1968B3',
            colorPrimaryHover: '#0a95cf',
            primaryShadow: 'none',
            fontWeight: '500',
            controlHeightLG: 42,
            paddingContentHorizontalLG: 12,
          },

          Typography: {
            fontSizeHeading1: screens.md ? 45 : 30,
            fontSizeHeading2: screens.md ? 34 : 28,
            lineHeightHeading1: 1.5,
            lineHeightHeading2: 1.4,
            fontWeightStrong: 500,
            colorTextHeading: currentTheme === 'dark' ? '#ffffff' : '#1E293B',
            fontFamily: 'Poppins',
          },

          Menu: {
            itemActiveBg: 'transparent',
            itemSelectedBg: 'transparent',
            darkItemSelectedColor: '#f5bf36',
            darkGroupTitleColor: '#fff',
            colorLinkActive: '#fff',
            groupTitleColor: 'red',
          },
          Input: {
            colorBgContainerDisabled: "#f5f5f5",
            colorTextDisabled: "#000",
          },
          InputNumber: {
            colorBgContainerDisabled: "#f5f5f5",
            colorTextDisabled: "#000",
          }
        },
        algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
