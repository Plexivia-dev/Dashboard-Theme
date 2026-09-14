# Plexivia Enterprise Dashboard Template

A production-grade, highly modular **Enterprise Dashboard Template** built with **React 19**, **Vite**, **TypeScript**, **Zustand**, **Tailwind CSS v4**, **shadcn/ui**, **Axios**, and **TanStack Query (React Query)**.

Reused and adapted from the enterprise foundation of Monsur-Ali-Travels shared design system with first-class TypeScript support and modern frontend tooling.

---

## 🚀 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern concurrent UI engine |
| **Vite 6** | Ultra-fast development and optimized production bundling |
| **TypeScript** | Type safety, intellisense, and strict interfaces |
| **Tailwind CSS v4** | CSS-first utility framework with `@theme inline` tokens |
| **shadcn/ui (base-mira)** | Beautiful, accessible component primitives |
| **Zustand 5** | Lightweight, reactive global state management |
| **TanStack Query 5** | Server-state caching, background revalidation, mutations |
| **TanStack Table 8** | Headless data tables with filtering, sorting, pagination |
| **Axios** | HTTP client with JWT automatic refresh queue & global error handling |
| **Recharts 2** | Responsive SVG charts (Area, Bar, Linear) |
| **Lucide React** | Consistent iconography |
| **Sonner** | Modern toast notification manager |
| **i18next** | Internationalization (English & Bengali included) |

---

## 📂 Project Architecture

```
d:/Plexivia/Dashboard/
├── public/                       # Static public assets (Favicon, Plexivia logo)
├── src/
│   ├── assets/                   # Brand logos and imagery
│   ├── components/
│   │   ├── auth/                 # Enterprise Login & 2FA modal verification
│   │   ├── common/               # ToastContainer, GlobalSearchModal, GlobalErrorBoundary, UnifiedModal
│   │   ├── layout/               # DashboardLayout, UnifiedSidebar, TopBreadcrumbBar, HeaderTitle
│   │   └── ui/                   # 40+ shadcn UI components (button, card, dialog, sheet, etc.)
│   │       └── unified-table/    # TanStack Table suite (toolbar, faceted filter, pagination, export)
│   ├── configs/                  # appConfig, i18n localization, bn/en locales
│   ├── constants/                # Navigation menu hierarchy, route constants
│   ├── features/                 # Modular domain features
│   │   └── dashboard/
│   │       └── pages/            # DashboardOverviewPage with StatCards, Recharts, and DataTable
│   ├── hooks/                    # Custom hooks (use-mobile, use-debounce)
│   ├── lib/
│   │   ├── api-client.ts         # Axios instance with 401 refresh queuing & base URL resolver
│   │   ├── error-handler.ts      # User-safe error sanitization and toast alerting
│   │   ├── query-client.ts       # Preconfigured TanStack QueryClient
│   │   └── utils.ts              # cn(), date formatters, isolated iframe A4 print engine
│   ├── routes/                   # React Router routing setup with AppShell
│   ├── store/                    # Zustand stores (useThemeStore, useAuthStore, useAppStore)
│   ├── types/                    # TypeScript type definitions (User, Auth, Table, API)
│   ├── App.tsx                   # Root Provider (QueryClientProvider, BrowserRouter)
│   ├── main.tsx                  # React 19 entry bootstrap
│   └── index.css                 # Tailwind v4 theme, fonts, typeset, shimmer, scroll-fade
├── components.json               # shadcn UI configuration
├── tsconfig.json                 # TypeScript build and project references
└── vite.config.ts                # Vite plugins and bundle chunking strategy
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The development server will start at `http://localhost:5173`.

### 3. Production Build & Verification
```bash
# Type check and build
npm run build

# Preview production build
npm run preview
```

---

## 🛠 Key Features & How-To Guides

### 1. State Management with Zustand
Stores are located in `src/store/`:

- **Theme Mode (`useThemeStore`)**:
  Supports `'light'` and `'dark'` modes with automatic `localStorage` persistence and `.dark` class sync on `document.documentElement`.
  ```typescript
  import { useThemeStore } from '@/store/useThemeStore';

  const { theme, toggleTheme } = useThemeStore();
  ```

- **Authentication Session (`useAuthStore`)**:
  Handles token caching, profile updating, login, and role-based permissions:
  ```typescript
  import { useAuthStore } from '@/store/useAuthStore';

  const { user, login, logout, hasRole } = useAuthStore();
  const canEdit = hasRole(['Admin', 'Superadmin']);
  ```

- **Application Shell State (`useAppStore`)**:
  Controls sidebar collapse state and global search dialog:
  ```typescript
  import { useAppStore } from '@/store/useAppStore';

  const { isSearchModalOpen, setSearchModalOpen } = useAppStore();
  ```

---

### 2. Axios Client & Token Refresh Queuing
Pre-configured in `src/lib/api-client.ts`:
- Automatic Bearer token header injection from `localStorage`.
- Concurrency-safe request queue during 401 token refresh (prevents duplicate refresh calls).
- Global network and server error interception via `src/lib/error-handler.ts`.

```typescript
import { apiClient } from '@/lib/api-client';

// Simple GET request
const { data } = await apiClient.get('/api/v1/users');
```

---

### 3. TanStack Query Integration
Pre-configured with optimal defaults in `src/lib/query-client.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await apiClient.get('/api/v1/transactions');
      return res.data;
    },
  });
}
```

---

### 4. TanStack DataTable (`UnifiedDataTable`)
Included in `src/components/ui/unified-table/unified-data-table.jsx`:
- Instant multi-column sorting
- Search filter input
- Faceted status pills
- Pagination with customizable page sizes (10, 20, 50, 100)
- CSV / Excel export
- Expandable row details

```tsx
import { UnifiedDataTable } from '@/components/ui/unified-table';

<UnifiedDataTable
  columns={columns}
  data={data}
  isLoading={isLoading}
  searchPlaceholder="Search records..."
/>
```

---

### 5. Isolated Iframe A4 Document Print Engine
Included in `src/lib/utils.ts`:
Guarantees 100% precision for printing documents and downloading high-res PNG/PDF receipts without modal or sidebar displacement:

```typescript
import { printDocument, downloadDocumentDirect } from '@/lib/utils';

// Trigger print dialog
printDocument({
  docId: 'TXN-9021',
  docType: 'Receipt',
  clientName: 'Acme Corporation',
});

// Direct PNG download
downloadDocumentDirect({
  docId: 'TXN-9021',
  elementId: 'printable-canvas-id',
});
```

---

## 🎨 Design System & Custom Utilities

- **Primary Color**: `#0284c7` (Light) / `#38bdf8` (Dark)
- **Shimmer Effect**: Add `shimmer` class to any text or banner.
- **Scroll Fade**: Use `scroll-fade` or `scroll-fade-y` to softly fade out overflowing list items.
- **Typeset**: Add `typeset` class to formatted documentation or prose content.

---

## 📜 License
Private template repository — built for Plexivia.
