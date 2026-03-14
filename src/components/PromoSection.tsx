import { Tag, TrendingUp, Star } from 'lucide-react';

const PromoSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0d1612] to-[#0a0f0d]">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-[#1a2520] via-[#0d1612] to-[#1a2520] rounded-2xl overflow-hidden border border-[#d4af37]/30 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-12 lg:p-16 flex flex-col justify-center space-y-8">
              <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 px-4 py-2 rounded-full w-fit">
                <Tag className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[#d4af37] text-sm font-semibold uppercase tracking-wider">
                  Oferta Especial
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-serif text-[#d4af37] leading-tight">
                Hasta 40% OFF
              </h2>

              <p className="text-2xl text-gray-300">
                En productos seleccionados de nuestra colección premium
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-[#d4af37]" />
                  <span className="text-gray-300">Envío gratuito en compras superiores a $200</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-[#d4af37]" />
                  <span className="text-gray-300">Productos 100% originales garantizados</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#d4af37] hover:bg-[#c4a137] text-black font-semibold px-8 py-4 rounded transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                  Comprar Ahora
                </button>
                <button className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-semibold px-8 py-4 rounded transition-all duration-300 uppercase tracking-wider">
                  Ver Ofertas
                </button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-auto">
              <img
                src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg"
                alt="Productos en promoción"
                className="w-full h-full object-cover"
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
