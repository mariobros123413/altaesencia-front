# Frontend / Backend Contract

## Resumen

Este documento describe todos los contratos que el frontend necesita para operar.

Estado actual del frontend:

- El frontend ya no consulta la base de datos directamente.
- El frontend esta preparado para consumir un backend HTTP configurado con `VITE_BACKEND_API_URL`.
- El carrito sigue siendo local en el navegador.
- La compra final se completa por WhatsApp a partir del contenido del carrito local.

## Variables de entorno

### Frontend

| Variable | Tipo | Requerida | Descripcion |
| --- | --- | --- | --- |
| `VITE_BACKEND_API_URL` | `string` | Si | URL base del backend que expondra los endpoints del storefront. Ejemplo: `https://api.tudominio.com` |

Nota:

- Si `VITE_BACKEND_API_URL` no esta configurada, el frontend usa fallback local temporal.

## Endpoints requeridos por el frontend

## 1. Bootstrap del storefront

### Endpoint

`GET /storefront/bootstrap`

### Input

Sin body.

### Query params

Sin query params.

### Headers esperados

| Header | Tipo | Requerido | Valor |
| --- | --- | --- | --- |
| `Accept` | `string` | Si | `application/json` |

### Output esperado

Tipo raíz:

```ts
interface StorefrontBootstrap {
  brand: BrandConfig;
  commerce: CommerceConfig;
  categories: CategorySummary[];
  home: HomePageContent;
}
```

### Tipos usados

```ts
type CategoryId = 'clothing' | 'perfumes' | 'cosmetics';

interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
}

interface CommerceConfig {
  whatsappNumber: string;
  maxQuantityPerProduct: number;
}

interface NavigationSection {
  id: string;
  label: string;
}

interface ImageAsset {
  src: string;
  alt: string;
}

interface CategorySummary {
  id: CategoryId;
  label: string;
  navSubtitle: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  image: ImageAsset;
}

interface HeroContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: ImageAsset;
}

interface PremiumCollectionContent {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  images: ImageAsset[];
}

interface FeaturedPerfumeItem {
  id: string;
  name: string;
  priceLabel: string;
  image: ImageAsset;
  featured?: boolean;
}

interface ExclusivePerfumesContent {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  items: FeaturedPerfumeItem[];
}

interface PromoContent {
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: ImageAsset;
}

interface FooterLink {
  label: string;
  href: string;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface FooterContent {
  description: string;
  categoryLinks: FooterLink[];
  informationLinks: FooterLink[];
  legalLinks: FooterLink[];
  contact: ContactInfo;
  copyright: string;
}

interface HomePageContent {
  sections: NavigationSection[];
  hero: HeroContent;
  categoriesHeading: {
    title: string;
    subtitle: string;
  };
  premiumCollection: PremiumCollectionContent;
  exclusivePerfumes: ExclusivePerfumesContent;
  promo: PromoContent;
  footer: FooterContent;
}
```

### Ejemplo de response

