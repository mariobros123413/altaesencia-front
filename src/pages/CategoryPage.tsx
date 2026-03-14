import { useParams, Navigate } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const validCategories = ['clothing', 'perfumes', 'cosmetics'];

  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/" replace />;
  }

  return <ProductGallery category={category} />;
};

export default CategoryPage;
