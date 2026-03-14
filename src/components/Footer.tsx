import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0a0f0d] to-[#050807] pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-serif text-[#d4af37]">AltaEsencia</h3>
            <p className="text-gray-400 leading-relaxed">
              Tu destino para moda exclusiva, perfumes de lujo y cosméticos premium.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#1a2520] hover:bg-[#d4af37] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-[#d4af37] group-hover:text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a2520] hover:bg-[#d4af37] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-[#d4af37] group-hover:text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a2520] hover:bg-[#d4af37] rounded-full flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-[#d4af37] group-hover:text-black" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#d4af37] font-semibold text-lg uppercase tracking-wider">Categorías</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Ropa de Alta Gama</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Perfumes de Lujo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Cosméticos Premium</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Accesorios</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#d4af37] font-semibold text-lg uppercase tracking-wider">Información</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Envíos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#d4af37] font-semibold text-lg uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#d4af37] mt-1 flex-shrink-0" />
                <span className="text-gray-400">Av. Exclusiva 123, Ciudad</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                <span className="text-gray-400">info@altaesencia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4af37]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2026 AltaEsencia. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-[#d4af37] transition-colors">Política de Privacidad</a>
              <a href="#" className="text-gray-500 hover:text-[#d4af37] transition-colors">Términos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
