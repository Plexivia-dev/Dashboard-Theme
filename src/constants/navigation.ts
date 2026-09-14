import {
  LayoutDashboard,
  BarChart3,
  Users,
  Layers,
  FolderKanban,
  Settings,
  Shield,
  FileText,
  HelpCircle,
} from 'lucide-react';
import type { MenuGroup } from '@/types';

export const NAVIGATION_MENU_GROUPS: MenuGroup[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Overview',
        url: '/',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        url: '/analytics',
        icon: BarChart3,
        badge: 'Live',
        badgeVariant: 'default',
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        title: 'Users & Staff',
        url: '/users',
        icon: Users,
      },
      {
        title: 'Operations',
        url: '/operations',
        icon: Layers,
        items: [
          {
            title: 'Transactions',
            url: '/operations/transactions',
          },
          {
            title: 'Audit Logs',
            url: '/operations/audit-logs',
          },
        ],
      },
      {
        title: 'Projects',
        url: '/projects',
        icon: FolderKanban,
        badge: '12',
        badgeVariant: 'secondary',
      },
    ],
  },
  {
    label: 'System & Security',
    items: [
      {
        title: 'Access Control',
        url: '/security',
        icon: Shield,
      },
      {
        title: 'Documentation',
        url: '/docs',
        icon: FileText,
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
      },
      {
        title: 'Help & Support',
        url: '/support',
        icon: HelpCircle,
      },
    ],
  },
];
