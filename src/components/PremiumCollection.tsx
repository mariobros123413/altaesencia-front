import { Link } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import SmoothImage from './SmoothImage';

const PremiumCollection = () => {
  const {
    bootstrap: { home }
  } = useStorefront();
  const section = home.premiumCollection;

  return (
    <section
      id="premium"
      className="relative scroll-mt-28 bg-gradient-to-b from-[#0d1612] to-[#0a0f0d] py-24"
    >
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[500px] overflow-hidden lg:h-[540px]">
            <div className="grid h-full grid-cols-2 gap-4">
              <div className="grid h-full grid-rows-2 gap-4">
                <div className="min-h-0 overflow-hidden rounded-lg">
                  <SmoothImage
                    src={section.images[0]?.src}
                    alt={section.images[0]?.alt || section.title}
                    wrapperClassName="h-full rounded-lg"
                    optimizedWidth={700}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="min-h-0 overflow-hidden rounded-lg">
                  <SmoothImage
                    src={section.images[1]?.src}
                    alt={section.images[1]?.alt || section.title}
                    wrapperClassName="h-full rounded-lg"
                    optimizedWidth={700}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
              <div className="grid h-full grid-rows-[1fr_2fr] gap-4">
                <div className="min-h-0 overflow-hidden rounded-lg">
                  <SmoothImage
                    src={section.images[2]?.src}
                    alt={section.images[2]?.alt || section.title}
                    wrapperClassName="h-full rounded-lg"
                    optimizedWidth={700}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="min-h-0 overflow-hidden rounded-lg">
                  <SmoothImage
                    src={section.images[3]?.src}
                    alt={section.images[3]?.alt || section.title}
                    wrapperClassName="h-full rounded-lg"
                    optimizedWidth={700}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="font-serif text-5xl text-[#d4af37]">{section.title}</h2>
            <p className="text-2xl font-light text-gray-300">{section.subtitle}</p>
            <p className="text-lg leading-relaxed text-gray-400">{section.description}</p>
            <Link
              to={section.ctaHref}
              className="inline-flex rounded bg-[#d4af37] px-10 py-4 font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-[#c4a137]"
            >
              {section.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumCollection;
