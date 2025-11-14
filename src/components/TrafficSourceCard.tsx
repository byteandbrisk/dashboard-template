import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface TrafficSource {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const trafficSources: TrafficSource[] = [
  { name: 'Direct', value: 12450, percentage: 32, color: 'var(--chart-1)' },
  { name: 'Organic Search', value: 10200, percentage: 26, color: 'var(--chart-2)' },
  { name: 'Paid Search', value: 8900, percentage: 23, color: 'var(--chart-3)' },
  { name: 'Social Media', value: 4200, percentage: 11, color: 'var(--chart-4)' },
  { name: 'Referral', value: 2100, percentage: 5, color: 'var(--chart-5)' },
  { name: 'Email', value: 1150, percentage: 3, color: 'var(--chart-6)' },
];

export function TrafficSourceCard() {
  const [expanded, setExpanded] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  // Trigger animation when expanded changes
  useEffect(() => {
    if (expanded) {
      // Start at 0%
      setAnimateProgress(false);
      
      // Double RAF ensures DOM is painted before triggering transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateProgress(true);
        });
      });
    } else {
      // Reset animation state when collapsed
      setAnimateProgress(false);
    }
  }, [expanded]);

  return (
    <Card className="p-6 h-min min-h h-max" style={{ boxShadow: 'var(--elevation-2)', height: 'min-content' }}>
      <div className="flex items-center justify-between mb-6">
        <h3>Traffic Sources</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="gap-2"
        >
          {expanded ? 'Collapse' : 'Expand'}
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-4">
          {trafficSources.map((source) => (
            <div key={source.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm font-medium">{source.name}</span>
                </div>
                {expanded && (
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[color:var(--text-muted)] tabular-nums">
                      {source.value.toLocaleString()} visits
                    </span>
                    <span className="font-medium tabular-nums" style={{ color: source.color }}>
                      {source.percentage}%
                    </span>
                  </div>
                )}
              </div>
              <div className="relative h-2 bg-[color:var(--surface-muted)] rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                  style={{
                    width: animateProgress ? `${source.percentage}%` : '0%',
                    backgroundColor: source.color,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    )}

      {expanded && (
        <div className="mt-6 pt-6 border-t border-[color:var(--border)]">
          <div className="flex justify-between text-sm">
            <span className="text-[color:var(--text-muted)]">Total Visitors</span>
            <span className="font-medium tabular-nums">
              {trafficSources.reduce((sum, s) => sum + s.value, 0).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
