import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

export function IntroductionPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">👋 Welcome to the Demo</h1>
        <p className="text-[color:var(--text-muted)]">
          Before you explore the features…
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main Content (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Introduction Card */}
          <Card className="p-8" style={{ boxShadow: 'var(--elevation-2)' }}>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[color:var(--primary)]" />
                  About This Project
                </h2>
                <div className="space-y-4 text-[color:var(--text-muted)] leading-relaxed">
                  <p>
                    This is a <strong className="text-[color:var(--text)] font-medium">sample admin dashboard</strong> built to demonstrate our front-end engineering, UX, and component design capabilities.
                  </p>
                  <p>
                    While not all features are fully functional, the goal is to give you a feel of our <strong className="text-[color:var(--text)] font-medium">design precision</strong>, <strong className="text-[color:var(--text)] font-medium">data visualization depth</strong>, and <strong className="text-[color:var(--text)] font-medium">modular structure</strong>.
                  </p>
                  <p>
                    Every chart, card, and animation you see has been carefully crafted to highlight how quickly we can adapt a real-world product UI to a client's needs.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[color:var(--border)]">
                <h3 className="text-lg font-semibold mb-3">Our Philosophy</h3>
                <p className="text-[color:var(--text-muted)] leading-relaxed">
                  Build it <strong className="text-[color:var(--text)] font-medium">clean</strong>, build it <strong className="text-[color:var(--text)] font-medium">fast</strong>, build it <strong className="text-[color:var(--text)] font-medium">scalable</strong>.
                </p>
              </div>
            </div>
          </Card>

          {/* Disclaimer Card */}
          <Card 
            className="p-6 border-l-4" 
            style={{ 
              boxShadow: 'var(--elevation-1)',
              borderLeftColor: 'var(--warning)',
              backgroundColor: 'var(--warning-light)'
            }}
          >
            <div className="flex gap-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--warning)' }} />
              <div>
                <h3 className="font-semibold mb-2 text-[color:var(--text)]">Disclaimer</h3>
                <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">
                  This is a <strong>front-end prototype</strong>. Some analytics, charts, and integrations are simulated for visual demonstration purposes. The focus is on showcasing UI/UX capabilities rather than backend functionality.
                </p>
              </div>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard">
            <Button 
              size="lg"
              className="gap-2 bg-[color:var(--primary)] text-white hover:opacity-90"
              style={{ boxShadow: 'var(--elevation-2)' }}
            >
              <ArrowRight className="w-4 h-4" />
              Explore Dashboard
            </Button>
            </Link>
            <Link href="/contact">
            <Button 
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </Button>
            </Link>
          </div>
        </div>

        {/* Right: Feature Highlights */}
        <div className="space-y-6">
          {/* What's Included Card */}
          <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
            <h3 className="font-semibold mb-4">What's Included</h3>
            <ul className="space-y-3">
              {[
                { label: 'Modern Dashboard UI', color: 'var(--chart-1)' },
                { label: 'Interactive Charts', color: 'var(--chart-2)' },
                { label: 'Data Visualization', color: 'var(--chart-3)' },
                { label: 'Responsive Design', color: 'var(--chart-4)' },
                { label: 'Dark Mode Support', color: 'var(--chart-5)' },
                { label: 'Component Library', color: 'var(--chart-6)' },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-[color:var(--text-muted)]">{item.label}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Tech Stack Card */}
          <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
            <h3 className="font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Next.js 14',
                'TypeScript',
                'Tailwind CSS',
                'Radix UI',
                'Recharts',
                'React Hooks',
              ].map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--surface-muted)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats Card */}
          <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Components', value: '40+' },
                { label: 'Pages', value: '10+' },
                { label: 'Charts', value: '15+' },
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-[color:var(--text-muted)]">{stat.label}</span>
                  <span className="text-lg font-semibold tabular-nums" style={{ color: 'var(--primary)' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

