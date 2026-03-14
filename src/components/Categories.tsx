import { Link } from 'react-router-dom';
import { Shirt, Sparkles, Palette } from 'lucide-react';
import SmoothImage from './SmoothImage';

const Categories = () => {
  const categories = [
    {
      icon: Shirt,
      title: 'Ropa de Alta Gama',
      image: 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg',
      buttonText: 'VER ROPA',
      link: '/categoria/clothing'
    },
    {
      icon: Sparkles,
      title: 'Perfumes de Lujo',
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
      buttonText: 'VER PERFUMES',
      link: '/categoria/perfumes'
    },
    {
      icon: Palette,
      title: 'Cosméticos Premium',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
      buttonText: 'VER COSMÉTICOS',
      link: '/categoria/cosmetics'
    }
  ];

  return (
    <section
      id="categorias"
      className="scroll-mt-28 py-24 bg-gradient-to-b from-[#0a0f0d] to-[#0d1612]"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-[#d4af37] mb-4">
            Descubre AltaEsencia
          </h2>
          <p className="text-xl text-gray-300">
            Moda de Alto Nivel, Perfumes Exclusivos y Cosméticos Selectos
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={category.link}
                className="group relative bg-gradient-to-b from-[#1a2520] to-[#0d1612] rounded-lg overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500 transform hover:scale-105 block"
              >
                <div className="p-6 text-center">
                  <Icon className="w-12 h-12 text-[#d4af37] mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif text-[#d4af37] mb-6">
                    {category.title}
                  </h3>

                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <SmoothImage
                      src={category.image}
                      alt={category.title}
                      wrapperClassName="h-full rounded-lg"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <button className="bg-[#d4af37] hover:bg-[#c4a137] text-black font-semibold px-8 py-3 rounded transition-all duration-300 uppercase text-sm tracking-wider">
                    {category.buttonText}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
