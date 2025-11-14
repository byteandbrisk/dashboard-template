import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Save,
  X as XIcon,
} from 'lucide-react';
import { toast } from 'sonner';

interface TableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  orders: number;
  revenue: number;
}

// Initial data
const initialTableData: TableRow[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'Customer', status: 'active', orders: 24, revenue: 2840 },
  { id: '2', name: 'Michael Chen', email: 'm.chen@email.com', role: 'Premium', status: 'active', orders: 45, revenue: 5920 },
  { id: '3', name: 'Emma Wilson', email: 'emma.w@email.com', role: 'Customer', status: 'active', orders: 12, revenue: 1560 },
  { id: '4', name: 'James Brown', email: 'j.brown@email.com', role: 'Customer', status: 'pending', orders: 3, revenue: 420 },
  { id: '5', name: 'Lisa Anderson', email: 'lisa.a@email.com', role: 'Premium', status: 'active', orders: 67, revenue: 8940 },
  { id: '6', name: 'David Martinez', email: 'd.martinez@email.com', role: 'Customer', status: 'inactive', orders: 8, revenue: 980 },
  { id: '7', name: 'Sophia Taylor', email: 's.taylor@email.com', role: 'Premium', status: 'active', orders: 34, revenue: 4560 },
  { id: '8', name: 'Ryan Garcia', email: 'r.garcia@email.com', role: 'Customer', status: 'active', orders: 19, revenue: 2340 },
];

interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  size?: string;
}

