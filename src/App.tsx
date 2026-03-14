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
  return (
    <CartProvider>
      <Router>
        <ScrollManager />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categoria/:category" element={<CategoryPage />} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
