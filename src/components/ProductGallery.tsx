import { useEffect, useMemo, useState } from 'react';
import { Check, ShoppingBag, Star } from 'lucide-react';
import { storefrontController } from '../controllers/storefrontController';
import { useCart } from '../context/CartContext';
import { useStorefront } from '../context/StorefrontContext';
import type { Product } from '../types/product';
import type { CategoryId } from '../types/storefront';
import CategoryTopBar from './CategoryTopBar';
import SmoothImage from './SmoothImage';

interface ProductGalleryProps {
  category: string;
}

const ProductGallery = ({ category }: ProductGalleryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartNotice, setCartNotice] = useState('');
  const [animatedCartProductId, setAnimatedCartProductId] = useState<string | null>(null);
  const { addItem, getItemQuantity } = useCart();
  const { getCategoryById } = useStorefront();

  const currentCategory = useMemo(
    () => getCategoryById(category as CategoryId),
    [category, getCategoryById]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await storefrontController.getCategoryCatalog(category as CategoryId);

        if (!isMounted) {
          return;
        }

        setProducts(response.products);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCatalog();

    return () => {
      isMounted = false;
    };
  }, [category]);

  useEffect(() => {
    if (!cartNotice) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCartNotice(''), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [cartNotice]);

  useEffect(() => {
    if (!animatedCartProductId) {
      return;
    }

    const timeoutId = window.setTimeout(() => setAnimatedCartProductId(null), 900);
    return () => window.clearTimeout(timeoutId);
  }, [animatedCartProductId]);

  const handleAddToCart = (product: Product) => {
    if (getItemQuantity(product.id) > 0) {
      setCartNotice(`${product.name} ya esta agregado al carrito`);
      return;
    }

    addItem(product);
    setAnimatedCartProductId(product.id);
    setCartNotice(`${product.name} agregado al carrito`);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <CategoryTopBar currentCategory={category} />

          {cartNotice && (
            <div className="mb-8 rounded-2xl border border-[#d4af37]/20 bg-[#101814] px-5 py-4 text-center text-sm uppercase tracking-[0.18em] text-[#f2d680] shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
              {cartNotice}
            </div>
          )}

          <div className="mb-16 text-center">
            <h1 className="mb-4 font-serif text-5xl text-[#d4af37] md:text-6xl">
              {currentCategory?.title || 'Productos'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              {currentCategory?.description || ''}
            </p>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#d4af37]"></div>
            </div>
          ) : (
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const isInCart = getItemQuantity(product.id) > 0;

                return (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative mb-4 h-80 overflow-hidden rounded-lg bg-[#1a2520]">
                      <SmoothImage
                        src={product.image_url}
                        alt={product.name}
                        wrapperClassName="h-full"
                        optimizedWidth={900}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {isInCart && (
                        <div className="absolute top-4 left-4 rounded-full border border-emerald-400/30 bg-emerald-500/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                          En carrito
                        </div>
                      )}
                      {product.is_promotional && (
                        <div className="absolute top-4 right-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white">
                          -{product.discount_percentage}%
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                        <button className="flex scale-90 items-center space-x-2 rounded bg-[#d4af37] px-8 py-3 font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <ShoppingBag className="h-5 w-5" />
                          <span>Ver Detalles</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-serif text-xl text-white transition-colors group-hover:text-[#d4af37]">
                        {product.name}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-400">{product.description}</p>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < Math.floor(product.rating)
                                  ? 'fill-[#d4af37] text-[#d4af37]'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{product.rating}</span>
                      </div>

                      <div className="flex items-center space-x-3 pt-2">
                        <span className="text-2xl font-bold text-[#d4af37]">Bs{product.price}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through">
                            Bs{product.original_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#1a2520]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
              <div className="h-96 overflow-hidden rounded-lg">
                <SmoothImage
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  wrapperClassName="h-full rounded-lg"
                  optimizedWidth={1400}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 font-serif text-3xl text-[#d4af37]">{selectedProduct.name}</h2>
                  <p className="text-gray-400">{selectedProduct.description}</p>
                </div>

                <div className="flex items-center space-x-4 border-y border-[#d4af37]/20 py-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(selectedProduct.rating)
                            ? 'fill-[#d4af37] text-[#d4af37]'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">{selectedProduct.rating}/5</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl font-bold text-[#d4af37]">${selectedProduct.price}</span>
                    {selectedProduct.original_price && (
                      <span className="text-xl text-gray-500 line-through">
                        ${selectedProduct.original_price}
                      </span>
                    )}
                  </div>
                  {selectedProduct.is_promotional && (
                    <p className="font-semibold text-red-400">
                      Ahorra ${(selectedProduct.original_price! - selectedProduct.price).toFixed(2)}
                    </p>
                  )}
                </div>

                {getItemQuantity(selectedProduct.id) > 0 && (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm uppercase tracking-[0.14em] text-emerald-300">
                    Este producto ya esta en tu carrito. Si quieres mas unidades, ajustalas desde la seccion Carrito.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={getItemQuantity(selectedProduct.id) > 0}
                  className={[
                    'flex w-full items-center justify-center space-x-2 rounded-lg py-3 text-lg font-bold transition-all duration-500',
                    getItemQuantity(selectedProduct.id) > 0
                      ? 'cursor-not-allowed bg-emerald-500 text-white shadow-[0_16px_40px_rgba(16,185,129,0.28)]'
                      : 'bg-[#d4af37] text-black hover:scale-[1.01] hover:bg-[#e5c158]',
                    animatedCartProductId === selectedProduct.id ? 'animate-pulse scale-[1.02]' : ''
                  ].join(' ')}
                >
                  {getItemQuantity(selectedProduct.id) > 0 ? (
                    <>
                      <Check className="h-6 w-6" />
                      <span>Ya agregado al Carrito</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-6 w-6" />
                      <span>Anadir al Carrito</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full rounded-lg border border-[#d4af37]/50 py-3 font-semibold text-[#d4af37] transition-colors hover:border-[#d4af37]"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
