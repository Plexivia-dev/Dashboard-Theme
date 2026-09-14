import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DollarSign,
  Users,
  Activity,
  CheckCircle,
  Plus,
  RefreshCw,
  Download,
  Printer,
  Eye,
  Filter,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/StatCard';
import { HeaderTitle } from '@/components/layout/HeaderTitle';
import { UnifiedDataTable } from '@/components/ui/unified-table';
import { UnifiedModal, UnifiedModalHeader, UnifiedModalFooter } from '@/components/common/UnifiedModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { printDocument, downloadDocumentDirect, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

// Sample analytics chart data
const CHART_DATA = [
  { name: 'Jan', revenue: 42000, target: 35000, activity: 1400 },
  { name: 'Feb', revenue: 54000, target: 40000, activity: 1900 },
  { name: 'Mar', revenue: 62000, target: 45000, activity: 2200 },
  { name: 'Apr', revenue: 58000, target: 50000, activity: 2100 },
  { name: 'May', revenue: 78000, target: 60000, activity: 2800 },
  { name: 'Jun', revenue: 92000, target: 70000, activity: 3400 },
  { name: 'Jul', revenue: 86000, target: 75000, activity: 3100 },
  { name: 'Aug', revenue: 104000, target: 80000, activity: 3900 },
  { name: 'Sep', revenue: 118000, target: 90000, activity: 4200 },
  { name: 'Oct', revenue: 132000, target: 95000, activity: 4700 },
  { name: 'Nov', revenue: 145000, target: 100000, activity: 5100 },
  { name: 'Dec', revenue: 168000, target: 110000, activity: 5900 },
];

// Sample table records
const INITIAL_RECORDS = [
  {
    id: 'TXN-9021',
    recipient: 'Acme Global Logistics',
    type: 'Enterprise Subscription',
    amount: 14200,
    status: 'Completed',
    date: '2026-09-12',
  },
  {
    id: 'TXN-9022',
    recipient: 'Apex Data Cloud',
    type: 'Infrastructure Compute',
    amount: 8750,
    status: 'Processing',
    date: '2026-09-12',
  },
  {
    id: 'TXN-9023',
    recipient: 'Vertex Dynamics Inc',
    type: 'License Renewal',
    amount: 24500,
    status: 'Completed',
    date: '2026-09-11',
  },
  {
    id: 'TXN-9024',
    recipient: 'Nexus Systems Ltd',
    type: 'Custom Deployment',
    amount: 32000,
    status: 'Pending',
    date: '2026-09-10',
  },
  {
    id: 'TXN-9025',
    recipient: 'Quantum Horizons',
    type: 'Support Retainer',
    amount: 6400,
    status: 'Completed',
    date: '2026-09-09',
  },
  {
    id: 'TXN-9026',
    recipient: 'Starlight Media Group',
    type: 'Enterprise Subscription',
    amount: 19800,
    status: 'Failed',
    date: '2026-09-08',
  },
  {
    id: 'TXN-9027',
    recipient: 'Zenith BioTech Corp',
    type: 'Platform Integration',
    amount: 45000,
    status: 'Completed',
    date: '2026-09-07',
  },
];

