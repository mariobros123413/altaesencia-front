import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  DEFAULT_THEME_COLOR,
  SITE_NAME,
  toAbsoluteSiteUrl
} from '../lib/siteMeta';

type StructuredDataNode = Record<string, unknown>;

interface SiteSeoProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  robots?: string;
  keywords?: string[];
  structuredData?: StructuredDataNode | StructuredDataNode[];
}

const upsertMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLinkTag = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const upsertStructuredData = (data?: StructuredDataNode | StructuredDataNode[]) => {
  const scriptId = 'altaesencia-structured-data';
  const existingScript = document.getElementById(scriptId);

  if (!data) {
    existingScript?.remove();
    return;
  }

  const graph = Array.isArray(data) ? data : [data];
  const payload =
    graph.length === 1
      ? {
          '@context': 'https://schema.org',
          ...graph[0]
        }
      : {
          '@context': 'https://schema.org',
          '@graph': graph
        };

  const scriptElement = existingScript || document.createElement('script');
  scriptElement.id = scriptId;
  scriptElement.setAttribute('type', 'application/ld+json');
  scriptElement.textContent = JSON.stringify(payload);

  if (!existingScript) {
    document.head.appendChild(scriptElement);
  }
};

const SiteSeo = ({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  robots = DEFAULT_ROBOTS,
  keywords,
  structuredData
}: SiteSeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = toAbsoluteSiteUrl(`${location.pathname}${location.search}`);
    const imageUrl = toAbsoluteSiteUrl(image);

    document.title = pageTitle;
    document.documentElement.lang = 'es';

    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'robots', robots);
    upsertMetaTag('name', 'theme-color', DEFAULT_THEME_COLOR);
    upsertMetaTag('name', 'application-name', SITE_NAME);
    upsertMetaTag('name', 'apple-mobile-web-app-title', SITE_NAME);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', pageTitle);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', imageUrl);
    upsertMetaTag('name', 'twitter:image:alt', `${SITE_NAME} social preview`);
    upsertMetaTag('property', 'og:locale', 'es_BO');
    upsertMetaTag('property', 'og:type', type);
    upsertMetaTag('property', 'og:site_name', SITE_NAME);
    upsertMetaTag('property', 'og:title', pageTitle);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', imageUrl);
    upsertMetaTag('property', 'og:image:alt', `${SITE_NAME} social preview`);
    upsertMetaTag('property', 'og:image:width', '1200');
    upsertMetaTag('property', 'og:image:height', '630');

    if (keywords?.length) {
      upsertMetaTag('name', 'keywords', keywords.join(', '));
    }

    upsertLinkTag('canonical', canonicalUrl);
    upsertStructuredData(structuredData);
  }, [description, image, keywords, location.pathname, location.search, robots, structuredData, title, type]);

  return null;
};

export default SiteSeo;
