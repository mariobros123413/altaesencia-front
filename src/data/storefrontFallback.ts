import type { Product } from '../types/product';
import type { StorefrontBootstrap } from '../types/storefront';

export const storefrontBootstrapFallback: StorefrontBootstrap = {
  brand: {
    name: 'AltaEsencia',
    shortName: 'AE',
    tagline: 'Estilo y Exclusividad'
  },
  commerce: {
    whatsappNumber: '59175540850',
    maxQuantityPerProduct: 3
  },
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      navSubtitle: 'Alta costura',
      title: 'Ropa de Alta Gama',
      description: 'Coleccion exclusiva de ropa de alto nivel de las mejores marcas',
      buttonText: 'VER ROPA',
      path: '/categoria/clothing',
      image: {
        src: 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg',
        alt: 'Ropa de alta gama'
      }
    },
    {
      id: 'perfumes',
      label: 'Perfumes',
      navSubtitle: 'Esencias selectas',
      title: 'Perfumes de Lujo',
      description: 'Aromas unicos de las marcas mas prestigiosas del mundo',
      buttonText: 'VER PERFUMES',
      path: '/categoria/perfumes',
      image: {
        src: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
        alt: 'Perfumes de lujo'
      }
    },
    {
      id: 'cosmetics',
      label: 'Cosmetics',
      navSubtitle: 'Belleza premium',
      title: 'Cosmeticos Premium',
      description: 'Productos de belleza premium con ingredientes de lujo',
      buttonText: 'VER COSMETICOS',
      path: '/categoria/cosmetics',
      image: {
        src: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
        alt: 'Cosmeticos premium'
      }
    }
  ],
  home: {
    sections: [
      { id: 'inicio', label: 'Inicio' },
      { id: 'categorias', label: 'Categorias' },
      { id: 'premium', label: 'Premium' },
      { id: 'perfumes', label: 'Perfumes' },
      { id: 'ofertas', label: 'Ofertas' },
      { id: 'contacto', label: 'Contacto' }
    ],
    hero: {
      title: 'ESTILO &\nEXCLUSIVIDAD',
      subtitle: 'Encuentra ropa, perfumes y cosmeticos de las marcas mas exclusivas.',
      ctaLabel: 'Ver Coleccion',
      ctaHref: '/#categorias',
      image: {
        src: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg',
        alt: 'Modelo con perfume'
      }
    },
    categoriesHeading: {
      title: 'Descubre AltaEsencia',
      subtitle: 'Moda de Alto Nivel, Perfumes Exclusivos y Cosmeticos Selectos'
    },
    premiumCollection: {
      title: 'Coleccion Premium',
      subtitle: 'Seleccion Exclusiva de Alta Calidad',
      description:
        'Descubre nuestra coleccion premium que combina lo mejor de la moda, fragancias y cosmeticos de marcas reconocidas mundialmente. Cada pieza ha sido cuidadosamente seleccionada para ofrecerte exclusividad y distincion.',
      ctaLabel: 'Ver Coleccion',
      ctaHref: '/categoria/clothing',
      images: [
        {
          src: 'https://images.pexels.com/photos/3990842/pexels-photo-3990842.jpeg',
          alt: 'Zapatillas premium'
        },
        {
          src: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
          alt: 'Gafas de sol'
        },
        {
          src: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg',
          alt: 'Perfume premium'
        },
        {
          src: 'https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg',
          alt: 'Perfumes de lujo'
        }
      ]
    },
    exclusivePerfumes: {
      title: 'Perfumes Exclusivos',
      subtitle: 'Descubre aromas unicos de las marcas mas prestigiosas.',
      description:
        'Cada fragancia cuenta una historia. Nuestros perfumes exclusivos son elaborados con las mejores esencias del mundo, creando experiencias olfativas incomparables que definen tu personalidad.',
      ctaLabel: 'Ver Perfumes',
      ctaHref: '/categoria/perfumes',
      items: [
        {
          id: 'preview-noir',
          name: 'AltaEsencia Noir',
          priceLabel: '$299.99',
          image: {
            src: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg',
            alt: 'AltaEsencia Noir'
          }
        },
        {
          id: 'preview-gold',
          name: 'AltaEsencia Gold',
          priceLabel: '$349.99',
          featured: true,
          image: {
            src: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
            alt: 'AltaEsencia Gold'
          }
        },
        {
          id: 'preview-prestige',
          name: 'AltaEsencia Prestige',
          priceLabel: '$279.99',
          image: {
            src: 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg',
            alt: 'AltaEsencia Prestige'
          }
        }
      ]
    },
    promo: {
      badge: 'Oferta Especial',
      title: 'Hasta 40% OFF',
      subtitle: 'En productos seleccionados de nuestra coleccion premium',
      benefits: [
        'Envio gratuito en compras superiores a $200',
        'Productos 100% originales garantizados'
      ],
      primaryCtaLabel: 'Comprar Ahora',
      primaryCtaHref: '/categoria/perfumes',
      secondaryCtaLabel: 'Ver Ofertas',
      secondaryCtaHref: '/#categorias',
      image: {
        src: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg',
        alt: 'Productos en promocion'
      }
    },
    footer: {
      description: 'Tu destino para moda exclusiva, perfumes de lujo y cosmeticos premium.',
      categoryLinks: [
        { label: 'Ropa de Alta Gama', href: '/categoria/clothing' },
        { label: 'Perfumes de Lujo', href: '/categoria/perfumes' },
        { label: 'Cosmeticos Premium', href: '/categoria/cosmetics' },
        { label: 'Seleccion Premium', href: '/#premium' }
      ],
      informationLinks: [
        { label: 'Sobre Nosotros', href: '/#inicio' },
        { label: 'Envios', href: '/#ofertas' },
        { label: 'Devoluciones', href: '/#contacto' },
        { label: 'Terminos y Condiciones', href: '/#contacto' }
      ],
      legalLinks: [
        { label: 'Politica de Privacidad', href: '/#contacto' },
        { label: 'Terminos de Uso', href: '/#contacto' }
      ],
      contact: {
        address: 'Av. Exclusiva 123, Ciudad',
        phone: '+591 75540850',
        email: 'info@altaesencia.com'
      },
      copyright: '(c) 2026 AltaEsencia. Todos los derechos reservados.'
    }
  }
};

