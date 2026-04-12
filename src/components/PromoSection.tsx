import { MessageCircle, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import SmoothImage from './SmoothImage';
import SmoothScrollLink from './SmoothScrollLink';

const PromoSection = () => {
  const {
    bootstrap: { home }
  } = useStorefront();
  const promo = home.promo;

  return (
    <section
      id="ofertas"
      className="scroll-mt-28 bg-gradient-to-b from-[#0d1612] to-[#0a0f0d] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-r from-[#1a2520] via-[#0d1612] to-[#1a2520]">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8 p-12 lg:p-16">
              <div className="inline-flex w-fit items-center space-x-2 rounded-full bg-[#d4af37]/10 px-4 py-2">
                <MessageCircle className="h-4 w-4 text-[#d4af37]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">
                  {promo.badge}
                </span>
              </div>

              <h2 className="font-serif text-5xl leading-tight text-[#d4af37] lg:text-6xl">
                {promo.title}
              </h2>

              <p className="text-2xl text-gray-300">{promo.subtitle}</p>

              <div className="space-y-4">
                {promo.benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center space-x-3">
                    {index === 0 ? (
                      <TrendingUp className="h-6 w-6 text-[#d4af37]" />
                    ) : (
                      <Star className="h-6 w-6 text-[#d4af37]" />
                    )}
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to={promo.primaryCtaHref}
                  className="inline-flex rounded bg-[#d4af37] px-8 py-4 font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-[#c4a137]"
                >
                  {promo.primaryCtaLabel}
                </Link>
                <SmoothScrollLink
                  to={promo.secondaryCtaHref}
                  className="inline-flex rounded border-2 border-[#d4af37] px-8 py-4 font-semibold uppercase tracking-wider text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
                >
                  {promo.secondaryCtaLabel}
                </SmoothScrollLink>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-auto">
              <SmoothImage
                src={promo.image.src}
                alt={promo.image.alt}
                wrapperClassName="h-full"
                optimizedWidth={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1612] via-transparent to-transparent lg:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
