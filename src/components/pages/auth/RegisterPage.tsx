import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Separator } from '../../ui/separator';
import { LayoutDashboard, Mail, Lock, User, Eye, EyeOff, Chrome, Github } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface RegisterPageProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-[color:var(--success)] to-[color:var(--primary)] relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1742942965475-25d3b7bf2bfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzYxNjM3MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Abstract pattern"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-md text-white space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl">Start Your Journey</h2>
            <p className="text-lg opacity-90">
              Join thousands of teams already using Admin Pro to manage their business operations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
              <div className="text-3xl font-bold mb-1">10k+</div>
              <div className="text-sm opacity-80">Active Users</div>
            </div>
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm opacity-80">Uptime SLA</div>
            </div>
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-80">Integrations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="mb-2">Create an account</h1>
            <p className="text-[color:var(--text-muted)]">
              Get started with your free account today
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

          {/* Register Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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
                  <p className="text-xs text-[color:var(--text-muted)]">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, terms: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer leading-relaxed"
                  >
                    I agree to the{' '}
                    <a href="#" className="text-[color:var(--primary)] hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[color:var(--primary)] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={!formData.terms}>
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign In Link */}
          <div className="text-center text-sm">
            <span className="text-[color:var(--text-muted)]">Already have an account? </span>
            <button
              onClick={onNavigateToLogin}
              className="text-[color:var(--primary)] hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
