import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

const HomePage = lazy(() => import('@/features/content/HomePage').then((module) => ({ default: module.HomePage })));
const CatalogPage = lazy(() => import('@/features/catalog/pages/CatalogPage').then((module) => ({ default: module.CatalogPage })));
const ProductPage = lazy(() => import('@/features/product/pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })));
const CartPage = lazy(() => import('@/features/cart/pages/CartPage').then((module) => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage').then((module) => ({ default: module.CheckoutPage })));
const SignInPage = lazy(() => import('@/features/auth/pages/SignInPage').then((module) => ({ default: module.SignInPage })));
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage').then((module) => ({ default: module.SignUpPage })));
const AccountPage = lazy(() => import('@/features/account/pages/AccountDashboard').then((module) => ({ default: module.AccountDashboard })));
const ContentPage = lazy(() => import('@/features/content/pages/ContentPage').then((module) => ({ default: module.ContentPage })));
const ContactPage = lazy(() => import('@/features/content/pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const StoreLocatorPage = lazy(() => import('@/features/store-locator/pages/StoreLocatorPage').then((module) => ({ default: module.StoreLocatorPage })));
const FlowerReferencePage = lazy(() => import('@/features/content/pages/FlowerReferencePage').then((module) => ({ default: module.FlowerReferencePage })));
const FlowerReferenceDetailPage = lazy(() => import('@/features/content/pages/FlowerReferenceDetailPage').then((module) => ({ default: module.FlowerReferenceDetailPage })));
const BlogListPage = lazy(() => import('@/features/content/pages/BlogListPage').then((module) => ({ default: module.BlogListPage })));
const BlogPostPage = lazy(() => import('@/features/content/pages/BlogPostPage').then((module) => ({ default: module.BlogPostPage })));
const SubscriptionsPage = lazy(() => import('@/features/content/pages/SubscriptionsPage').then((module) => ({ default: module.SubscriptionsPage })));
const LegalPage = lazy(() => import('@/features/legal/pages/LegalPage').then((module) => ({ default: module.LegalPage })));
const SearchPage = lazy(() => import('@/features/catalog/pages/SearchPage').then((module) => ({ default: module.SearchPage })));

const withSuspense = (component: React.ReactNode) => <Suspense fallback={<div className="py-10 text-sm text-ink/60">Loading…</div>}>{component}</Suspense>;

const contentRoute = (slug: string) => withSuspense(<ContentPage slugOverride={slug} />);
const legalRoute = (slug: string) => withSuspense(<LegalPage slugOverride={slug} />);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'catalog/:categorySlug', element: withSuspense(<CatalogPage />) },
      { path: 'occasions/:occasionSlug', element: withSuspense(<CatalogPage />) },
      { path: 'product/:slug', element: withSuspense(<ProductPage />) },
      { path: 'cart', element: withSuspense(<CartPage />) },
      { path: 'checkout', element: withSuspense(<CheckoutPage />) },
      { path: 'auth/sign-in', element: withSuspense(<SignInPage />) },
      { path: 'auth/sign-up', element: withSuspense(<SignUpPage />) },
      { path: 'account', element: withSuspense(<AccountPage />) },
      { path: 'about', element: contentRoute('about') },
      { path: 'montreal-florist', element: contentRoute('montreal-florist') },
      { path: 'faq', element: contentRoute('faq') },
      { path: 'careers', element: contentRoute('careers') },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'store-locator', element: withSuspense(<StoreLocatorPage />) },
      { path: 'flower-reference', element: withSuspense(<FlowerReferencePage />) },
      { path: 'flower-reference/:slug', element: withSuspense(<FlowerReferenceDetailPage />) },
      { path: 'blog', element: withSuspense(<BlogListPage />) },
      { path: 'blog/:slug', element: withSuspense(<BlogPostPage />) },
      { path: 'subscriptions', element: withSuspense(<SubscriptionsPage />) },
      { path: 'terms', element: legalRoute('terms') },
      { path: 'privacy', element: legalRoute('privacy') },
      { path: 'shipping', element: legalRoute('shipping') },
      { path: 'do-not-sell', element: legalRoute('do-not-sell') },
      { path: 'search', element: withSuspense(<SearchPage />) },
      { path: '*', element: <div className="py-20 text-center text-sm text-ink/70">Not found.</div> }
    ]
  }
]);
