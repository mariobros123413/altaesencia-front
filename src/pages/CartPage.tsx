import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import SiteSeo from '../components/SiteSeo';
import { storefrontController } from '../controllers/storefrontController';
import { useCart } from '../context/CartContext';
import { useStorefront } from '../context/StorefrontContext';
import { toAbsoluteSiteUrl } from '../lib/siteMeta';
import SmoothImage from '../components/SmoothImage';

const REMOVE_ANIMATION_MS = 320;

const CartPage = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const {
    bootstrap: { brand, commerce }
  } = useStorefront();
  const [removingItemIds, setRemovingItemIds] = useState<string[]>([]);

  useEffect(() => {
    setRemovingItemIds((currentIds) => currentIds.filter((id) => items.some((item) => item.id === id)));
  }, [items]);

  const handleRemoveItem = (productId: string) => {
    if (removingItemIds.includes(productId)) {
      return;
    }

    setRemovingItemIds((currentIds) => [...currentIds, productId]);

    window.setTimeout(() => {
      removeItem(productId);
      setRemovingItemIds((currentIds) => currentIds.filter((id) => id !== productId));
    }, REMOVE_ANIMATION_MS);
  };

  const whatsappUrl = storefrontController.buildWhatsAppCheckoutUrl({
    items,
    totalItems,
    totalPrice,
    whatsappNumber: commerce.whatsappNumber
  });

  return (
    <div className="min-h-screen bg-[#0a0f0d] pt-32 pb-16">
      <SiteSeo
        title={`Carrito de compras | ${brand.name}`}
        description="Revisa tus productos seleccionados y finaliza tu pedido premium por WhatsApp."
        robots="noindex, follow"
        structuredData={{
          '@type': 'WebPage',
          name: 'Carrito de compras',
          description: 'Pagina de carrito y cierre de compra por WhatsApp.',
          url: toAbsoluteSiteUrl('/carrito'),
          isPartOf: {
            '@type': 'WebSite',
            name: brand.name,
            url: toAbsoluteSiteUrl('/')
          }
        }}
      />
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-5xl text-[#d4af37] md:text-6xl">Carrito</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Revisa tus productos, ajusta cantidades y termina tu pedido por WhatsApp.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        </div>

        {!items.length ? (
          <div className="mx-auto max-w-3xl rounded-[32px] border border-[#d4af37]/15 bg-[#101814] p-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <h2 className="mb-4 font-serif text-3xl text-white">Tu carrito esta vacio</h2>
            <p className="mb-8 text-gray-400">
              Explora nuestros catalogos y agrega hasta {commerce.maxQuantityPerProduct} unidades por producto.
            </p>
            <Link
              to="/#categorias"
              className="inline-flex rounded-lg bg-[#d4af37] px-8 py-4 font-semibold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-[#c4a137]"
            >
              Ir a comprar
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              {items.map((item) => {
                const isRemoving = removingItemIds.includes(item.id);

                return (
                  <article
                    key={item.id}
                    className={[
                      'grid gap-6 rounded-[28px] border border-[#d4af37]/15 bg-[#101814] p-5 shadow-[0_16px_60px_rgba(0,0,0,0.25)] md:grid-cols-[180px_1fr]',
                      'transition-all duration-300 ease-out',
                      isRemoving ? 'translate-x-6 scale-[0.98] opacity-0 blur-[2px]' : 'translate-x-0 opacity-100'
                    ].join(' ')}
                  >
                    <SmoothImage
                      src={item.image_url}
                      alt={item.name}
                      wrapperClassName="h-52 rounded-2xl"
                      className="h-full w-full rounded-2xl object-cover"
                    />

                    <div className="flex flex-col justify-between gap-5">
                      <div>
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div>
                            <p className="mb-2 text-xs uppercase tracking-[0.32em] text-[#d4af37]/70">
                              {item.category}
                            </p>
                            <h2 className="font-serif text-2xl text-white">{item.name}</h2>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isRemoving}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/15 bg-[#151f1b] text-[#d4af37] transition-colors duration-300 hover:border-red-400/40 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={`Quitar ${item.name} del carrito`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <p className="max-w-xl text-sm leading-relaxed text-gray-400">{item.description}</p>
                      </div>

                      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Precio unitario</p>
                          <p className="mt-2 text-3xl font-bold text-[#d4af37]">Bs{item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                          <p className="text-sm uppercase tracking-[0.24em] text-gray-500">
                            Cantidad maxima: {commerce.maxQuantityPerProduct}
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || isRemoving}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/15 bg-[#151f1b] text-[#d4af37] transition-colors duration-300 hover:border-[#d4af37]/40 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Disminuir cantidad de ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <div className="min-w-16 rounded-full border border-[#d4af37]/15 bg-[#0d1411] px-5 py-3 text-center text-lg font-semibold text-white">
                              {item.quantity}
                            </div>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= commerce.maxQuantityPerProduct || isRemoving}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/15 bg-[#151f1b] text-[#d4af37] transition-colors duration-300 hover:border-[#d4af37]/40 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Aumentar cantidad de ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="h-fit rounded-[32px] border border-[#d4af37]/15 bg-[#101814] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] lg:sticky lg:top-28">
              <p className="text-sm uppercase tracking-[0.32em] text-[#d4af37]/70">Resumen</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Tu pedido</h2>

              <div className="mt-8 space-y-4 border-y border-[#d4af37]/10 py-6">
                <div className="flex items-center justify-between text-gray-300">
                  <span>Productos</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>Items distintos</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-semibold text-white">
                  <span>Total</span>
                  <span className="text-[#d4af37]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25d366] px-6 py-4 font-semibold uppercase tracking-[0.16em] text-[#06140c] transition-transform duration-300 hover:scale-[1.01]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Completar Compra por Whatsapp
                </a>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-xl border border-[#d4af37]/20 px-6 py-4 font-semibold uppercase tracking-[0.16em] text-[#d4af37] transition-colors duration-300 hover:border-[#d4af37]/40 hover:bg-[#151f1b]"
                >
                  Vaciar Carrito
                </button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-gray-500">
                El carrito sigue siendo local en el navegador y solo se usa para construir el enlace final de WhatsApp.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
