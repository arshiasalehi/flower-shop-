import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/layout/Seo';

const plans = [
  { name: 'Weekly', price: 185, perks: ['Fresh drop every Monday', 'Complimentary vase refresh', 'Priority support'] },
  { name: 'Bi-weekly', price: 120, perks: ['Rotating palettes', 'Pause anytime', 'Styling hotline'] },
  { name: 'Monthly', price: 90, perks: ['Seasonal showcase', 'Card concierge', 'Member pricing'] }
];

export const SubscriptionsPage = () => (
  <div className="space-y-8">
    <Seo title="Subscriptions" description="Weekly, bi-weekly, and monthly floral plans." />
    <header>
      <p className="text-xs uppercase tracking-[0.3em] text-brand">Subscriptions</p>
      <h1 className="text-4xl font-semibold text-ink">Keep your spaces blooming</h1>
      <p className="mt-2 text-sm text-ink/70">Flexible plans with 10% savings and concierge service.</p>
    </header>
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div key={plan.name} className="rounded-3xl border border-slate-100 bg-white p-6 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-brand">{plan.name}</p>
          <p className="mt-4 text-3xl font-semibold text-ink">${plan.price}</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {plan.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <Button className="mt-6" fullWidth>
            Start plan
          </Button>
        </div>
      ))}
    </div>
  </div>
);