export function DashboardOverviewPage() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // New Record Form State
  const [newRecipient, setNewRecipient] = useState('');
  const [newType, setNewType] = useState('Enterprise Subscription');
  const [newAmount, setNewAmount] = useState('');

  // TanStack Query integration demo: Fetch transactions
  const {
    data: transactions = INITIAL_RECORDS,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['dashboard', 'transactions'],
    queryFn: async () => {
      // Simulating API latency or fetching from real endpoint
      await new Promise((resolve) => setTimeout(resolve, 300));
      return INITIAL_RECORDS;
    },
  });

  // TanStack Mutation demo: Create transaction
  const createMutation = useMutation({
    mutationFn: async (newRecord: any) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return newRecord;
    },
    onSuccess: (record) => {
      queryClient.setQueryData(['dashboard', 'transactions'], (old: any[] = []) => [
        record,
        ...old,
      ]);
      toast.success('Record created successfully!', {
        description: `Reference #${record.id} for ${record.recipient} registered.`,
      });
      setIsCreateModalOpen(false);
      setNewRecipient('');
      setNewAmount('');
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.trim() || !newAmount) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const record = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      recipient: newRecipient.trim(),
      type: newType,
      amount: parseFloat(newAmount),
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
    };

    createMutation.mutate(record);
  };

  // Table Columns configuration
  const columns = [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }: any) => (
        <span className="font-mono text-xs font-semibold text-primary">
          {row.getValue('id')}
        </span>
      ),
    },
    {
      accessorKey: 'recipient',
      header: 'Client / Entity',
      cell: ({ row }: any) => (
        <div className="font-medium text-foreground">{row.getValue('recipient')}</div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Service Category',
      cell: ({ row }: any) => (
        <span className="text-xs text-muted-foreground">{row.getValue('type')}</span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => (
        <span className="font-semibold text-foreground">
          {formatCurrency(row.getValue('amount'), 'USD')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.getValue('status');
        const variants: Record<string, string> = {
          Completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
          Processing: 'bg-sky-500/10 text-sky-600 border-sky-500/20',
          Pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
          Failed: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
        };
        return (
          <Badge
            variant="outline"
            className={variants[status] || 'bg-muted text-muted-foreground'}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }: any) => (
        <span className="text-xs text-muted-foreground">{row.getValue('date')}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => {
        const record = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setSelectedRecord(record)}
              title="View Details"
              className="text-muted-foreground hover:text-foreground"
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() =>
                printDocument({
                  docId: record.id,
                  docType: 'Transaction_Receipt',
                  clientName: record.recipient,
                })
              }
              title="Print Document"
              className="text-muted-foreground hover:text-foreground"
            >
              <Printer className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Title with Actions */}
      <HeaderTitle
        title="Dashboard Overview"
        subtitle="Real-time performance metrics, system activity, and recent operations"
        badge={
          <Badge variant="secondary" className="gap-1 font-medium text-xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Production Ready
          </Badge>
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="gap-2 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="gap-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Record</span>
            </Button>
          </>
        }
      />

      {/* KPI Metric StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Revenue"
          value="$148,290.00"
          trend="+14.2% vs last month"
          trendType="up"
          badgeColor="blue"
          icon={DollarSign}
          progress={82}
          subtitle="Annual Target: $1.8M"
        />
        <StatCard
          title="Active Users"
          value="2,845"
          trend="+8.4% new signups"
          trendType="up"
          badgeColor="emerald"
          icon={Users}
          progress={68}
          subtitle="DAU / MAU: 72%"
        />
        <StatCard
          title="Conversion Rate"
          value="4.65%"
          trend="+1.2% this week"
          trendType="up"
          badgeColor="purple"
          icon={Activity}
          progress={55}
          subtitle="Industry benchmark: 3.2%"
        />
        <StatCard
          title="System Health"
          value="99.98%"
          trend="Operational"
          trendType="neutral"
          badgeColor="emerald"
          icon={CheckCircle}
          progress={99}
          subtitle="42ms API response"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Performance Area Chart */}
        <Card className="lg:col-span-2 border-border/80 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Revenue Velocity & Projections</CardTitle>
                <CardDescription className="text-xs">
                  Monthly performance against planned operating targets
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs text-primary bg-primary/10 border-primary/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +24.5% YTD
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.15)" />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Activity Bar Chart */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Activity Volume</CardTitle>
            <CardDescription className="text-xs">
              Daily concurrent tasks and pipeline events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA.slice(-6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.15)" />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="activity" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unified Table Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions & Records</h3>
            <p className="text-xs text-muted-foreground">
              Powered by TanStack Table with instant column sorting, filtering, and pagination
            </p>
          </div>
        </div>

        <UnifiedDataTable
          columns={columns}
          data={transactions}
          isLoading={isLoading}
          searchPlaceholder="Search transactions, clients, or IDs..."
        />
      </div>

      {/* Create Record Modal */}
      <UnifiedModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        maxWidth="max-w-md"
      >
        <UnifiedModalHeader
          title="Create New Transaction Record"
          subtitle="Add an enterprise transaction record into the system database"
          onClose={() => setIsCreateModalOpen(false)}
        />
        <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="recipient">Client or Entity Name *</Label>
            <Input
              id="recipient"
              placeholder="e.g. Acme Corporation"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="Enterprise Subscription">Enterprise Subscription</option>
              <option value="Infrastructure Compute">Infrastructure Compute</option>
              <option value="License Renewal">License Renewal</option>
              <option value="Custom Deployment">Custom Deployment</option>
              <option value="Support Retainer">Support Retainer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount ($ USD) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="12500.00"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              required
            />
          </div>

          <UnifiedModalFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createMutation.isPending}
              className="bg-primary text-primary-foreground font-semibold"
            >
              {createMutation.isPending ? 'Saving...' : 'Create Record'}
            </Button>
          </UnifiedModalFooter>
        </form>
      </UnifiedModal>

      {/* Record Details Modal */}
      {selectedRecord && (
        <UnifiedModal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          maxWidth="max-w-lg"
        >
          <UnifiedModalHeader
            title={`Transaction Record ${selectedRecord.id}`}
            subtitle="Verified transaction ledger entry details"
            onClose={() => setSelectedRecord(null)}
          />
          <div className="p-6 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Client / Recipient</p>
                <p className="font-semibold text-foreground">{selectedRecord.recipient}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="font-semibold text-foreground font-mono">
                  {formatCurrency(selectedRecord.amount, 'USD')}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-foreground">{selectedRecord.type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date Recorded</p>
                <p className="text-foreground">{selectedRecord.date}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Ledger Verification
              </p>
              <p className="text-xs text-muted-foreground">
                Transaction cryptographically logged and synchronized with central reporting nodes.
              </p>
            </div>

            <UnifiedModalFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  printDocument({
                    docId: selectedRecord.id,
                    docType: 'Transaction_Receipt',
                    clientName: selectedRecord.recipient,
                  })
                }
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Voucher
              </Button>
              <Button
                size="sm"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </Button>
            </UnifiedModalFooter>
          </div>
        </UnifiedModal>
      )}
    </div>
  );
}

export default DashboardOverviewPage;
