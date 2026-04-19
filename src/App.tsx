import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FloatingCartButton from './components/FloatingCartButton';
import ScrollManager from './components/ScrollManager';
import SiteSeo from './components/SiteSeo';
import SiteHeader from './components/SiteHeader';
import { CartProvider } from './context/CartContext';
import AppLoader from './components/AppLoader';
import { StorefrontProvider, useStorefront } from './context/StorefrontContext';
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, toAbsoluteSiteUrl } from './lib/siteMeta';

const PremiumCollection = lazy(() => import('./components/PremiumCollection'));
const ExclusivePerfumes = lazy(() => import('./components/ExclusivePerfumes'));
const PromoSection = lazy(() => import('./components/PromoSection'));
const Footer = lazy(() => import('./components/Footer'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CartPage = lazy(() => import('./pages/CartPage'));

const SectionPlaceholder = ({ height = 'min-h-[320px]' }: { height?: string }) => (
  <div className={`mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-12 ${height}`}>
    <div className="h-px w-full max-w-xl overflow-hidden rounded-full bg-[#d4af37]/10">
      <div className="h-full w-1/2 animate-[loaderSweep_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
    </div>
  </div>
);

function HomePage() {
  const {
    bootstrap: { brand, home }
  } = useStorefront();
  const description = `${home.hero.subtitle} ${home.footer.description}`;

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <SiteSeo
        title={`${brand.name} | ${brand.tagline}`}
        description={description}
        image={DEFAULT_OG_IMAGE}
        keywords={DEFAULT_KEYWORDS}
        structuredData={[
          {
            '@type': 'Organization',
            name: brand.name,
            alternateName: brand.shortName,
            description: home.footer.description,
            url: toAbsoluteSiteUrl('/'),
            logo: toAbsoluteSiteUrl('/logo-horizontal.svg'),
            image: toAbsoluteSiteUrl(DEFAULT_OG_IMAGE),
            email: home.footer.contact.email,
            telephone: home.footer.contact.phone
          },
          {
            '@type': 'WebSite',
            name: brand.name,
            url: toAbsoluteSiteUrl('/'),
            description,
            inLanguage: 'es-BO'
          },
          {
            '@type': 'Store',
            name: brand.name,
            description: home.footer.description,
            url: toAbsoluteSiteUrl('/'),
            image: toAbsoluteSiteUrl(DEFAULT_OG_IMAGE),
            telephone: home.footer.contact.phone,
            email: home.footer.contact.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: home.footer.contact.address,
              addressCountry: 'BO'
            }
          }
        ]}
      />
      <Hero />
      <Categories />

      <Suspense fallback={<SectionPlaceholder />}>
        <PremiumCollection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder />}>
        <ExclusivePerfumes />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder />}>
        <PromoSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="min-h-[220px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const finishBoot = () => {
      window.setTimeout(() => {
        setIsAppReady(true);
      }, 320);
    };

    if (document.readyState === 'complete') {
      finishBoot();
      return;
    }

    window.addEventListener('load', finishBoot, { once: true });

    return () => window.removeEventListener('load', finishBoot);
  }, []);

  return (
    <CartProvider>
      <StorefrontProvider>
        <>
          {!isAppReady && <AppLoader />}

          <Router>
            <ScrollManager />
            <SiteHeader />
            <FloatingCartButton />
            <Suspense fallback={<AppLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categoria/:category" element={<CategoryPage />} />
                <Route path="/carrito" element={<CartPage />} />
              </Routes>
            </Suspense>
          </Router>
        </>
      </StorefrontProvider>
    </CartProvider>
  );
}

export default App;
