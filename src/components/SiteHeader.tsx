import { Menu, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { categoryLinks, homeSections } from '../lib/navigation';
import SmoothScrollLink from './SmoothScrollLink';

const SiteHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(location.hash.replace('#', '') || 'inicio');

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const sectionIds = homeSections.map((section) => section.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.6]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      setActiveSection(location.hash.replace('#', ''));
      return;
    }

    if (location.pathname === '/') {
      setActiveSection('inicio');
    }
  }, [location.hash, location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-[#d4af37]/15 bg-[#09110e]/88 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <SmoothScrollLink
            to="/#inicio"
            className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/15 bg-[#101814] px-4 py-2 text-[#d4af37] transition-colors duration-300 hover:border-[#d4af37]/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4af37] text-black">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg leading-none">AltaEsencia</span>
          </SmoothScrollLink>

          <nav className="hidden items-center gap-2 lg:flex">
            {homeSections.map((section) => (
              <SmoothScrollLink
                key={section.id}
                to={`/#${section.id}`}
                className={[
                  'rounded-full px-4 py-2 text-sm uppercase tracking-[0.24em] transition-all duration-300',
                  location.pathname === '/' && activeSection === section.id
                    ? 'bg-[#d4af37] text-black'
                    : 'text-gray-300 hover:bg-[#15211c] hover:text-[#d4af37]'
                ].join(' ')}
              >
                {section.label}
              </SmoothScrollLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            {categoryLinks.map((category) => (
              <NavLink
                key={category.id}
                to={`/categoria/${category.id}`}
                className={({ isActive }) =>
                  [
                    'rounded-full border px-4 py-2 text-sm transition-all duration-300',
                    isActive
                      ? 'border-[#d4af37]/50 bg-[#d4af37]/15 text-[#f2d680]'
                      : 'border-[#d4af37]/10 bg-[#101814] text-gray-300 hover:border-[#d4af37]/30 hover:text-[#d4af37]'
                  ].join(' ')
                }
              >
                {category.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/15 bg-[#101814] text-[#d4af37] lg:hidden"
            aria-label="Abrir navegacion"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 border-t border-[#d4af37]/10 pt-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {homeSections.map((section) => (
                <SmoothScrollLink
                  key={section.id}
                  to={`/#${section.id}`}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-gray-200 transition-colors duration-300 hover:bg-[#15211c] hover:text-[#d4af37]"
                >
                  {section.label}
                </SmoothScrollLink>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {categoryLinks.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      'rounded-2xl border px-4 py-3 text-center text-sm transition-all duration-300',
                      isActive
                        ? 'border-[#d4af37]/50 bg-[#d4af37]/15 text-[#f2d680]'
                        : 'border-[#d4af37]/10 bg-[#101814] text-gray-300 hover:border-[#d4af37]/30 hover:text-[#d4af37]'
                    ].join(' ')
                  }
                >
                  {category.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
