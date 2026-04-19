import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Images, ShoppingBag, Star } from 'lucide-react';
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

const getProductImages = (product: Product) =>
  Array.from(
    new Set([product.image_url, ...(product.image_urls || [])].filter((imageUrl): imageUrl is string => Boolean(imageUrl?.trim())))
  );

const ProductGallery = ({ category }: ProductGalleryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cartNotice, setCartNotice] = useState('');
  const [animatedCartProductId, setAnimatedCartProductId] = useState<string | null>(null);
  const thumbnailRailRef = useRef<HTMLDivElement | null>(null);
  const { addItem, getItemQuantity } = useCart();
  const { getCategoryById } = useStorefront();

  const currentCategory = useMemo(
    () => getCategoryById(category as CategoryId),
    [category, getCategoryById]
  );

  const selectedProductImages = useMemo(
    () => (selectedProduct ? getProductImages(selectedProduct) : []),
    [selectedProduct]
  );

  const selectedProductActiveImage =
    selectedProductImages[selectedImageIndex] || selectedProductImages[0] || selectedProduct?.image_url || '';

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
        setSelectedProduct(null);
        setSelectedImageIndex(0);
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

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedProduct?.id]);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProductImages.length || !thumbnailRailRef.current) {
      return;
    }

    const activeThumbnail = thumbnailRailRef.current.querySelector<HTMLButtonElement>(
      `[data-gallery-thumbnail="${selectedImageIndex}"]`
    );

    activeThumbnail?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }, [selectedImageIndex, selectedProductImages]);

  const handleAddToCart = (product: Product) => {
    if (getItemQuantity(product.id) > 0) {
      setCartNotice(`${product.name} ya esta agregado al carrito`);
      return;
    }

    addItem(product);
    setAnimatedCartProductId(product.id);
    setCartNotice(`${product.name} agregado al carrito`);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  const shiftSelectedImage = (direction: -1 | 1) => {
    if (!selectedProductImages.length) {
      return;
    }

    setSelectedImageIndex((currentIndex) => {
      const nextIndex =
        (currentIndex + direction + selectedProductImages.length) % selectedProductImages.length;

      return nextIndex;
    });
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
                const productImages = getProductImages(product);

                return (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => openProductDetails(product)}
                  >
                    <div className="relative mb-4 h-80 overflow-hidden rounded-lg bg-[#1a2520]">
                      <SmoothImage
                        src={productImages[0]}
                        alt={product.name}
                        wrapperClassName="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_45%),linear-gradient(180deg,#14201b_0%,#0f1714_100%)] p-5"
                        optimizedWidth={900}
                        className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
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
                      {productImages.length > 1 && (
                        <div className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#0e1512]/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f2d680] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                          <Images className="h-3.5 w-3.5" />
                          {productImages.length} fotos
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                        <button
                          type="button"
                          className="flex scale-90 items-center space-x-2 rounded bg-[#d4af37] px-8 py-3 font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:scale-100 group-hover:opacity-100"
                        >
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
          className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="flex h-full items-center justify-center px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
            <div
              className="h-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-[28px] border border-[#d4af37]/15 bg-[#111917] shadow-[0_35px_120px_rgba(0,0,0,0.48)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-[32px] [scrollbar-color:#5a4a1d_#111917] [scrollbar-width:thin]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid xl:items-start xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
                <div className="space-y-4 p-3 sm:space-y-5 sm:p-4 md:p-6 xl:p-7">
                  <div className="relative overflow-hidden rounded-[24px] border border-[#d4af37]/10 bg-[#0d1411] shadow-[0_22px_60px_rgba(0,0,0,0.28)] sm:rounded-[28px]">
                    <SmoothImage
                      src={selectedProductActiveImage}
                      alt={selectedProduct.name}
                      wrapperClassName="flex aspect-[4/5] w-full max-h-[52dvh] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_48%),linear-gradient(180deg,#101815_0%,#0c1310_100%)] p-4 sm:max-h-none sm:p-6"
                      optimizedWidth={1600}
                      priority
                      className="h-full w-auto max-w-full object-contain"
                    />

                    <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 sm:p-4">
                      <div className="rounded-full border border-[#d4af37]/15 bg-[#0c1310]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#f2d680] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]">
                        Vista previa
                      </div>
                      <div className="rounded-full border border-[#d4af37]/15 bg-[#0c1310]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gray-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]">
                        {selectedImageIndex + 1}/{selectedProductImages.length}
                      </div>
                    </div>

                    {selectedProductImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => shiftSelectedImage(-1)}
                          className="absolute top-1/2 left-3 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/15 bg-[#0d1411]/92 text-[#f2d680] shadow-[0_14px_35px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-[#d4af37]/35 hover:bg-[#15211c] sm:left-4 sm:h-12 sm:w-12"
                          aria-label="Ver foto anterior"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => shiftSelectedImage(1)}
                          className="absolute top-1/2 right-3 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/15 bg-[#0d1411]/92 text-[#f2d680] shadow-[0_14px_35px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-[#d4af37]/35 hover:bg-[#15211c] sm:right-4 sm:h-12 sm:w-12"
                          aria-label="Ver siguiente foto"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#d4af37]/10 bg-[linear-gradient(180deg,#101814_0%,#0f1713_100%)] p-4 sm:p-6 xl:border-t-0 xl:border-l xl:p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-[#d4af37]/70">
                        {selectedProduct.category}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl text-[#d4af37] sm:text-3xl md:text-4xl">
                        {selectedProduct.name}
                      </h2>
                    </div>

                    <div className="rounded-[22px] border border-[#d4af37]/10 bg-[#0d1411] p-4 sm:rounded-[24px] sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#d4af37]/70">
                          Descripcion
                        </p>
                      </div>
                      <div className="max-h-32 overflow-y-auto overscroll-contain pr-2 text-sm leading-relaxed text-gray-300 sm:max-h-36 sm:pr-3 [scrollbar-color:#5a4a1d_#101814] [scrollbar-width:thin]">
                        {selectedProduct.description}
                      </div>
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
                        <span className="text-3xl font-bold text-[#d4af37] sm:text-4xl">Bs{selectedProduct.price}</span>
                        {selectedProduct.original_price && (
                          <span className="text-lg text-gray-500 line-through sm:text-xl">
                            Bs{selectedProduct.original_price}
                          </span>
                        )}
                      </div>
                      {selectedProduct.is_promotional && selectedProduct.original_price && (
                        <p className="font-semibold text-red-400">
                          Ahorra Bs{(selectedProduct.original_price - selectedProduct.price).toFixed(2)}
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
                        'flex w-full items-center justify-center space-x-2 rounded-2xl py-4 text-lg font-bold transition-all duration-500',
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
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="w-full rounded-2xl border border-[#d4af37]/50 py-4 font-semibold text-[#d4af37] transition-colors hover:border-[#d4af37] hover:bg-[#121b17]"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
