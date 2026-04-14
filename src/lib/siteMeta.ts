import type { CategoryId } from '../types/storefront';

export const SITE_NAME = 'AltaEsencia';
export const SITE_TAGLINE = 'Estilo y Exclusividad';
export const DEFAULT_THEME_COLOR = '#0a0f0d';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const DEFAULT_SEO_DESCRIPTION =
  'AltaEsencia ofrece moda premium, perfumes exclusivos y cosmeticos selectos para una experiencia de compra elegante y actual.';
export const DEFAULT_KEYWORDS = [
  'AltaEsencia',
  'perfumes de lujo',
  'moda premium',
  'cosmeticos premium',
  'tienda online',
  'ecommerce de lujo',
  'perfumeria exclusiva',
  'ropa de alta gama'
];

const CATEGORY_SEO_COPY: Record<CategoryId, { title: string; description: string; keywords: string[] }> = {
  clothing: {
    title: 'Ropa de alta gama',
    description:
      'Explora ropa premium y piezas exclusivas seleccionadas para elevar tu estilo con acabados de lujo.',
    keywords: ['ropa premium', 'moda exclusiva', 'alta costura', 'ropa de lujo']
  },
  perfumes: {
    title: 'Perfumes de lujo',
    description:
      'Descubre perfumes exclusivos con notas sofisticadas y fragancias premium pensadas para dejar huella.',
    keywords: ['perfumes de lujo', 'fragancias exclusivas', 'perfumeria premium', 'aromas selectos']
  },
  cosmetics: {
    title: 'Cosmeticos premium',
    description:
      'Encuentra cosmeticos selectos y productos de belleza premium para una rutina elegante y efectiva.',
    keywords: ['cosmeticos premium', 'belleza de lujo', 'skincare premium', 'makeup selecto']
  }
};

const normalizeBaseUrl = (value: string | undefined) => value?.trim().replace(/\/+$/, '') || '';

export const getSiteOrigin = () => {
  const configuredSiteUrl = normalizeBaseUrl(import.meta.env.VITE_SITE_URL);

  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return normalizeBaseUrl(window.location.origin);
  }

  return '';
};

export const toAbsoluteSiteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const origin = getSiteOrigin();
  const normalizedPath = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : '/';

  return origin ? `${origin}${normalizedPath}` : normalizedPath;
};

export const getCategorySeoCopy = (category: CategoryId) => CATEGORY_SEO_COPY[category];
