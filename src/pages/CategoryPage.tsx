import { useParams, Navigate } from 'react-router-dom';
import SiteSeo from '../components/SiteSeo';
import ProductGallery from '../components/ProductGallery';
import { useStorefront } from '../context/StorefrontContext';
import { DEFAULT_KEYWORDS, getCategorySeoCopy, toAbsoluteSiteUrl } from '../lib/siteMeta';
import { CATEGORY_IDS } from '../types/storefront';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const {
    bootstrap: { brand, categories }
  } = useStorefront();

  if (!category || !CATEGORY_IDS.includes(category as (typeof CATEGORY_IDS)[number])) {
    return <Navigate to="/" replace />;
  }

  const currentCategory = categories.find((entry) => entry.id === category);

  if (!currentCategory) {
    return <Navigate to="/" replace />;
  }

  const seoCopy = getCategorySeoCopy(currentCategory.id);

  return (
    <>
      <SiteSeo
        title={`${currentCategory.title} | ${brand.name}`}
        description={currentCategory.description || seoCopy.description}
        keywords={[...DEFAULT_KEYWORDS, ...seoCopy.keywords, currentCategory.label]}
        structuredData={[
          {
            '@type': 'CollectionPage',
            name: currentCategory.title,
            description: currentCategory.description || seoCopy.description,
            url: toAbsoluteSiteUrl(currentCategory.path),
            isPartOf: {
              '@type': 'WebSite',
              name: brand.name,
              url: toAbsoluteSiteUrl('/')
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: toAbsoluteSiteUrl('/')
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: currentCategory.title,
                item: toAbsoluteSiteUrl(currentCategory.path)
              }
            ]
          }
        ]}
      />
      <ProductGallery category={currentCategory.id} />
    </>
  );
};

export default CategoryPage;
