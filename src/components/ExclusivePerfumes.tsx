import { Link } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import SmoothImage from './SmoothImage';

const ExclusivePerfumes = () => {
  const {
    bootstrap: { home }
  } = useStorefront();
  const section = home.exclusivePerfumes;

  return (
    <section
      id="perfumes"
      className="scroll-mt-28 bg-gradient-to-b from-[#0a0f0d] to-[#0d1612] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="font-serif text-5xl text-[#d4af37]">{section.title}</h2>
            <p className="text-xl leading-relaxed text-gray-300">{section.subtitle}</p>
            <p className="leading-relaxed text-gray-400">{section.description}</p>
            <Link
              to={section.ctaHref}
              className="inline-flex rounded bg-[#d4af37] px-10 py-4 font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-[#c4a137]"
            >
              {section.ctaLabel}
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`group relative ${item.featured ? 'col-span-3 md:col-span-1' : ''}`}
              >
                <div className="relative h-80 overflow-hidden rounded-lg border border-[#d4af37]/20 bg-gradient-to-b from-[#1a2520] to-[#0d1612] transition-all duration-500 hover:border-[#d4af37]/50">
                  {item.featured && (
                    <div className="absolute top-4 left-4 z-10 rounded-full bg-[#d4af37] px-4 py-1 text-xs font-bold uppercase text-black">
                      Destacado
                    </div>
                  )}
                  <SmoothImage
                    src={item.image.src}
                    alt={item.image.alt}
                    wrapperClassName="h-full"
                    optimizedWidth={700}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                  <div className="absolute right-0 bottom-0 left-0 translate-y-2 transform p-6 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="mb-2 font-serif text-lg text-[#d4af37]">{item.name}</h3>
                    <p className="text-xl font-bold text-white">{item.priceLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusivePerfumes;