const treeData: TreeNode[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      { id: '1-1', name: 'Reports.pdf', type: 'file', size: '2.4 MB' },
      { id: '1-2', name: 'Invoices.xlsx', type: 'file', size: '1.2 MB' },
      {
        id: '1-3',
        name: 'Projects',
        type: 'folder',
        children: [
          { id: '1-3-1', name: 'Project A.docx', type: 'file', size: '856 KB' },
          { id: '1-3-2', name: 'Project B.docx', type: 'file', size: '1.1 MB' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    children: [
      { id: '2-1', name: 'Logo.png', type: 'file', size: '245 KB' },
      { id: '2-2', name: 'Banner.jpg', type: 'file', size: '1.8 MB' },
    ],
  },
  { id: '3', name: 'README.md', type: 'file', size: '12 KB' },
];

function TreeRow({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <tr className="border-b border-[color:var(--border)] hover:bg-[color:var(--surface-muted)] transition-colors">
        <td className="py-3 px-4" style={{ paddingLeft: `${16 + level * 24}px` }}>
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 hover:bg-[color:var(--border)] rounded transition-colors"
              >
                {expanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}
            <span className="text-sm font-medium">{node.name}</span>
          </div>
        </td>
        <td className="py-3 px-4">
          <Badge variant={node.type === 'folder' ? 'outline' : 'secondary'}>
            {node.type}
          </Badge>
        </td>
        <td className="py-3 px-4 text-sm text-[color:var(--text-muted)]">
          {node.size || '-'}
        </td>
        <td className="py-3 px-4">
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </td>
      </tr>
      {expanded && hasChildren && node.children?.map((child) => (
        <TreeRow key={child.id} node={child} level={level + 1} />
      ))}
    </>
  );
}

export function TablesPage() {
  // Table data state
  const [tableData, setTableData] = useState<TableRow[]>(initialTableData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableRow;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TableRow | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<TableRow>>({});

  // Toggle row selection
  const toggleRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // Toggle all rows selection
  const toggleAll = () => {
    setSelectedRows(prev =>
      prev.length === tableData.length ? [] : tableData.map(row => row.id)
    );
  };

  // Delete handlers
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedRows.length} customer(s)? This action cannot be undone.`)) {
      setTableData(prev => prev.filter(row => !selectedRows.includes(row.id)));
      toast.success(`Successfully deleted ${selectedRows.length} customer(s)`);
      setSelectedRows([]);
    }
  };

  const handleSingleDelete = (id: string) => {
    const row = tableData.find(r => r.id === id);
    if (!row) return;

    if (confirm(`Are you sure you want to delete ${row.name}? This action cannot be undone.`)) {
      setTableData(prev => prev.filter(row => row.id !== id));
      toast.success(`Successfully deleted ${row.name}`);
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  // Edit handlers
  const handleEditClick = (row: TableRow) => {
    setEditingRow(row);
    setEditFormData({ ...row });
    setIsEditDialogOpen(true);
  };

  const handleBulkEdit = () => {
    if (selectedRows.length !== 1) return;
    
    // Edit the selected row
    const selectedRow = tableData.find(r => selectedRows.includes(r.id));
    if (selectedRow) {
      setEditingRow(selectedRow);
      setEditFormData({ ...selectedRow });
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (!editingRow || !editFormData.name || !editFormData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setTableData(prev =>
      prev.map(row =>
        row.id === editingRow.id
          ? { ...row, ...editFormData }
          : row
      )
    );

    toast.success(`Successfully updated ${editFormData.name}`);
    setIsEditDialogOpen(false);
    setEditingRow(null);
    setEditFormData({});
  };

  // Sorting handler
  const handleSort = (key: keyof TableRow) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const getSortedData = (data: TableRow[]) => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Apply search filter
  const filteredData = tableData.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting to filtered data
  const sortedAndFilteredData = getSortedData(filteredData);

  // Export to CSV
  const handleExport = () => {
    const dataToExport = selectedRows.length > 0
      ? tableData.filter(row => selectedRows.includes(row.id))
      : tableData;

    const csv = [
      ['Name', 'Email', 'Role', 'Status', 'Orders', 'Revenue'],
      ...dataToExport.map(row => [
        row.name,
        row.email,
        row.role,
        row.status,
        row.orders.toString(),
        row.revenue.toString(),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Exported ${dataToExport.length} customer(s) to CSV`);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto fade-in">
      {/* Page Header */}
      <div>
        <h2 className="mb-2">Data Tables</h2>
        <p className="text-[color:var(--text-muted)]">
          Advanced tables with sorting, filtering, and CRUD operations
        </p>
      </div>

      {/* Smart Table */}
      <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3>Customer Table</h3>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {selectedRows.length > 0 && (
          <div 
            className="mb-4 p-4 bg-[color:var(--primary-light)] rounded-lg flex items-center justify-between fade-in"
          >
            <span className="text-sm font-medium">
              {selectedRows.length} row(s) selected
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBulkEdit}
                disabled={selectedRows.length !== 1}
                title={selectedRows.length === 1 ? 'Edit selected customer' : 'Select exactly 1 row to edit'}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[color:var(--danger)] hover:bg-[color:var(--danger)] hover:text-white"
                onClick={handleBulkDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[color:var(--border)]">
                <th className="py-3 px-4 text-left">
                  <Checkbox
                    checked={selectedRows.length === tableData.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  <button 
                    className="flex items-center gap-1 hover:text-[color:var(--text)] transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortConfig?.key === 'name' ? (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )
                    ) : (
                    <ArrowUpDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  <button 
                    className="flex items-center gap-1 hover:text-[color:var(--text)] transition-colors"
                    onClick={() => handleSort('orders')}
                  >
                    Orders
                    {sortConfig?.key === 'orders' ? (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )
                    ) : (
                    <ArrowUpDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  <button 
                    className="flex items-center gap-1 hover:text-[color:var(--text)] transition-colors"
                    onClick={() => handleSort('revenue')}
                  >
                    Revenue
                    {sortConfig?.key === 'revenue' ? (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )
                    ) : (
                    <ArrowUpDown className="w-3 h-3" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[color:var(--border)] hover:bg-[color:var(--surface-muted)] transition-colors"
                >
                  <td className="py-3 px-4">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{row.name}</td>
                  <td className="py-3 px-4 text-sm text-[color:var(--text-muted)]">{row.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={row.role === 'Premium' ? 'default' : 'outline'}>
                      {row.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={
                        row.status === 'active'
                          ? 'bg-[color:var(--success-light)] text-[color:var(--success)] border-[color:var(--success)]'
                          : row.status === 'pending'
                          ? 'bg-[color:var(--warning-light)] text-[color:var(--warning)] border-[color:var(--warning)]'
                          : 'bg-[color:var(--surface-muted)] text-[color:var(--text-muted)]'
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm tabular-nums">{row.orders}</td>
                  <td className="py-3 px-4 text-sm tabular-nums">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(row)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-[color:var(--danger)]"
                          onClick={() => handleSingleDelete(row.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedAndFilteredData.length === 0 && (
          <div className="py-12 text-center text-[color:var(--text-muted)]">
            No customers found matching your search.
          </div>
        )}
      </Card>

      {/* Tree Grid */}
      <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
        <h3 className="mb-6">Tree Grid</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[color:var(--border)]">
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Type
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Size
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-[color:var(--text-muted)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {treeData.map((node) => (
                <TreeRow key={node.id} node={node} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update customer information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={editFormData.name || ''}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                placeholder="Customer name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={editFormData.email || ''}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                placeholder="customer@email.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editFormData.role || 'Customer'}
                onValueChange={(value) => setEditFormData({ ...editFormData, role: value })}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editFormData.status || 'active'}
                onValueChange={(value) => setEditFormData({ ...editFormData, status: value as any })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-orders">Orders</Label>
                <Input
                  id="edit-orders"
                  type="number"
                  value={editFormData.orders || 0}
                  onChange={(e) => setEditFormData({ ...editFormData, orders: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-revenue">Revenue</Label>
                <Input
                  id="edit-revenue"
                  type="number"
                  value={editFormData.revenue || 0}
                  onChange={(e) => setEditFormData({ ...editFormData, revenue: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingRow(null);
                setEditFormData({});
              }}
            >
              <XIcon className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
