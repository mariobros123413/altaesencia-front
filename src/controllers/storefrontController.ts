import { fallbackProducts, storefrontBootstrapFallback } from '../data/storefrontFallback';
import { hasBackendApiConfigured, getJson } from '../lib/backendApi';
import type { Product } from '../types/product';
import type { CartItem } from '../context/CartContext';
import type { CategoryCatalogResponse, CategoryId, StorefrontBootstrap } from '../types/storefront';

const BOOTSTRAP_CACHE_KEY = 'altaesencia-storefront-bootstrap';
const PRODUCT_CACHE_PREFIX = 'altaesencia-products-';
const CACHE_TTL_MS = 1000 * 60 * 5;

const BACKEND_ENDPOINTS = {
  bootstrap: '/storefront/bootstrap',
  categoryProducts: (categoryId: CategoryId) => `/storefront/categories/${categoryId}/products`
};

const readCache = <T>(key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const cachedValue = window.sessionStorage.getItem(key);

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue) as { data: T; timestamp: number };

    if (Date.now() - parsedValue.timestamp > CACHE_TTL_MS) {
      return null;
    }

    return parsedValue.data;
  } catch (error) {
    console.error('Error reading frontend cache:', error);
    return null;
  }
};

const writeCache = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );
  } catch (error) {
    console.error('Error writing frontend cache:', error);
  }
};

const getCategoryFallback = (categoryId: CategoryId): CategoryCatalogResponse => {
  const category = storefrontBootstrapFallback.categories.find((item) => item.id === categoryId);

  if (!category) {
    throw new Error(`Unknown category "${categoryId}"`);
  }

  return {
    category,
    products: fallbackProducts.filter((product) => product.category === categoryId)
  };
};

const buildWhatsAppMessage = (items: CartItem[], totalItems: number, totalPrice: number) =>
  [
    'Hola AltaEsencia, quiero completar mi compra:',
    '',
    ...items.map(
      (item) =>
        `- ${item.name} | Cantidad: ${item.quantity} | Subtotal: $${(item.price * item.quantity).toFixed(2)}`
    ),
    '',
    `Total de productos: ${totalItems}`,
    `Total a pagar: $${totalPrice.toFixed(2)}`
  ].join('\n');

export const storefrontController = {
  async getBootstrap(): Promise<StorefrontBootstrap> {
    const cachedBootstrap = readCache<StorefrontBootstrap>(BOOTSTRAP_CACHE_KEY);

    if (cachedBootstrap) {
      return cachedBootstrap;
    }

    if (!hasBackendApiConfigured()) {
      writeCache(BOOTSTRAP_CACHE_KEY, storefrontBootstrapFallback);
      return storefrontBootstrapFallback;
    }

    try {
      const bootstrap = await getJson<StorefrontBootstrap>(BACKEND_ENDPOINTS.bootstrap);
      writeCache(BOOTSTRAP_CACHE_KEY, bootstrap);
      return bootstrap;
    } catch (error) {
      console.error('Error fetching storefront bootstrap:', error);
      writeCache(BOOTSTRAP_CACHE_KEY, storefrontBootstrapFallback);
      return storefrontBootstrapFallback;
    }
  },

  async getCategoryCatalog(categoryId: CategoryId): Promise<CategoryCatalogResponse> {
    const cacheKey = `${PRODUCT_CACHE_PREFIX}${categoryId}`;
    const cachedCatalog = readCache<CategoryCatalogResponse>(cacheKey);

    if (cachedCatalog) {
      return cachedCatalog;
    }

    if (!hasBackendApiConfigured()) {
      const fallbackCatalog = getCategoryFallback(categoryId);
      writeCache(cacheKey, fallbackCatalog);
      return fallbackCatalog;
    }

    try {
      const products = await getJson<Product[]>(BACKEND_ENDPOINTS.categoryProducts(categoryId));
      const category =
        storefrontBootstrapFallback.categories.find((item) => item.id === categoryId) ||
        storefrontBootstrapFallback.categories[0];

      const payload = { category, products };
      writeCache(cacheKey, payload);
      return payload;
    } catch (error) {
      console.error(`Error fetching catalog for ${categoryId}:`, error);
      const fallbackCatalog = getCategoryFallback(categoryId);
      writeCache(cacheKey, fallbackCatalog);
      return fallbackCatalog;
    }
  },

  buildWhatsAppCheckoutUrl({
    items,
    totalItems,
    totalPrice,
    whatsappNumber
  }: {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    whatsappNumber: string;
  }) {
    const message = encodeURIComponent(buildWhatsAppMessage(items, totalItems, totalPrice));
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }
};

export { BACKEND_ENDPOINTS };
