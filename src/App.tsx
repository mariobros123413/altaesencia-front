import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Categories from './components/Categories';
import PremiumCollection from './components/PremiumCollection';
import ExclusivePerfumes from './components/ExclusivePerfumes';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import ScrollManager from './components/ScrollManager';
import SiteHeader from './components/SiteHeader';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AppLoader from './components/AppLoader';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <Hero />
      <Categories />
      <PremiumCollection />
      <ExclusivePerfumes />
      <PromoSection />
      <Footer />
    </div>
  );
}

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const finishBoot = () => {
      window.setTimeout(() => {
        setIsAppReady(true);
      }, 850);
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            <Route path="/carrito" element={<CartPage />} />
          </Routes>
        </Router>
      </>
    </CartProvider>
  );
}

export default App;
