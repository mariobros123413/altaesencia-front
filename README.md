# AltaEsencia

Landing ecommerce premium para moda, perfumes y cosmeticos, con catalogos por categoria, carrito local y cierre de compra por WhatsApp.

## Descripcion corta para GitHub

Puedes usar esta descripcion para tu repositorio:

`Frontend ecommerce premium con React, catalogos dinamicos, carrito local y checkout por WhatsApp, preparado para integrarse con backend API.`

## Que hace este proyecto

AltaEsencia es una aplicacion frontend construida para mostrar una experiencia de tienda premium con enfoque visual elegante y flujo de compra simple.

Actualmente permite:

- Navegar entre secciones de la home con scroll suave.
- Explorar catalogos por categoria: `clothing`, `perfumes` y `cosmetics`.
- Ver detalles de productos en modal.
- Agregar productos al carrito local.
- Ajustar cantidades en el carrito.
- Finalizar la compra por WhatsApp con un mensaje generado automaticamente.
- Consumir datos desde un backend HTTP mediante un controlador centralizado.

## Stack

- `React 18`
- `TypeScript`
- `Vite`
- `React Router`
- `Tailwind CSS`
- `Lucide React`

## Arquitectura de datos

El frontend ya esta preparado para no depender directamente de la base de datos.

La fuente de verdad esperada es:

- Un backend configurado con `VITE_BACKEND_API_URL`

El frontend consume ese backend a traves de:

- [src/controllers/storefrontController.ts](./src/controllers/storefrontController.ts)
- [src/context/StorefrontContext.tsx](./src/context/StorefrontContext.tsx)

Mientras no exista backend configurado, el proyecto usa fallback local centralizado en:

- [src/data/storefrontFallback.ts](./src/data/storefrontFallback.ts)

## Flujo de compra

El carrito:

- Se guarda localmente en el navegador.
- No persiste en backend.
- Solo se usa para construir el checkout final.

La compra se completa mediante un enlace de WhatsApp que incluye:

- Productos seleccionados
- Cantidades
- Subtotales
- Total final

## Estructura principal

- `src/components/`
  Componentes visuales y secciones del sitio.
- `src/pages/`
  Paginas principales como catalogo y carrito.
- `src/context/`
  Estado global del carrito y del storefront.
- `src/controllers/`
  Capa de acceso a backend.
- `src/types/`
  Tipos y contratos del frontend.
- `src/data/`
  Datos fallback temporales.
- `docs/`
  Documentacion funcional y contratos backend/frontend.

## Endpoints esperados del backend

El frontend espera como minimo:

- `GET /storefront/bootstrap`
- `GET /storefront/categories/:categoryId/products`

La especificacion completa esta en:

- [docs/FRONTEND_BACKEND_CONTRACT.md](./docs/FRONTEND_BACKEND_CONTRACT.md)

## Variables de entorno

Crea o completa tu archivo `.env` con:

```env
VITE_BACKEND_API_URL=
```

Si esa variable no existe, el proyecto usa datos fallback locales.

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build de produccion

```bash
npm run build
```

## Vista previa local

```bash
npm run preview
```

## Estado actual

El proyecto ya incluye:

- Loader inicial de pantalla completa.
- Navegacion optimizada.
- Carga suave de imagenes.
- Carrito local funcional.
- Checkout por WhatsApp.
- Contrato de integracion con backend.

## Proximos pasos sugeridos

- Conectar `VITE_BACKEND_API_URL` a tu API real.
- Reemplazar los fallbacks locales por respuestas reales del backend.
- Agregar autenticacion si mas adelante se necesita cuenta de usuario.
- Implementar panel admin o CMS para gestionar contenido comercial.
