import { MenuType } from '@/shared/types';

/**
 * todo: clearify the tabs for each menu
 * todo: dynamic DB should be maintained and fetch menu through api
 */
export const MENU_ITEMS: MenuType[] = [
  {
    key: '1',
    label: 'Dashboard',
    link: '/dashboard',
    icon: 'dashboard',
    display: true,
  },

  // {
  //   key: '2',
  //   label: 'Contacts',
  //   link: '/contacts',
  //   icon: 'user',
  //   display: true,
  // },
  // {
  //   key: '3',
  //   label: 'Lead',
  //   link: '/lead',
  //   icon: 'check',
  //   display: true,
  // },
  // {
  //   key: '11',
  //   label: 'Application',
  //   icon: 'app',
  //   display: true,
  //   children: [
  //     {
  //       key: '11.1',
  //       label: 'Broker',
  //       link: '/application/broker',
  //       display: true,
  //     },
  //     {
  //       key: '11.2',
  //       label: 'Processor',
  //       link: '/application/processor',
  //       display: true,
  //     },
  //     {
  //       key: '11.3',
  //       label: 'Legacy Gravity Form',
  //       link: '/application/website-oa',
  //       display: true,
  //     },
  //     {
  //       key: '11.4',
  //       label: 'Compliance Note',
  //       link: '/application/note/compliance',
  //       display: true,
  //     },
  //   ],
  // }
];
