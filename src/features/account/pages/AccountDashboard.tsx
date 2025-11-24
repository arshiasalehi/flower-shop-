import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/auth.store';
import { formatDate } from '@/lib/dates';
import { nanoid } from 'nanoid';
import { Seo } from '@/components/layout/Seo';

export const AccountDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const addReminder = useAuthStore((state) => state.addReminder);
  const [reminder, setReminder] = useState({
    label: '',
    date: '',
    notes: ''
  });

  if (!user) {
    return (
      <div>
        <Seo title="Account" />
        <p className="text-sm text-ink/70">Sign in to manage your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Seo title="Account" />
      <div className="rounded-3xl border border-slate-100 bg-white/90 p-6">
        <h1 className="text-3xl font-semibold text-ink">Welcome back, {user.name}</h1>
        <p className="mt-2 text-sm text-ink/70">{user.email}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200" aria-label="Profile avatar" />
          <Button variant="secondary" type="button" onClick={() => alert('Mock upload coming soon!')}>
            Upload profile image
          </Button>
        </div>
      </div>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">Addresses</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink/70">
            {user.addresses.map((address) => (
              <li key={address.id}>
                <strong>{address.label}</strong>
                <br />
                {address.street}, {address.city}, {address.province} {address.postalCode}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">Special occasion reminders</h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!reminder.label || !reminder.date) return;
              addReminder({ id: nanoid(), label: reminder.label, date: reminder.date, notes: reminder.notes });
              setReminder({ label: '', date: '', notes: '' });
            }}
          >
            <Input label="Name / occasion" value={reminder.label} onChange={(event) => setReminder((prev) => ({ ...prev, label: event.target.value }))} />
            <Input label="Date" type="date" value={reminder.date} onChange={(event) => setReminder((prev) => ({ ...prev, date: event.target.value }))} />
            <Input label="Notes" value={reminder.notes} onChange={(event) => setReminder((prev) => ({ ...prev, notes: event.target.value }))} />
            <Button type="submit">Save reminder</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {user.reminders.map((item) => (
              <li key={item.id}>
                <strong>{item.label}</strong> — {item.date ? formatDate(item.date) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-100 bg-white p-6">
        <h2 className="text-xl font-semibold text-ink">Order history</h2>
        <p className="mt-2 text-sm text-ink/70">Order history syncing with POS soon. For now, contact concierge for receipts.</p>
      </section>
    </div>
  );
};
