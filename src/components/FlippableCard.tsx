import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface FlippableCardProps {
  title: string;
  value: string;
  delta: number;
  sparklineData: any[];
  detailedChart?: React.ReactNode;
}

export function FlippableCard({ title, value, delta, sparklineData, detailedChart }: FlippableCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative h-max" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-full transition-transform duration-[600ms]`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <Card
          className="absolute inset-0 p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: 'var(--elevation-2)',
            position: 'unset'
          }}
        >
          <div className="flex-1">
            <h4 className="text-[color:var(--text-muted)] mb-4">{title}</h4>
            <div className="mb-2">
              <h2 className="tabular-nums">{value}</h2>
            </div>
            <div
              className={`inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md ${
                delta >= 0
                  ? 'bg-[color:var(--success-light)] text-[color:var(--success)]'
                  : 'bg-[color:var(--danger-light)] text-[color:var(--danger)]'
              }`}
            >
              <span className="tabular-nums">{delta >= 0 ? '+' : ''}{delta}%</span>
              <span>vs last period</span>
            </div>
            <div className="mt-4 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setFlipped(true)}
          >
            View details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Card>

        {/* Back */}
        <Card
          className="absolute inset-0 p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: 'var(--elevation-2)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4>{title} - Details</h4>
            <Button variant="ghost" size="icon" onClick={() => setFlipped(false)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1">
            {detailedChart || (
              <div className="h-full flex items-center justify-center text-[color:var(--text-muted)]">
                Detailed chart view
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
