import React from 'react';
import { Card } from '../ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const lineData = [
  { name: 'Jan', sales: 4000, revenue: 2400, profit: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398, profit: 2210 },
  { name: 'Mar', sales: 2000, revenue: 9800, profit: 2290 },
  { name: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
  { name: 'May', sales: 1890, revenue: 4800, profit: 2181 },
  { name: 'Jun', sales: 2390, revenue: 3800, profit: 2500 },
];

const barData = [
  { name: 'Mon', desktop: 186, mobile: 80, tablet: 45 },
  { name: 'Tue', desktop: 305, mobile: 200, tablet: 87 },
  { name: 'Wed', desktop: 237, mobile: 120, tablet: 91 },
  { name: 'Thu', desktop: 273, mobile: 190, tablet: 78 },
  { name: 'Fri', desktop: 209, mobile: 130, tablet: 65 },
  { name: 'Sat', desktop: 214, mobile: 140, tablet: 72 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: 'var(--chart-1)' },
  { name: 'Mobile', value: 300, color: 'var(--chart-2)' },
  { name: 'Tablet', value: 200, color: 'var(--chart-3)' },
  { name: 'Other', value: 100, color: 'var(--chart-4)' },
];

const radarData = [
  { subject: 'Performance', A: 120, B: 110 },
  { subject: 'Security', A: 98, B: 130 },
  { subject: 'Reliability', A: 86, B: 130 },
  { subject: 'Scalability', A: 99, B: 100 },
  { subject: 'Cost', A: 85, B: 90 },
  { subject: 'Support', A: 65, B: 85 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

export function ChartsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto fade-in">
      {/* Page Header */}
      <div>
        <h2 className="mb-2">Charts & Visualizations</h2>
        <p className="text-[color:var(--text-muted)]">
          Beautiful, interactive charts powered by Recharts
        </p>
      </div>

      {/* Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Multi-Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="var(--chart-3)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Area Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#colorSales)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Stacked Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="desktop" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="mobile" stackId="a" fill="var(--chart-2)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="tablet" stackId="a" fill="var(--chart-3)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Grouped Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="desktop" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="mobile" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="tablet" fill="var(--chart-3)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Pie, Radar, and Scatter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => {
                  const { name, percent } = props;
                  return `${name} ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={80}
                fill="var(--chart-1)"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Radar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" stroke="var(--text-muted)" fontSize={12} />
              <PolarRadiusAxis stroke="var(--text-muted)" fontSize={10} />
              <Radar name="Product A" dataKey="A" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.3} />
              <Radar name="Product B" dataKey="B" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.3} />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Scatter Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="x" stroke="var(--text-muted)" fontSize={12} />
              <YAxis dataKey="y" stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Scatter name="Data Points" data={scatterData} fill="var(--chart-1)" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
