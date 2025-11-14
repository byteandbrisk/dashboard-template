import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, ShoppingCart, Users, Percent } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  delta: number;
  deltaLabel?: string;
  icon: 'revenue' | 'orders' | 'aov' | 'conversion' | 'users' | 'trend';
  loading?: boolean;
}

const iconMap = {
  revenue: DollarSign,
  orders: ShoppingCart,
  aov: DollarSign,
  conversion: Percent,
  users: Users,
  trend: TrendingUp,
};

export function KPICard({ title, value, delta, deltaLabel = 'vs last period', icon, loading }: KPICardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const Icon = iconMap[icon];
  const isPositive = delta >= 0;

  useEffect(() => {
    if (loading) return;
    
    const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;

    let start = 0;
    const duration = 800;
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setAnimatedValue(numericValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, loading]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-3">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-8 w-32 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="p-6 hover:shadow-[var(--elevation-3)] transition-all duration-[var(--duration-fast)] cursor-pointer hover:scale-[1.02]"
      style={{ boxShadow: 'var(--elevation-2)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[color:var(--text-muted)] mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="tabular-nums">
              {typeof value === 'string' && value.includes('$') 
                ? `$${animatedValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                : typeof value === 'string' && value.includes('%')
                ? `${animatedValue.toFixed(1)}%`
                : animatedValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </h3>
          </div>
          <div className={`flex items-center gap-1 mt-2 text-sm ${
            isPositive ? 'text-[color:var(--success)]' : 'text-[color:var(--danger)]'
          }`}>
            {isPositive ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="tabular-nums">{Math.abs(delta)}%</span>
            <span className="text-[color:var(--text-muted)] ml-1">{deltaLabel}</span>
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary-light)' }}
        >
          <Icon className="w-6 h-6" style={{ color: 'var(--primary)' }} />
        </div>
      </div>
    </Card>
  );
}
