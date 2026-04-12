import { Palette, Shirt, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface CategoryTopBarProps {
  currentCategory: string;
}

const categories = [
  {
    id: 'clothing',
    label: 'Clothing',
    subtitle: 'Alta costura',
    icon: Shirt
  },
  {
    id: 'perfumes',
    label: 'Perfumes',
    subtitle: 'Esencias selectas',
    icon: Sparkles
  },
  {
    id: 'cosmetics',
    label: 'Cosmetics',
    subtitle: 'Belleza premium',
    icon: Palette
  }
];

const CategoryTopBar = ({ currentCategory }: CategoryTopBarProps) => {
  return (
    <div className="sticky top-28 z-30 mb-12">
      <div className="rounded-[28px] border border-[#d4af37]/20 bg-[#101814]/90 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-center">
          {/* <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37]/70">
                Catalogos AltaEsencia
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Explora cada linea sin salir de la experiencia premium.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#16201c] text-[#d4af37] transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-[#1c2924]"
              aria-label="Volver al inicio"
            >
              <Home className="h-5 w-5" />
            </Link>
          </div> */}

          <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = currentCategory === category.id;

              return (
                <NavLink
                  key={category.id}
                  to={`/categoria/${category.id}`}
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
                        {category.subtitle}
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
