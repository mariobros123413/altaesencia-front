import { useStorefront } from '../context/StorefrontContext';
import SmoothImage from './SmoothImage';
import SmoothScrollLink from './SmoothScrollLink';

const Hero = () => {
  const {
    bootstrap: { brand, home }
  } = useStorefront();
  const hero = home.hero;

  return (
    <section
      id="inicio"
      className="relative h-screen scroll-mt-28 overflow-hidden bg-gradient-to-br from-[#0a1612] via-[#0d1a15] to-[#0a0f0d]"
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

      <div className="container mx-auto flex h-full items-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="z-10 space-y-8">
            <h1 className="font-serif text-6xl leading-tight text-[#d4af37] lg:text-7xl">
              {hero.title.split('\n').map((line, index) => (
                <span key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-md text-xl leading-relaxed text-gray-300">{hero.subtitle}</p>
            <SmoothScrollLink
              to={hero.ctaHref}
              className="inline-flex rounded bg-[#d4af37] px-10 py-4 font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 hover:bg-[#c4a137]"
            >
              {hero.ctaLabel}
            </SmoothScrollLink>
          </div>

          <div className="relative hidden h-[600px] lg:block">
            <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-[#0a0f0d]"></div>
            <SmoothImage
              src={hero.image.src}
              alt={hero.image.alt}
              wrapperClassName="h-full rounded-lg"
              optimizedWidth={1600}
              priority
              className="h-full w-full rounded-lg object-cover"
            />
            <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="rounded-full border border-[#d4af37]/30 bg-black/40 px-6 py-3 backdrop-blur-sm">
                <span className="font-serif text-lg text-[#d4af37]">{brand.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#0a0f0d] to-transparent"></div>
    </section>
  );
};

export default Hero;
