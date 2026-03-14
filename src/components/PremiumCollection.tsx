import { Link } from 'react-router-dom';
import SmoothImage from './SmoothImage';

const PremiumCollection = () => {
  return (
    <section
      id="premium"
      className="scroll-mt-28 py-24 bg-gradient-to-b from-[#0d1612] to-[#0a0f0d] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px]">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="h-1/2 rounded-lg overflow-hidden">
                  <SmoothImage
                    src="https://images.pexels.com/photos/3990842/pexels-photo-3990842.jpeg"
                    alt="Zapatillas premium"
                    wrapperClassName="h-full rounded-lg"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="h-1/2 rounded-lg overflow-hidden">
                  <SmoothImage
                    src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg"
                    alt="Gafas de sol"
                    wrapperClassName="h-full rounded-lg"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-1/3 rounded-lg overflow-hidden">
                  <SmoothImage
                    src="https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg"
                    alt="Perfume premium"
                    wrapperClassName="h-full rounded-lg"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="h-2/3 rounded-lg overflow-hidden">
                  <SmoothImage
                    src="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg"
                    alt="Perfumes de lujo"
                    wrapperClassName="h-full rounded-lg"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl font-serif text-[#d4af37]">
              Colección Premium
            </h2>
            <p className="text-2xl text-gray-300 font-light">
              Selección Exclusiva de Alta Calidad
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Descubre nuestra colección premium que combina lo mejor de la moda,
              fragancias y cosméticos de marcas reconocidas mundialmente. Cada pieza
              ha sido cuidadosamente seleccionada para ofrecerte exclusividad y distinción.
            </p>
            <Link
              to="/categoria/clothing"
              className="inline-flex bg-[#d4af37] hover:bg-[#c4a137] text-black font-semibold px-10 py-4 rounded transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              Ver Coleccion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumCollection;
