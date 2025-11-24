import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { footerAboutLinks, legalLinks } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { CookieSettingsModal } from './CookieSettingsModal';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [cookieModal, setCookieModal] = useState(false);

  useEffect(() => {
    const handler = () => setCookieModal(true);
    window.addEventListener('open-cookie-settings', handler as EventListener);
    return () => window.removeEventListener('open-cookie-settings', handler as EventListener);
  }, []);

  return (
    <footer className="bg-slate-50 text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About our flower shop</h3>
          <ul className="space-y-1 text-sm text-ink/70">
            {footerAboutLinks.map((link) => (
              <li key={link.slug}>
                <Link to={`/${link.slug}`} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="mt-4 space-y-1 text-sm text-ink/70">
            {legalLinks.map((link) => (
              <li key={link.slug}>
                <Link to={`/${link.slug}`} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="text-left text-sm text-brand underline"
                onClick={() => setCookieModal(true)}
              >
                Manage cookie settings
              </button>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="text-sm text-ink/70">Weekly design dispatches, care tips, and early access drops.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              className="flex-1 rounded-full border border-slate-200 px-4 py-2"
            />
            <Button type="button" onClick={() => setNewsletterEmail('')}>
              Join
            </Button>
          </div>
        </div>
        <div className="space-y-3 text-sm text-ink/70">
          <h3 className="text-lg font-semibold">Follow</h3>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="underline">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="underline">
              Pinterest
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="underline">
              TikTok
            </a>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Fleuriste Montréal</p>
        </div>
      </div>
      <CookieSettingsModal open={cookieModal} onClose={() => setCookieModal(false)} />
    </footer>
  );
};
