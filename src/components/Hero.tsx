const Hero = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-[#0a1612] via-[#0d1a15] to-[#0a0f0d] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

      <div className="container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 z-10">
            <h1 className="text-6xl lg:text-7xl font-serif text-[#d4af37] leading-tight">
              ESTILO &<br />EXCLUSIVIDAD
            </h1>
            <p className="text-xl text-gray-300 max-w-md leading-relaxed">
              Encuentra ropa, perfumes y cosméticos de las marcas más exclusivas.
            </p>
            <button className="bg-[#d4af37] hover:bg-[#c4a137] text-black font-semibold px-10 py-4 rounded transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
              Ver Colección
            </button>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0f0d] z-10"></div>
            <img
              src="https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg"
              alt="Modelo con perfume"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-[#d4af37]/30">
                <span className="text-[#d4af37] font-serif text-lg">AltaEsencia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0f0d] to-transparent"></div>
    </section>
  );
};

export default Hero;
