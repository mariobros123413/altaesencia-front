import { Link } from 'react-router-dom';
import SmoothImage from './SmoothImage';

const ExclusivePerfumes = () => {
  const perfumes = [
    {
      name: 'AltaEsencia Noir',
      price: '$299.99',
      image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg'
    },
    {
      name: 'AltaEsencia Gold',
      price: '$349.99',
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
      featured: true
    },
    {
      name: 'AltaEsencia Prestige',
      price: '$279.99',
      image: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg'
    }
  ];

  return (
    <section
      id="perfumes"
      className="scroll-mt-28 py-24 bg-gradient-to-b from-[#0a0f0d] to-[#0d1612]"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-serif text-[#d4af37]">
              Perfumes Exclusivos
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Descubre aromas únicos de las marcas más prestigiosas.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Cada fragancia cuenta una historia. Nuestros perfumes exclusivos
              son elaborados con las mejores esencias del mundo, creando
              experiencias olfativas incomparables que definen tu personalidad.
            </p>
            <Link
              to="/categoria/perfumes"
              className="inline-flex bg-[#d4af37] hover:bg-[#c4a137] text-black font-semibold px-10 py-4 rounded transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              Ver Perfumes
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {perfumes.map((perfume, index) => (
              <div
                key={index}
                className={`group relative ${
                  perfume.featured ? 'col-span-3 md:col-span-1' : ''
                }`}
              >
                <div className="relative h-80 rounded-lg overflow-hidden bg-gradient-to-b from-[#1a2520] to-[#0d1612] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500">
                  {perfume.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-[#d4af37] text-black px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Destacado
                    </div>
                  )}
                  <SmoothImage
                    src={perfume.image}
                    alt={perfume.name}
                    wrapperClassName="h-full"
                    optimizedWidth={700}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-[#d4af37] font-serif text-lg mb-2">
                      {perfume.name}
                    </h3>
                    <p className="text-white text-xl font-bold">{perfume.price}</p>
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
