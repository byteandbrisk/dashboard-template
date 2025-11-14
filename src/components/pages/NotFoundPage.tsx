import React from 'react';
import { Button } from '../ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export function NotFoundPage({ onNavigateHome }: NotFoundPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[color:var(--bg)] to-[color:var(--surface-muted)]">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[180px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--info)]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-[color:var(--primary-light)] opacity-20 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl">Page Not Found</h1>
          <p className="text-lg text-[color:var(--text-muted)] max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button onClick={onNavigateHome} size="lg" className="gap-2">
            <Home className="w-5 h-5" />
            Go to Dashboard
          </Button>
          <Button variant="outline" size="lg" className="gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-[color:var(--border)]">
          <p className="text-sm text-[color:var(--text-muted)] mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onNavigateHome}
              className="text-sm text-[color:var(--primary)] hover:underline"
            >
              Dashboard
            </button>
            <button
              onClick={() => {}}
              className="text-sm text-[color:var(--primary)] hover:underline"
            >
              Documentation
            </button>
            <button
              onClick={() => {}}
              className="text-sm text-[color:var(--primary)] hover:underline"
            >
              Support
            </button>
            <button
              onClick={() => {}}
              className="text-sm text-[color:var(--primary)] hover:underline"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="pt-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search for pages..."
                className="w-full pl-12 pr-4 py-3 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
