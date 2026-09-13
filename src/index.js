/**
 * @plexivia/erp-dash-ui
 * 
 * Reusable React ERP & Dashboard UI Components, Layout, Theming, and State Management.
 */

// --- UI Components ---
export { Alert, AlertTitle, AlertDescription, AlertAction } from './components/ui/alert';
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from './components/ui/avatar';
export { Badge, badgeVariants } from './components/ui/badge';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/ui/breadcrumb';
export { Button, buttonVariants } from './components/ui/button';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from './components/ui/card';
export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from './components/ui/chart';
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './components/ui/collapsible';
export { ConfirmDeleteDialog } from './components/ui/confirm-delete-dialog';
export { DatePicker } from './components/ui/date-picker';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './components/ui/dropdown-menu';
export { Input, Select as NativeSelect } from './components/ui/input';
export { Label } from './components/ui/label';
export { Modal } from './components/ui/Modal';
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/ui/pagination';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
export { Separator } from './components/ui/separator';
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/ui/sheet';
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from './components/ui/sidebar';
export { Skeleton } from './components/ui/skeleton';
export { Toaster } from './components/ui/sonner';
export { Spinner } from './components/ui/spinner';
export { StatCard } from './components/ui/StatCard';
export { Switch } from './components/ui/switch';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  DataTable,
} from './components/ui/table';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from './components/ui/Tabs';
export { Textarea } from './components/ui/textarea';
export { ThemeToggle } from './components/ui/theme-toggle';
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
} from './components/ui/toast';
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/ui/tooltip';

// --- Unified Table ---
export {
  UnifiedDataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  DataTableToolbar,
  DataTableFacetedFilter,
  exportTableToCSV,
  exportTableToJSON,
} from './components/ui/unified-table';

// --- Layout Components ---
export {
  AppContainer,
  DashboardLayout,
  PageTitle,
  UnifiedSidebar,
} from './components/layout';

// --- Common Components ---
export {
  HeaderTitle,
  HeaderModeSwitcher,
} from './components/common';

// --- Stores (Zustand) ---
export { useAppStore } from './store/useAppStore';
export { useThemeStore } from './store/useThemeStore';

// --- Context & Provider ---
export { ThemeProvider, useTheme } from './context/ThemeContext';

// --- Hooks ---
export { useIsMobile } from './hooks/use-mobile';

// --- Utilities & Lib ---
export {
  cn,
  formatToBengaliDate,
  formatToDdMmYyyy,
  getDocumentId,
  getDocumentRecipientName,
  printDocument,
  downloadDocumentDirect,
} from './lib/utils';

export { getApiBaseUrl, createApiClient } from './lib/api-client';

export {
  configureErrorMessages,
  getGenericErrorMessage,
  getApiErrorMessage,
  handleGlobalError,
} from './lib/error-handler';