export const fallbackProducts: Product[] = [
  {
    id: 'perfume-altaesencia-negro',
    name: 'Perfume AltaEsencia Negro',
    description: 'Fragancia exclusiva con notas de ambar y vainilla',
    price: 189.99,
    original_price: 249.99,
    category: 'perfumes',
    image_url: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg',
    is_promotional: true,
    discount_percentage: 24,
    rating: 4.9
  },
  {
    id: 'chaqueta-premium-negra',
    name: 'Chaqueta Premium Negra',
    description: 'Chaqueta de lujo en tela 100% algodon',
    price: 399.99,
    original_price: 499.99,
    category: 'clothing',
    image_url: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    is_promotional: true,
    discount_percentage: 20,
    rating: 4.8
  },
  {
    id: 'serum-facial-dorado',
    name: 'Serum Facial Dorado',
    description: 'Serum antienvejecimiento con oro coloidal',
    price: 129.99,
    original_price: 179.99,
    category: 'cosmetics',
    image_url: 'https://images.pexels.com/photos/3762285/pexels-photo-3762285.jpeg',
    is_promotional: false,
    discount_percentage: 0,
    rating: 4.7
  },
  {
    id: 'tom-ford-noir',
    name: 'Tom Ford Noir',
    description: 'Perfume de lujo Tom Ford Negro',
    price: 249.99,
    original_price: 349.99,
    category: 'perfumes',
    image_url: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg',
    is_promotional: false,
    discount_percentage: 0,
    rating: 5
  },
  {
    id: 'pantalon-premium-gris',
    name: 'Pantalon Premium Gris',
    description: 'Pantalon de vestir en lana fina italiana',
    price: 279.99,
    original_price: 349.99,
    category: 'clothing',
    image_url: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg',
    is_promotional: false,
    discount_percentage: 0,
    rating: 4.6
  },
  {
    id: 'lipstick-rojo-intenso',
    name: 'Lipstick Rojo Intenso',
    description: 'Labial de larga duracion en rojo profundo',
    price: 79.99,
    original_price: 99.99,
    category: 'cosmetics',
    image_url: 'https://images.pexels.com/photos/3987003/pexels-photo-3987003.jpeg',
    is_promotional: true,
    discount_percentage: 20,
    rating: 4.8
  },
  {
    id: 'dior-sauvage',
    name: 'Dior Sauvage',
    description: 'Perfume fresco y sofisticado de Dior',
    price: 199.99,
    original_price: 279.99,
    category: 'perfumes',
    image_url: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg',
    is_promotional: false,
    discount_percentage: 0,
    rating: 4.9
  },
  {
    id: 'sueter-de-cachemira',
    name: 'Sueter de Cachemira',
    description: 'Sueter premium en cachemira pura',
    price: 359.99,
    original_price: 459.99,
    category: 'clothing',
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    is_promotional: false,
    discount_percentage: 0,
    rating: 4.7
  },
  {
    id: 'crema-hidratante-luxury',
    name: 'Crema Hidratante Luxury',
    description: 'Crema facial con ingredientes premium',
    price: 149.99,
    original_price: 199.99,
    category: 'cosmetics',
    image_url: 'https://images.pexels.com/photos/3738313/pexels-photo-3738313.jpeg',
    is_promotional: false,
    discount_percentage: 0,
    rating: 4.8
  },
  {
    id: 'perfume-altaesencia-oro',
    name: 'Perfume AltaEsencia Oro',
    description: 'Fragancia dorada con notas florales',
    price: 219.99,
    original_price: 299.99,
    category: 'perfumes',
    image_url: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg',
    is_promotional: true,
    discount_percentage: 26,
    rating: 5
  }
];
