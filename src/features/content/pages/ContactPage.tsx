import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/layout/Seo';

export const ContactPage = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  return (
    <div className="grid gap-8 rounded-3xl border border-slate-100 bg-white/90 p-8 lg:grid-cols-2">
      <Seo title="Contact" description="Reach our concierge team daily 7 a.m. – 9 p.m." />
      <div>
        <h1 className="text-3xl font-semibold text-ink">Contact us</h1>
        <p className="mt-2 text-sm text-ink/70">Concierge available daily from 7 a.m. – 9 p.m.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setStatus('submitted');
          }}
        >
          <Input
            label="Name"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
          <Input
            label="Email"
            type="email"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <label className="flex flex-col gap-2 text-sm text-ink">
            Message
            <textarea
              value={values.message}
              onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
              required
              rows={5}
              className="rounded-2xl border border-slate-200 p-3"
            />
          </label>
          <Button type="submit">Send</Button>
          {status === 'submitted' && <p className="text-xs text-emerald-600">Message received — we will reply within 1 business hour.</p>}
        </form>
      </div>
      <div className="rounded-3xl bg-slate-100 p-6">
        <p className="text-sm text-ink/70">245 Rue Sainte-Catherine Ouest, Montréal QC</p>
        <p className="mt-2 text-sm text-ink/70">+1 (438) 798-2121</p>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.307!2d-73.569!3d45.507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a43a25a!2sDowntown%20Montreal!5e0!3m2!1sen!2sca!4v0000000000"
          className="mt-6 h-72 w-full rounded-2xl border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};
