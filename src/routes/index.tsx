import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UnifiedSidebar } from '@/components/layout/UnifiedSidebar';
import { TopBreadcrumbBar } from '@/components/layout/TopBreadcrumbBar';
import { ToastContainer } from '@/components/common/ToastContainer';
import { GlobalSearchModal } from '@/components/common/GlobalSearchModal';
import { GlobalErrorBoundary } from '@/components/common/GlobalErrorBoundary';
import { NAVIGATION_MENU_GROUPS } from '@/constants/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { DashboardOverviewPage } from '@/features/dashboard/pages/DashboardOverviewPage';
import { LoginPage } from '@/components/auth/LoginPage';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeaderTitle } from '@/components/layout/HeaderTitle';

// Simple placeholder page for demo routes
function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <HeaderTitle title={title} subtitle={description} />
      <Card className="border-border/80 p-8 text-center space-y-4">
        <div className="max-w-md mx-auto space-y-2">
          <CardTitle className="text-lg">{title} Module</CardTitle>
          <CardDescription className="text-sm">
            This module is pre-configured and ready for your custom enterprise views, forms, or data tables.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}

// Authenticated layout shell wrapper
function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();

  return (
    <GlobalErrorBoundary>
      <DashboardLayout
        sidebar={
          <UnifiedSidebar
            menuGroups={NAVIGATION_MENU_GROUPS}
            brandTitle="Plexivia"
            brandSubtitle="Dashboard Template"
            brandPath="/"
            user={user}
            onLogout={logout}
          />
        }
        header={<TopBreadcrumbBar />}
        toasts={<ToastContainer />}
        modals={<GlobalSearchModal />}
      >
        {children}
      </DashboardLayout>
    </GlobalErrorBoundary>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main Dashboard Shell Routes */}
      <Route
        path="/"
        element={
          <AppShell>
            <DashboardOverviewPage />
          </AppShell>
        }
      />
      <Route
        path="/analytics"
        element={
          <AppShell>
            <PlaceholderPage
              title="Analytics & Reports"
              description="Detailed metric breakdowns, pipeline performance, and data exports"
            />
          </AppShell>
        }
      />
      <Route
        path="/users"
        element={
          <AppShell>
            <PlaceholderPage
              title="Users & Access Management"
              description="Manage staff members, roles, permissions, and security tokens"
            />
          </AppShell>
        }
      />
      <Route
        path="/operations/*"
        element={
          <AppShell>
            <PlaceholderPage
              title="Operations & Ledger"
              description="Comprehensive operations tracking, ledger accounting, and system audit logs"
            />
          </AppShell>
        }
      />
      <Route
        path="/projects"
        element={
          <AppShell>
            <PlaceholderPage
              title="Project Workflows"
              description="Manage milestones, customer deliveries, and integration pipelines"
            />
          </AppShell>
        }
      />
      <Route
        path="/docs"
        element={
          <AppShell>
            <PlaceholderPage
              title="Template Documentation"
              description="Architecture guides, component patterns, and API client usage reference"
            />
          </AppShell>
        }
      />
      <Route
        path="/settings"
        element={
          <AppShell>
            <PlaceholderPage
              title="System Settings"
              description="Configure brand assets, environment endpoints, and localization"
            />
          </AppShell>
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
