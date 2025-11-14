import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Check, Sparkles } from 'lucide-react';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    description: 'Perfect for trying out our platform',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Up to 1,000 monthly visits',
      'Basic analytics',
      '5 team members',
      'Community support',
      'Basic integrations',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    description: 'Best for growing businesses',
    monthlyPrice: 49,
    yearlyPrice: 470,
    features: [
      'Up to 100,000 monthly visits',
      'Advanced analytics',
      'Unlimited team members',
      'Priority support',
      'All integrations',
      'Custom domains',
      'API access',
      'Advanced security',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    description: 'For large-scale operations',
    monthlyPrice: 199,
    yearlyPrice: 1910,
    features: [
      'Unlimited monthly visits',
      'Enterprise analytics',
      'Unlimited team members',
      'Dedicated support',
      'All integrations',
      'Custom domains',
      'API access',
      'Advanced security',
      'SLA guarantee',
      'Custom contracts',
      'On-premise deployment',
    ],
    cta: 'Talk to Sales',
  },
];

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="p-6 fade-in">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Pricing</Badge>
          <h2 className="mb-4">Choose the perfect plan for your needs</h2>
          <p className="text-lg text-[color:var(--text-muted)] mb-8 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include a 14-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-[color:var(--surface-muted)] rounded-lg">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-[color:var(--text)]' : 'text-[color:var(--text-muted)]'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-[color:var(--text)]' : 'text-[color:var(--text-muted)]'}`}>
              Yearly
            </span>
            <Badge variant="outline" className="bg-[color:var(--success-light)] text-[color:var(--success)] border-[color:var(--success)]">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`p-8 relative transition-all hover:shadow-[var(--elevation-4)] fade-in ${
                tier.highlighted
                  ? 'border-2 border-[color:var(--primary)] shadow-[var(--elevation-3)]'
                  : 'shadow-[var(--elevation-2)]'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[color:var(--primary)] gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="mb-2">{tier.name}</h4>
                <p className="text-sm text-[color:var(--text-muted)] mb-6">
                  {tier.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-semibold">$</span>
                    <span className="tabular-nums" style={{ fontSize: '3rem', lineHeight: 1 }}>
                      {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-[color:var(--text-muted)]">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && tier.monthlyPrice > 0 && (
                    <p className="text-sm text-[color:var(--text-muted)] mt-2">
                      ${((tier.yearlyPrice / 12).toFixed(2))} per month
                    </p>
                  )}
                </div>

                <Button
                  className="w-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </div>

              <div className="space-y-3 pt-6 border-t border-[color:var(--border)]">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--success)' }}
                    />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans at any time?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
              },
              {
                q: 'What happens when I exceed my plan limits?',
                a: 'We will notify you when you approach your limits. You can upgrade your plan or we will temporarily throttle service.',
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 fade-in"
                style={{
                  boxShadow: 'var(--elevation-1)',
                  animationDelay: `${(index + 3) * 100}ms`,
                }}
              >
                <h5 className="mb-2">{faq.q}</h5>
                <p className="text-[color:var(--text-muted)]">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-12 bg-[color:var(--surface-muted)] rounded-2xl">
          <h3 className="mb-4">Still have questions?</h3>
          <p className="text-lg text-[color:var(--text-muted)] mb-6">
            Our sales team is happy to help you find the right plan.
          </p>
          <Button size="lg">Talk to Sales</Button>
        </div>
      </div>
    </div>
  );
}