```json
{
  "brand": {
    "name": "AltaEsencia",
    "shortName": "AE",
    "tagline": "Estilo y Exclusividad"
  },
  "commerce": {
    "whatsappNumber": "59175540850",
    "maxQuantityPerProduct": 3
  },
  "categories": [
    {
      "id": "clothing",
      "label": "Clothing",
      "navSubtitle": "Alta costura",
      "title": "Ropa de Alta Gama",
      "description": "Coleccion exclusiva de ropa de alto nivel de las mejores marcas",
      "buttonText": "VER ROPA",
      "path": "/categoria/clothing",
      "image": {
        "src": "https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg",
        "alt": "Ropa de alta gama"
      }
    },
    {
      "id": "perfumes",
      "label": "Perfumes",
      "navSubtitle": "Esencias selectas",
      "title": "Perfumes de Lujo",
      "description": "Aromas unicos de las marcas mas prestigiosas del mundo",
      "buttonText": "VER PERFUMES",
      "path": "/categoria/perfumes",
      "image": {
        "src": "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
        "alt": "Perfumes de lujo"
      }
    },
    {
      "id": "cosmetics",
      "label": "Cosmetics",
      "navSubtitle": "Belleza premium",
      "title": "Cosmeticos Premium",
      "description": "Productos de belleza premium con ingredientes de lujo",
      "buttonText": "VER COSMETICOS",
      "path": "/categoria/cosmetics",
      "image": {
        "src": "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
        "alt": "Cosmeticos premium"
      }
    }
  ],
  "home": {
    "sections": [
      { "id": "inicio", "label": "Inicio" },
      { "id": "categorias", "label": "Categorias" },
      { "id": "premium", "label": "Premium" },
      { "id": "perfumes", "label": "Perfumes" },
      { "id": "ofertas", "label": "Ofertas" },
      { "id": "contacto", "label": "Contacto" }
    ],
    "hero": {
      "title": "ESTILO &\nEXCLUSIVIDAD",
      "subtitle": "Encuentra ropa, perfumes y cosmeticos de las marcas mas exclusivas.",
      "ctaLabel": "Ver Coleccion",
      "ctaHref": "/#categorias",
      "image": {
        "src": "https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg",
        "alt": "Modelo con perfume"
      }
    },
    "categoriesHeading": {
      "title": "Descubre AltaEsencia",
      "subtitle": "Moda de Alto Nivel, Perfumes Exclusivos y Cosmeticos Selectos"
    },
    "premiumCollection": {
      "title": "Coleccion Premium",
      "subtitle": "Seleccion Exclusiva de Alta Calidad",
      "description": "Descripcion de la seccion premium",
      "ctaLabel": "Ver Coleccion",
      "ctaHref": "/categoria/clothing",
      "images": [
        { "src": "https://...", "alt": "Imagen 1" },
        { "src": "https://...", "alt": "Imagen 2" },
        { "src": "https://...", "alt": "Imagen 3" },
        { "src": "https://...", "alt": "Imagen 4" }
      ]
    },
    "exclusivePerfumes": {
      "title": "Perfumes Exclusivos",
      "subtitle": "Descubre aromas unicos de las marcas mas prestigiosas.",
      "description": "Descripcion de la seccion perfumes",
      "ctaLabel": "Ver Perfumes",
      "ctaHref": "/categoria/perfumes",
      "items": [
        {
          "id": "preview-noir",
          "name": "AltaEsencia Noir",
          "priceLabel": "$299.99",
          "image": {
            "src": "https://...",
            "alt": "AltaEsencia Noir"
          }
        }
      ]
    },
    "promo": {
      "badge": "Oferta Especial",
      "title": "Hasta 40% OFF",
      "subtitle": "En productos seleccionados de nuestra coleccion premium",
      "benefits": [
        "Envio gratuito en compras superiores a $200",
        "Productos 100% originales garantizados"
      ],
      "primaryCtaLabel": "Comprar Ahora",
      "primaryCtaHref": "/categoria/perfumes",
      "secondaryCtaLabel": "Ver Ofertas",
      "secondaryCtaHref": "/#categorias",
      "image": {
        "src": "https://...",
        "alt": "Productos en promocion"
      }
    },
    "footer": {
      "description": "Tu destino para moda exclusiva, perfumes de lujo y cosmeticos premium.",
      "categoryLinks": [
        { "label": "Ropa de Alta Gama", "href": "/categoria/clothing" }
      ],
      "informationLinks": [
        { "label": "Sobre Nosotros", "href": "/#inicio" }
      ],
      "legalLinks": [
        { "label": "Politica de Privacidad", "href": "/#contacto" }
      ],
      "contact": {
        "address": "Av. Exclusiva 123, Ciudad",
        "phone": "+591 75540850",
        "email": "info@altaesencia.com"
      },
      "copyright": "(c) 2026 AltaEsencia. Todos los derechos reservados."
    }
  }
}
```

## 2. Productos por categoria

### Endpoint

`GET /storefront/categories/:categoryId/products`

### Params

| Param | Tipo | Requerido | Valores |
| --- | --- | --- | --- |
| `categoryId` | `string` | Si | `clothing`, `perfumes`, `cosmetics` |

### Input

Sin body.

### Headers esperados

| Header | Tipo | Requerido | Valor |
| --- | --- | --- | --- |
| `Accept` | `string` | Si | `application/json` |

### Output esperado

El frontend actualmente espera directamente:

```ts
type CategoryProductsResponse = Product[];
```

### Tipo `Product`

```ts
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string;
  is_promotional: boolean;
  discount_percentage: number;
  rating: number;
}
```

