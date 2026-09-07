# @plexivia/erp-dash-ui

> Modern, production-ready React ERP & Dashboard UI components, layout shell, state management, and design system extracted from Plexivia enterprise dashboards.

[![npm version](https://img.shields.io/npm/v/@plexivia/erp-dash-ui.svg?style=flat-square)](https://www.npmjs.com/package/@plexivia/erp-dash-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## Features

- 💎 **Universal Dashboard Shell**: Responsive `DashboardLayout` with collapsible `UnifiedSidebar` (48px collapsed <-> 256px expanded), internal scrolling, and fixed viewport containment.
- 🎨 **Tailwind CSS v4 Ready**: Clean CSS variable design tokens for both light and dark mode.
- 🧩 **Complete UI Kit**: Over 30+ accessible components built on modern primitives (Alert, Avatar, Badge, Button, Card, DatePicker, Dialog, DropdownMenu, Modal, Pagination, Select, Sheet, Sonner, Table, Tabs, Tooltip, etc.).
- 📊 **Unified Data Table**: Full TanStack Table v8 integration with search, faceted filtering, pagination, CSV/JSON export, and column visibility.
- ⚡ **Zustand State Management**: Lightweight pre-configured stores for global application state (`useAppStore`) and theme management (`useThemeStore`).
- 🛠️ **Enterprise Utilities**: `cn()`, Bengali date formatting (`formatToBengaliDate`), document printing/export helpers, configured Axios `apiClient` with automatic token refresh, and toast-based error handling.

---

## Installation

```bash
npm install @plexivia/erp-dash-ui
```

### Peer Dependencies

Make sure your project has React 18+ or 19+ and Tailwind CSS installed:

```bash
npm install react react-dom lucide-react @remixicon/react
```

---

## Setup

### 1. Import Styles

In your application's entry point (e.g. `main.jsx` or `index.css`):

```javascript
// main.jsx
import '@plexivia/erp-dash-ui/styles';
```

Or in your root CSS file:

```css
/* index.css */
@import "@plexivia/erp-dash-ui/styles";
```

### 2. Wrap with ThemeProvider (Optional)

```jsx
// App.jsx
import React from 'react';
import { ThemeProvider } from '@plexivia/erp-dash-ui';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app_theme">
      <YourAppRoutes />
    </ThemeProvider>
  );
}
```

---

## Quick Start Example

Here is how you can set up a full dashboard layout in seconds:

```jsx
import React from 'react';
import {
  DashboardLayout,
  UnifiedSidebar,
  AppContainer,
  HeaderTitle,
  StatCard,
  Button,
  useAppStore
} from '@plexivia/erp-dash-ui';
import { LayoutDashboard, Users, FileText, Settings, CreditCard } from 'lucide-react';

const menuGroups = [
  {
    label: 'Main Navigation',
    items: [
      {
        id: 'overview',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/admin',
      },
      {
        id: 'clients',
        label: 'Client Management',
        icon: Users,
        path: '/admin/clients',
      },
      {
        id: 'invoices',
        label: 'Billing & Invoices',
        icon: CreditCard,
        childItems: [
          { label: 'All Invoices', path: '/admin/invoices' },
          { label: 'Create Invoice', path: '/admin/invoices/new' },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'settings', label: 'Preferences', icon: Settings, path: '/admin/settings' },
    ],
  },
];

export function DashboardPage() {
  const { user, logout } = useAppStore();

  return (
    <DashboardLayout
      sidebar={
        <UnifiedSidebar
          menuGroups={menuGroups}
          brandTitle="ERP Dashboard"
          brandSubtitle="Management Portal"
          brandPath="/"
          user={user || { name: 'Admin User', role: 'Super Admin' }}
          onLogout={logout}
          activeChecker={(item) => window.location.pathname === item.path}
        />
      }
      header={
        <header className="h-14 border-b border-border bg-card px-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Overview</h2>
          <Button size="sm">Create New</Button>
        </header>
      }
    >
      <AppContainer>
        {/* Banner */}
        <HeaderTitle
          title="Dashboard Overview"
          subtitle="Welcome back to your central management portal."
          badge="Live System"
        />

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="৳ 4,520,000"
            change="+12.5%"
            trend="up"
            icon="DollarSign"
          />
          <StatCard
            title="Active Clients"
            value="1,248"
            change="+8.2%"
            trend="up"
            icon="Users"
          />
          <StatCard
            title="Pending Invoices"
            value="32"
            change="-4.1%"
            trend="down"
            icon="FileText"
          />
          <StatCard
            title="Completed Bookings"
            value="564"
            change="+15.3%"
            trend="up"
            icon="CheckCircle"
          />
        </div>
      </AppContainer>
    </DashboardLayout>
  );
}
```

---

## Included Components

### 🖥️ Layout & Shell
- `DashboardLayout` — Responsive app shell with auto-adjusting sidebar inset.
- `UnifiedSidebar` — Collapsible navigation sidebar (48px <-> 256px) with submenu accordions, brand header, and user profile footer.
- `AppContainer` — Viewport container (max-w 1440px / 1600px ultrawide) with fluid responsive padding.
- `PageTitle` / `HeaderTitle` — Gradient banner with ambient lighting, title, subtitle, badges, and action slots.

### 🧩 UI Elements
| Component | Description |
|---|---|
| `Alert`, `AlertTitle`, `AlertDescription` | Accessible alert notification banners with multiple variants |
| `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup` | Avatar pictures and initials with badge indicators |
| `Badge` | Pill tags and status labels |
| `Breadcrumb` | Hierarchical navigation trail |
| `Button` | High-polish buttons with standard and gradient variants |
| `Card`, `CardHeader`, `CardTitle`, `CardContent` | Elevation containers with border styling |
| `ConfirmDeleteDialog` | Pre-built alert dialog for destructive deletion confirmations |
| `DatePicker` | Dual-mode Gregorian & Bengali date picker with calendar popover |
| `Dialog`, `Modal` | Centered modal dialogs with backdrop blur |
| `DropdownMenu` | Floating context and action menus |
| `Input`, `NativeSelect` | Accessible form controls with integrated labels and error states |
| `Pagination` | Accessible pagination controls |
| `Select` | Rich select component with searchable dropdown |
| `Sheet` | Slide-out drawer panel from any edge |
| `Skeleton`, `Spinner` | Loading placeholders and activity spinners |
| `StatCard` | KPI statistic card with trend badges and icons |
| `Switch` | Accessible toggle switch |
| `Table`, `DataTable` | Standard responsive table elements |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Tab navigation panels |
| `Textarea` | Multi-line auto-resizing text field |
| `Tooltip` | Hover tooltips with smooth transitions |
| `UnifiedDataTable` | Feature-rich TanStack data table with search, sorting, and export |

### ⚡ State Stores
- `useAppStore` — Global app state: sidebar toggle, search query, search modal state, user session, and logout helper.
- `useThemeStore` — Theme state: `theme` ('light' | 'dark'), `setTheme()`, `toggleTheme()`, and auto-sync with `document.documentElement`.

### 🛠️ Utilities
- `cn(...classes)` — Class merging utility combining `clsx` and `tailwind-merge`.
- `formatToBengaliDate(date)` — Formats dates into localized Bengali numerals and months.
- `formatToDdMmYyyy(date)` — Standard `DD/MM/YYYY` formatter.
- `printDocument({ targetId, title })` — Print helper for printing DOM elements.
- `downloadDocumentDirect({ targetId, filename })` — Generates and downloads PNG/images from HTML containers.
- `createApiClient(options)` — Pre-configured Axios instance with automatic Bearer token injection and 401 refresh token flow.
- `handleGlobalError(error)` — Debounced, user-friendly error toasts with Sonner.

---

## License

MIT © [Plexivia Dev](https://github.com/Plexivia-dev)
