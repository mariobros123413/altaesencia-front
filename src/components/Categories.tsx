import { Palette, Shirt, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import type { CategoryId } from '../types/storefront';
import SmoothImage from './SmoothImage';

const iconMap: Record<CategoryId, typeof Shirt> = {
  clothing: Shirt,
  perfumes: Sparkles,
  cosmetics: Palette
};

const Categories = () => {
  const {
    bootstrap: { categories, home }
  } = useStorefront();

  return (
    <section
      id="categorias"
      className="scroll-mt-28 bg-gradient-to-b from-[#0a0f0d] to-[#0d1612] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-5xl text-[#d4af37]">{home.categoriesHeading.title}</h2>
          <p className="text-xl text-gray-300">{home.categoriesHeading.subtitle}</p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="h-2 w-2 rotate-45 bg-[#d4af37]"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((category) => {
            const Icon = iconMap[category.id];

            return (
              <Link
                key={category.id}
                to={category.path}
                className="group relative block overflow-hidden rounded-lg border border-[#d4af37]/20 bg-gradient-to-b from-[#1a2520] to-[#0d1612] transition-all duration-500 hover:scale-105 hover:border-[#d4af37]/50"
              >
                <div className="p-6 text-center">
                  <Icon className="mx-auto mb-4 h-12 w-12 text-[#d4af37]" strokeWidth={1.5} />
                  <h3 className="mb-6 font-serif text-2xl text-[#d4af37]">{category.title}</h3>

                  <div className="relative mb-6 h-64 overflow-hidden rounded-lg">
                    <SmoothImage
                      src={category.image.src}
                      alt={category.image.alt}
                      wrapperClassName="h-full rounded-lg"
                      optimizedWidth={900}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <button className="rounded bg-[#d4af37] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#c4a137]">
                    {category.buttonText}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
