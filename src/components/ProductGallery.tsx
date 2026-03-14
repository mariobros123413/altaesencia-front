import { useState, useEffect } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CategoryTopBar from './CategoryTopBar';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string;
  is_promotional: boolean;
  discount_percentage: number;
  rating: number;
}

interface ProductGalleryProps {
  category: string;
}

const ProductGallery = ({ category }: ProductGalleryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', category)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const getCategoryTitle = () => {
    const titles: Record<string, string> = {
      clothing: 'Ropa de Alta Gama',
      perfumes: 'Perfumes de Lujo',
      cosmetics: 'Cosmeticos Premium'
    };
    return titles[category] || 'Productos';
  };

  const getCategoryDescription = () => {
    const descriptions: Record<string, string> = {
      clothing: 'Coleccion exclusiva de ropa de alto nivel de las mejores marcas',
      perfumes: 'Aromas unicos de las marcas mas prestigiosas del mundo',
      cosmetics: 'Productos de belleza premium con ingredientes de lujo'
    };
    return descriptions[category] || '';
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <CategoryTopBar currentCategory={category} />

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-[#d4af37] mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {getCategoryDescription()}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6"></div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 h-80 bg-[#1a2520]">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.is_promotional && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        -{product.discount_percentage}%
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <button className="opacity-0 group-hover:opacity-100 bg-[#d4af37] text-black px-8 py-3 rounded font-semibold flex items-center space-x-2 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Ver Detalles</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-serif text-white group-hover:text-[#d4af37] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-[#d4af37] text-[#d4af37]'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                      <span className="text-2xl font-bold text-[#d4af37]">
                        ${product.price}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#1a2520] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="h-96 rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-serif text-[#d4af37] mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="flex items-center space-x-4 border-y border-[#d4af37]/20 py-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedProduct.rating)
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
                    <span className="text-4xl font-bold text-[#d4af37]">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.original_price && (
                      <span className="text-xl text-gray-500 line-through">
                        ${selectedProduct.original_price}
                      </span>
                    )}
                  </div>
                  {selectedProduct.is_promotional && (
                    <p className="text-red-400 font-semibold">
                      Ahorra ${(selectedProduct.original_price! - selectedProduct.price).toFixed(2)}
                    </p>
                  )}
                </div>

                <button className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-black py-3 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-6 h-6" />
                  <span>Anadir al Carrito</span>
                </button>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full border border-[#d4af37]/50 hover:border-[#d4af37] text-[#d4af37] py-3 rounded-lg font-semibold transition-colors"
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
