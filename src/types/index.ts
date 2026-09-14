export * from './auth';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface MenuItem {
  title: string;
  url: string;
  icon?: any;
  badge?: string | number;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  items?: MenuItem[];
}

export interface MenuGroup {
  label?: string;
  items: MenuItem[];
}