### Reglas importantes

- `id`: string unico y estable.
- `category`: debe coincidir con el `categoryId` solicitado.
- `price`: numero decimal.
- `original_price`: `null` o numero decimal.
- `is_promotional`: boolean.
- `discount_percentage`: entero.
- `rating`: numero decimal, idealmente entre `0` y `5`.

### Ejemplo de response

```json
[
  {
    "id": "perfume-altaesencia-negro",
    "name": "Perfume AltaEsencia Negro",
    "description": "Fragancia exclusiva con notas de ambar y vainilla",
    "price": 189.99,
    "original_price": 249.99,
    "category": "perfumes",
    "image_url": "https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg",
    "is_promotional": true,
    "discount_percentage": 24,
    "rating": 4.9
  }
]
```

## 3. Errores del backend

Cuando haya error HTTP, el frontend intenta leer este formato:

```ts
interface BackendErrorResponse {
  message: string;
}
```

### Ejemplo

```json
{
  "message": "Category not found"
}
```

## 4. Payload interno del carrito

Esto no viaja al backend. Se guarda localmente en `localStorage`.

### Estructura

```ts
interface CartItem extends Product {
  quantity: number;
}
```

### Reglas

- `quantity` minima: `1`
- `quantity` maxima: `commerce.maxQuantityPerProduct`
- El frontend no persiste el carrito en backend.

## 5. Payload interno para checkout por WhatsApp

El frontend no llama a un endpoint para comprar. Solo genera una URL.

### Input interno

```ts
{
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  whatsappNumber: string;
}
```

### Output interno

```ts
type WhatsAppCheckoutUrl = string;
```

### Formato generado

```txt
https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}
```

### Mensaje que arma el frontend

```txt
Hola AltaEsencia, quiero completar mi compra:

- Producto A | Cantidad: 2 | Subtotal: $399.98
- Producto B | Cantidad: 1 | Subtotal: $79.99

Total de productos: 3
Total a pagar: $479.97
```

## 6. Mapeo de consumo por pantalla

## Home

Pantallas/componentes que consumen `GET /storefront/bootstrap`:

- `Hero`
- `Categories`
- `PremiumCollection`
- `ExclusivePerfumes`
- `PromoSection`
- `Footer`
- `SiteHeader`
- `CategoryTopBar`

Campos usados:

- `brand`
- `commerce`
- `categories`
- `home.sections`
- `home.hero`
- `home.categoriesHeading`
- `home.premiumCollection`
- `home.exclusivePerfumes`
- `home.promo`
- `home.footer`

## Catalogo por categoria

Pantalla/componente:

- `CategoryPage`
- `ProductGallery`

Datos usados:

- `categories[]` desde bootstrap para textos, navegación y metadatos.
- `GET /storefront/categories/:categoryId/products` para el listado real.

## Carrito

Pantalla/componente:

- `CartPage`

Datos usados:

- `commerce.whatsappNumber`
- `commerce.maxQuantityPerProduct`
- `CartItem[]` local

No necesita endpoint de backend.

## 7. Endpoints finales recomendados

Lista mínima para operar con el frontend actual:

1. `GET /storefront/bootstrap`
2. `GET /storefront/categories/:categoryId/products`

## 8. Recomendaciones de implementación backend

- Mantener `path` ya resuelto desde backend para no duplicar reglas en frontend.
- Validar que `categoryId` solo acepte `clothing`, `perfumes`, `cosmetics`.
- Enviar siempre precios como `number`, no como string.
- Enviar siempre `image.alt` y `image.src` en el bootstrap.
- Si en el futuro agregas nuevas categorias, el frontend podra crecer mas facil si el backend expone tambien icon keys o theme metadata.

## 9. Estado actual del frontend

Archivos principales del contrato:

- `src/types/storefront.ts`
- `src/controllers/storefrontController.ts`
- `src/context/StorefrontContext.tsx`
- `src/data/storefrontFallback.ts`

## 10. Nota importante

Aunque todavia existe informacion temporal de fallback dentro del frontend, esa data ya esta centralizada solo como respaldo.

La fuente objetivo de verdad debe ser:

- Tu backend HTTP en `VITE_BACKEND_API_URL`

Y la compra final debe seguir siendo:

- Carrito local en web
- Checkout final por enlace de WhatsApp
