import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Categories from './components/Categories';
import PremiumCollection from './components/PremiumCollection';
import ExclusivePerfumes from './components/ExclusivePerfumes';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
