import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { BackToTop } from '@/components/layout/BackToTop';

export const MainLayout = () => (
  <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-white to-white">
    <AnnouncementBar />
    <Header />
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <Outlet />
    </main>
    <Footer />
    <CookieBanner />
    <BackToTop />
  </div>
);
