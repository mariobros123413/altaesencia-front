import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStorefront } from '../context/StorefrontContext';
import SmoothScrollLink from './SmoothScrollLink';

const Footer = () => {
  const {
    bootstrap: { brand, home }
  } = useStorefront();
  const footer = home.footer;

  return (
    <footer
      id="contacto"
      className="scroll-mt-28 bg-gradient-to-b from-[#0a0f0d] to-[#050807] pt-20 pb-8"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <img src="/logo-horizontal.svg" alt={`${brand.name} logo`} className="h-12 w-auto" />
            <p className="leading-relaxed text-gray-400">{footer.description}</p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2520] transition-all duration-300 hover:bg-[#d4af37]"
                  aria-label={Icon.name}
                >
                  <Icon className="h-5 w-5 text-[#d4af37] group-hover:text-black" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#d4af37]">Categorias</h4>
            <ul className="space-y-3">
              {footer.categoryLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/categoria/') ? (
                    <Link to={link.href} className="text-gray-400 transition-colors hover:text-[#d4af37]">
                      {link.label}
                    </Link>
                  ) : (
                    <SmoothScrollLink
                      to={link.href}
                      className="text-gray-400 transition-colors hover:text-[#d4af37]"
                    >
                      {link.label}
                    </SmoothScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#d4af37]">Informacion</h4>
            <ul className="space-y-3">
              {footer.informationLinks.map((link) => (
                <li key={link.label}>
                  <SmoothScrollLink
                    to={link.href}
                    className="text-gray-400 transition-colors hover:text-[#d4af37]"
                  >
                    {link.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#d4af37]">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                <span className="text-gray-400">{footer.contact.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                <span className="text-gray-400">{footer.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                <span className="text-gray-400">{footer.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4af37]/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500">{footer.copyright}</p>
            <div className="flex space-x-6 text-sm">
              {footer.legalLinks.map((link) => (
                <SmoothScrollLink
                  key={link.label}
                  to={link.href}
                  className="text-gray-500 transition-colors hover:text-[#d4af37]"
                >
                  {link.label}
                </SmoothScrollLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
