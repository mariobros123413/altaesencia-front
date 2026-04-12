import { useParams, Navigate } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import { CATEGORY_IDS } from '../types/storefront';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  if (!category || !CATEGORY_IDS.includes(category as (typeof CATEGORY_IDS)[number])) {
    return <Navigate to="/" replace />;
  }

  return <ProductGallery category={category} />;
};

export default CategoryPage;
