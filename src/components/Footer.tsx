import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import SmoothScrollLink from './SmoothScrollLink';

const Footer = () => {
  return (
    <footer
      id="contacto"
      className="scroll-mt-28 bg-gradient-to-b from-[#0a0f0d] to-[#050807] pt-20 pb-8"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-3xl font-serif text-[#d4af37]">AltaEsencia</h3>
            <p className="text-gray-400 leading-relaxed">
              Tu destino para moda exclusiva, perfumes de lujo y cosmeticos premium.
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2520] transition-all duration-300 hover:bg-[#d4af37] group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-[#d4af37] group-hover:text-black" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2520] transition-all duration-300 hover:bg-[#d4af37] group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-[#d4af37] group-hover:text-black" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2520] transition-all duration-300 hover:bg-[#d4af37] group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-[#d4af37] group-hover:text-black" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#d4af37]">Categorias</h4>
            <ul className="space-y-3">
              <li><Link to="/categoria/clothing" className="text-gray-400 transition-colors hover:text-[#d4af37]">Ropa de Alta Gama</Link></li>
              <li><Link to="/categoria/perfumes" className="text-gray-400 transition-colors hover:text-[#d4af37]">Perfumes de Lujo</Link></li>
              <li><Link to="/categoria/cosmetics" className="text-gray-400 transition-colors hover:text-[#d4af37]">Cosmeticos Premium</Link></li>
              <li><SmoothScrollLink to="/#premium" className="text-gray-400 transition-colors hover:text-[#d4af37]">Seleccion Premium</SmoothScrollLink></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#d4af37]">Informacion</h4>
            <ul className="space-y-3">
              <li><SmoothScrollLink to="/#inicio" className="text-gray-400 transition-colors hover:text-[#d4af37]">Sobre Nosotros</SmoothScrollLink></li>
              <li><SmoothScrollLink to="/#ofertas" className="text-gray-400 transition-colors hover:text-[#d4af37]">Envios</SmoothScrollLink></li>
              <li><SmoothScrollLink to="/#contacto" className="text-gray-400 transition-colors hover:text-[#d4af37]">Devoluciones</SmoothScrollLink></li>
              <li><SmoothScrollLink to="/#contacto" className="text-gray-400 transition-colors hover:text-[#d4af37]">Terminos y Condiciones</SmoothScrollLink></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#d4af37]">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                <span className="text-gray-400">Av. Exclusiva 123, Ciudad</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                <span className="text-gray-400">info@altaesencia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4af37]/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500">
              (c) 2026 AltaEsencia. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <SmoothScrollLink to="/#contacto" className="text-gray-500 transition-colors hover:text-[#d4af37]">Politica de Privacidad</SmoothScrollLink>
              <SmoothScrollLink to="/#contacto" className="text-gray-500 transition-colors hover:text-[#d4af37]">Terminos de Uso</SmoothScrollLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
