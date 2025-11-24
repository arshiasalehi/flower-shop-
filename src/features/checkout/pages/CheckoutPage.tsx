import type { FormEvent } from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/layout/Seo';

const steps = ['shipping', 'payment', 'review'] as const;
type Step = (typeof steps)[number];

export const CheckoutPage = () => {
  const [step, setStep] = useState<Step>('shipping');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center">
        <Seo title="Checkout" />
        <h1 className="text-3xl font-semibold text-ink">Order confirmed</h1>
        <p className="mt-3 text-sm text-ink/70">You will receive a confirmation email shortly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Seo title="Checkout" />
      <h1 className="text-3xl font-semibold text-ink">Checkout</h1>
      <ol className="flex gap-4 text-sm">
        {steps.map((item) => (
          <li
            key={item}
            className={`rounded-full px-4 py-2 ${step === item ? 'bg-brand text-white' : 'bg-slate-100 text-ink/60'}`}
          >
            {item}
          </li>
        ))}
      </ol>
      <form className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6" onSubmit={handleSubmit}>
        {step === 'shipping' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="First name" required />
            <Input label="Last name" required />
            <Input label="Address" required className="md:col-span-2" />
            <Input label="City" required />
            <Input label="Postal code" required />
            <Input label="Phone" required />
          </div>
        )}
        {step === 'payment' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Card number" required />
            <Input label="Name on card" required />
            <Input label="Expiry" required />
            <Input label="CVC" required />
          </div>
        )}
        {step === 'review' && (
          <div>
            <p className="text-sm text-ink/70">Review items, shipping method, and taxes before placing your order.</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="secondary" type="button" disabled={step === 'shipping'} onClick={() => setStep(steps[Math.max(0, steps.indexOf(step) - 1)])}>
            Back
          </Button>
          <Button type="submit">{step === 'review' ? 'Place order' : 'Continue'}</Button>
        </div>
      </form>
    </div>
  );
};
