import { ShoppingBag } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FloatingCartButton = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const isCartPage = location.pathname === '/carrito';

  if (isCartPage) {
    return null;
  }

  return (
    <NavLink
      to="/carrito"
      aria-label="Ir al carrito"
      className={({ isActive }) =>
        [
          'fixed bottom-4 left-4 z-40 inline-flex items-center gap-3 rounded-full border px-4 py-3 shadow-[0_22px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] sm:bottom-5 sm:left-5',
          isActive
            ? 'border-[#d4af37]/45 bg-[#1a2520]/92 text-[#f2d680]'
            : 'border-[#d4af37]/18 bg-[#09110e]/90 text-white hover:border-[#d4af37]/35 hover:bg-[#101814]/96',
          totalItems > 0 ? 'shadow-[0_18px_40px_rgba(212,175,55,0.16)]' : ''
        ].join(' ')
      }
    >
      <span
        className={[
          'flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300',
          'bg-[#d4af37] text-black'
        ].join(' ')}
      >
        <ShoppingBag className="h-5 w-5" />
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-[0.24em] text-[#d4af37]/72">Compra</span>
        <span className="mt-1 font-semibold">Carrito</span>
      </span>

      <span
        className={[
          'inline-flex min-w-9 items-center justify-center rounded-full px-3 py-2 text-sm font-bold',
          totalItems > 0 ? 'bg-[#d4af37] text-black' : 'bg-white/8 text-gray-200'
        ].join(' ')}
      >
        {totalItems}
      </span>
    </NavLink>
  );
};

export default FloatingCartButton;
