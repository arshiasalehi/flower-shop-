import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, UserRound } from 'lucide-react';
import logoUrl from '@/assets/logo.svg';
import { flowerCategories, occasionCategories, footerAboutLinks, legalLinks } from '@/data/navigation';
import { Drawer } from '@/components/ui/Drawer';
import { MegaMenu } from './MegaMenu';
import { SearchBar } from './SearchBar';
import { MiniCart } from './MiniCart';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const openCookieSettings = () => window.dispatchEvent(new Event('open-cookie-settings'));

  const toggleSection = (id: string) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="shrink-0" aria-label="Fleuriste home">
            <img src={logoUrl} alt="Fleuriste" className="h-10 w-auto" />
          </Link>
          <SearchBar />
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-slate-100 p-2 md:hidden"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-ink" />
            </button>
            <Link
              to="/account"
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-ink"
            >
              <UserRound className="h-4 w-4" />
              Account
            </Link>
            <MiniCart />
          </div>
        </div>
        <nav className="hidden items-center justify-center gap-8 text-sm font-medium text-ink/70 md:flex">
          <div className="relative group">
            <button className="flex items-center gap-2">Flowers & plants</button>
            <MegaMenu type="flowers" />
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2">Occasions</button>
            <MegaMenu type="occasions" />
          </div>
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button className="flex items-center gap-2">
              About
              <ChevronDown className="h-4 w-4" />
            </button>
            {aboutOpen && (
              <div className="absolute left-1/2 top-full z-30 min-w-[220px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white py-4 shadow-card">
                <ul className="space-y-2 px-5">
                  {footerAboutLinks.map((link) => (
                    <li key={link.slug}>
                      <Link to={`/${link.slug}`} className="text-sm text-ink/80 hover:text-brand">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setLegalOpen(true)}
            onMouseLeave={() => setLegalOpen(false)}
          >
            <button className="flex items-center gap-2">
              Legal
              <ChevronDown className="h-4 w-4" />
            </button>
            {legalOpen && (
              <div className="absolute left-1/2 top-full z-30 min-w-[220px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white py-4 shadow-card">
                <ul className="space-y-2 px-5">
                  {legalLinks.map((link) => (
                    <li key={link.slug}>
                      <Link to={`/${link.slug}`} className="text-sm text-ink/80 hover:text-brand">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button onClick={openCookieSettings} className="text-sm text-ink/80 hover:text-brand">
                      Manage cookie settings
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link to="/subscriptions" className="text-ink hover:text-brand">
            Subscriptions
          </Link>
          <Link to="/blog" className="text-ink hover:text-brand">
            Journal
          </Link>
          <a href="#newsletter" className="text-ink hover:text-brand">
            Newsletter
          </a>
        </nav>
      </div>
      <Drawer open={mobileMenuOpen} onClose={closeMobileMenu} side="left" title="Browse">
        <div className="space-y-6 text-ink">
          <Link to="/" onClick={closeMobileMenu} className="block text-lg font-semibold">
            Home
          </Link>
          <Link to="/subscriptions" onClick={closeMobileMenu} className="block text-lg font-semibold">
            Subscriptions
          </Link>
          {[
            {
              id: 'flowers',
              label: 'Flowers & plants',
              links: flowerCategories.map((item) => ({ label: item.label, href: `/catalog/${item.slug}` }))
            },
            {
              id: 'occasions',
              label: 'Occasions',
              links: occasionCategories.map((item) => ({ label: item.label, href: `/occasions/${item.slug}` }))
            },
            {
              id: 'about',
              label: 'About our flower shop',
              links: footerAboutLinks.map((link) => ({ label: link.label, href: `/${link.slug}` }))
            },
            {
              id: 'legal',
              label: 'Legal',
              links: legalLinks.map((link) => ({ label: link.label, href: `/${link.slug}` })),
              extra: { label: 'Manage cookie settings', action: () => { closeMobileMenu(); openCookieSettings(); } }
            }
          ].map((section) => (
            <div key={section.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-semibold text-ink"
                onClick={() => toggleSection(section.id)}
              >
                {section.label}
                <ChevronDown
                  className={`h-4 w-4 transition ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSections[section.id] && (
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} onClick={closeMobileMenu} className="text-sm text-ink/80">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {section.extra && (
                    <li>
                      <button onClick={section.extra.action} className="text-sm text-ink/80">
                        {section.extra.label}
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          ))}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand">Newsletter</p>
            <p className="text-sm text-ink/70">
              Join our design dispatches for launches, care tips, and local events.
            </p>
            <a href="#newsletter" onClick={closeMobileMenu} className="mt-2 inline-flex text-sm text-brand underline">
              Jump to signup
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
