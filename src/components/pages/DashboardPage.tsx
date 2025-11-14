import React from 'react';
import { KPICard } from '../KPICard';
import { ChartPanel } from '../ChartPanel';
import { FlippableCard } from '../FlippableCard';
import { TrafficSourceCard } from '../TrafficSourceCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Activity, Package, Clock, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

// Mock data
const ordersData = [
  { name: 'Mon', orders: 245, profit: 3200 },
  { name: 'Tue', orders: 312, profit: 4100 },
  { name: 'Wed', orders: 289, profit: 3800 },
  { name: 'Thu', orders: 401, profit: 5200 },
  { name: 'Fri', orders: 378, profit: 4900 },
  { name: 'Sat', orders: 445, profit: 5800 },
  { name: 'Sun', orders: 398, profit: 5100 },
];

const sparklineData = [
  { value: 400 },
  { value: 430 },
  { value: 448 },
  { value: 470 },
  { value: 540 },
  { value: 580 },
  { value: 690 },
];

const recentOrders = [
  { id: '#ORD-2847', customer: 'Sarah Johnson', amount: '$234.50', status: 'completed', time: '2 min ago' },
  { id: '#ORD-2846', customer: 'Michael Chen', amount: '$189.99', status: 'processing', time: '5 min ago' },
  { id: '#ORD-2845', customer: 'Emma Wilson', amount: '$456.00', status: 'completed', time: '12 min ago' },
  { id: '#ORD-2844', customer: 'James Brown', amount: '$99.99', status: 'pending', time: '18 min ago' },
];

const activities = [
  { type: 'order', message: 'New order received from Premium Plan', time: '2 minutes ago', color: 'var(--success)' },
  { type: 'alert', message: 'Server response time increased by 15%', time: '1 hour ago', color: 'var(--warning)' },
  { type: 'campaign', message: 'Summer campaign launched successfully', time: '3 hours ago', color: 'var(--primary)' },
  { type: 'conversion', message: '12 new conversions from email campaign', time: '5 hours ago', color: 'var(--success)' },
];

const countryData = [
  { country: 'United States', orders: 1842, flag: '🇺🇸', percentage: 32 },
  { country: 'United Kingdom', orders: 1234, flag: '🇬🇧', percentage: 21 },
  { country: 'Germany', orders: 987, flag: '🇩🇪', percentage: 17 },
  { country: 'France', orders: 756, flag: '🇫🇷', percentage: 13 },
  { country: 'Canada', orders: 654, flag: '🇨🇦', percentage: 11 },
  { country: 'Others', orders: 387, flag: '🌍', percentage: 6 },
];

export function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="mb-2">E-Commerce Dashboard</h1>
        <p className="text-[color:var(--text-muted)]">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value="$45,231"
          delta={12.5}
          deltaLabel="vs last week"
          icon="revenue"
        />
        <KPICard
          title="Orders"
          value="2,145"
          delta={8.2}
          deltaLabel="vs last week"
          icon="orders"
        />
        <KPICard
          title="Average Order Value"
          value="$89.50"
          delta={-2.1}
          deltaLabel="vs last week"
          icon="aov"
        />
        <KPICard
          title="Conversion Rate"
          value="3.8%"
          delta={5.7}
          deltaLabel="vs last week"
          icon="conversion"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flippable Profit Card */}
        <FlippableCard
          title="Profit Overview"
          value="$32,450"
          delta={15.3}
          sparklineData={sparklineData}
        />

        {/* Traffic Source Card */}
        <TrafficSourceCard />
      </div>

      {/* Orders & Profit Chart */}
      <ChartPanel
        title="Orders & Profit"
        type="area"
        data={ordersData}
        dataKeys={['orders', 'profit']}
      />

      {/* Country Orders & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Country</CardTitle>
            <CardDescription>Top performing regions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((item, index) => (
                <div key={item.country}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <div className="font-medium">{item.country}</div>
                        <div className="text-sm text-[color:var(--text-muted)]">
                          {item.orders.toLocaleString()} orders
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  {index < countryData.length - 1 && <div className="h-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Targets */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Targets</CardTitle>
            <CardDescription>Progress towards monthly goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[color:var(--primary)]" />
                  <span className="font-medium">Total Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[color:var(--text-muted)]">$45,231</span>
                  <Badge className="bg-[color:var(--success)]">On Track</Badge>
                </div>
              </div>
              <Progress value={75} className="h-3" />
              <p className="text-xs text-[color:var(--text-muted)] mt-1">
                75% of $60,000 target
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[color:var(--info)]" />
                  <span className="font-medium">New Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[color:var(--text-muted)]">487</span>
                  <Badge className="bg-[color:var(--warning)]">At Risk</Badge>
                </div>
              </div>
              <Progress value={58} className="h-3" />
              <p className="text-xs text-[color:var(--text-muted)] mt-1">
                58% of 840 target
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[color:var(--success)]" />
                  <span className="font-medium">Order Fulfillment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[color:var(--text-muted)]">98.5%</span>
                  <Badge className="bg-[color:var(--success)]">Excellent</Badge>
                </div>
              </div>
              <Progress value={98.5} className="h-3" />
              <p className="text-xs text-[color:var(--text-muted)] mt-1">
                98.5% of 95% target
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest transactions from your store</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[color:var(--surface-muted)] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{order.id}</span>
                      <Badge
                        variant={order.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          order.status === 'completed'
                            ? 'bg-[color:var(--success)]'
                            : order.status === 'processing'
                            ? 'bg-[color:var(--primary)]'
                            : 'bg-[color:var(--warning)]'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-[color:var(--text-muted)]">
                      {order.customer}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.amount}</div>
                    <div className="text-sm text-[color:var(--text-muted)]">
                      {order.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Recent system events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: activity.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-[color:var(--text-muted)]" />
                      <span className="text-xs text-[color:var(--text-muted)]">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
