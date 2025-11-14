import React, { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Download, Maximize2 } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartPanelProps {
  title: string;
  tabs?: { id: string; label: string }[];
  type?: 'line' | 'area' | 'bar';
  data: any[];
  dataKeys: string[];
  colors?: string[];
}

const defaultColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function ChartPanel({ 
  title, 
  tabs, 
  type = 'line', 
  data, 
  dataKeys,
  colors = defaultColors 
}: ChartPanelProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || 'default');
  const [timeRange, setTimeRange] = useState('7d');

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div 
            className="bg-[color:var(--surface)] p-3 rounded-lg border border-[color:var(--border)]"
            style={{ boxShadow: 'var(--elevation-2)' }}
          >
            <p className="text-sm font-medium mb-2">{label}</p>
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[color:var(--text-muted)]">{entry.name}:</span>
                <span className="font-medium tabular-nums">{entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        );
      }
      return null;
    };

    if (type === 'area') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart {...commonProps}>
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors[index]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index]}
                strokeWidth={2}
                fill={`url(#gradient-${key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index]}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--text-muted)" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const content = (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3>{title}</h3>
          <div className="flex gap-1">
            {['7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {renderChart()}
    </>
  );

  if (tabs && tabs.length > 0) {
    return (
      <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {content}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    );
  }

  return (
    <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
      {content}
    </Card>
  );
}
