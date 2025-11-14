import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Separator } from '../../ui/separator';
import { LayoutDashboard, Mail, Lock, Eye, EyeOff, Chrome, Github } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-6 bg-[color:var(--bg)]">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[color:var(--primary)] flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">Admin Pro</span>
          </div>

          {/* Header */}
          <div>
            <h1 className="mb-2">Welcome back</h1>
            <p className="text-[color:var(--text-muted)]">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full gap-2" type="button">
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full gap-2" type="button">
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[color:var(--bg)] px-2 text-[color:var(--text-muted)]">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      className="text-sm text-[color:var(--primary)] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, remember: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm cursor-pointer"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-[color:var(--text-muted)]">Don't have an account? </span>
            <button
              onClick={onNavigateToRegister}
              className="text-[color:var(--primary)] hover:underline"
            >
              Sign up for free
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--info)] relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1742942965475-25d3b7bf2bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzYxNjM3MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Abstract pattern"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-md text-white space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl">Powerful Analytics</h2>
            <p className="text-lg opacity-90">
              Get real-time insights into your business with our comprehensive analytics dashboard.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Real-time data visualization</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Advanced reporting tools</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Team collaboration features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
