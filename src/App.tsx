import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ScrollManager from './components/ScrollManager';
import SiteHeader from './components/SiteHeader';
import { CartProvider } from './context/CartContext';
import AppLoader from './components/AppLoader';

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
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
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
      <>
        {!isAppReady && <AppLoader />}

        <Router>
          <ScrollManager />
          <SiteHeader />
          <Suspense fallback={<AppLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categoria/:category" element={<CategoryPage />} />
              <Route path="/carrito" element={<CartPage />} />
            </Routes>
          </Suspense>
        </Router>
      </>
    </CartProvider>
  );
}

export default App;
