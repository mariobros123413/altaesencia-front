import { Palette, Shirt, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import type { CategoryId } from '../types/storefront';

interface CategoryTopBarProps {
  currentCategory: string;
}

const iconMap: Record<CategoryId, typeof Shirt> = {
  clothing: Shirt,
  perfumes: Sparkles,
  cosmetics: Palette
};

const CategoryTopBar = ({ currentCategory }: CategoryTopBarProps) => {
  const {
    bootstrap: { categories }
  } = useStorefront();

  return (
    <div className="sticky top-28 z-30 mb-12">
      <div className="rounded-[28px] border border-[#d4af37]/20 bg-[#101814]/90 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-center">
          <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((category) => {
              const Icon = iconMap[category.id];
              const isActive = currentCategory === category.id;

              return (
                <NavLink
                  key={category.id}
                  to={category.path}
                  className={[
                    'group min-w-[190px] rounded-2xl border px-4 py-3 transition-all duration-300',
                    isActive
                      ? 'border-[#d4af37]/60 bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/5 text-white'
                      : 'border-[#d4af37]/10 bg-[#16201c]/70 text-gray-300 hover:border-[#d4af37]/30 hover:bg-[#1b2722]'
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300',
                        isActive
                          ? 'border-[#d4af37]/60 bg-[#d4af37] text-black'
                          : 'border-[#d4af37]/15 bg-[#0f1512] text-[#d4af37] group-hover:border-[#d4af37]/40'
                      ].join(' ')}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="font-serif text-lg leading-none">{category.label}</p>
                      <p
                        className={[
                          'mt-1 text-xs uppercase tracking-[0.24em]',
                          isActive ? 'text-[#f1d57a]' : 'text-gray-500'
                        ].join(' ')}
                      >
                        {category.navSubtitle}
                      </p>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTopBar;
