import type { Product } from './product';

export const CATEGORY_IDS = ['clothing', 'perfumes', 'cosmetics'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavigationSection {
  id: string;
  label: string;
}

export interface CategorySummary {
  id: CategoryId;
  label: string;
  navSubtitle: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  image: ImageAsset;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: ImageAsset;
}

export interface PremiumCollectionContent {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  images: ImageAsset[];
}

export interface FeaturedPerfumeItem {
  id: string;
  name: string;
  priceLabel: string;
  image: ImageAsset;
  featured?: boolean;
}

export interface ExclusivePerfumesContent {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  items: FeaturedPerfumeItem[];
}

export interface PromoContent {
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: ImageAsset;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  description: string;
  categoryLinks: FooterLink[];
  informationLinks: FooterLink[];
  legalLinks: FooterLink[];
  contact: ContactInfo;
  copyright: string;
}

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
}

export interface CommerceConfig {
  whatsappNumber: string;
  maxQuantityPerProduct: number;
}

export interface HomePageContent {
  sections: NavigationSection[];
  hero: HeroContent;
  categoriesHeading: {
    title: string;
    subtitle: string;
  };
  premiumCollection: PremiumCollectionContent;
  exclusivePerfumes: ExclusivePerfumesContent;
  promo: PromoContent;
  footer: FooterContent;
}

export interface StorefrontBootstrap {
  brand: BrandConfig;
  commerce: CommerceConfig;
  categories: CategorySummary[];
  home: HomePageContent;
}

export interface CategoryCatalogResponse {
  category: CategorySummary;
  products: Product[];
}

export interface BackendErrorResponse {
  message: string;
}
