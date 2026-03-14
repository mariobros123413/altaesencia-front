/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `description` (text, product description)
      - `price` (numeric, product price)
      - `original_price` (numeric, original price for discounts)
      - `category` (text, product category: clothing, perfumes, cosmetics)
      - `image_url` (text, product image URL)
      - `is_promotional` (boolean, whether it's on promotion)
      - `discount_percentage` (integer, discount percentage if on promotion)
      - `rating` (numeric, product rating)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (products are public)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  original_price numeric(10, 2),
  category text NOT NULL CHECK (category IN ('clothing', 'perfumes', 'cosmetics')),
  image_url text NOT NULL,
  is_promotional boolean DEFAULT false,
  discount_percentage integer DEFAULT 0,
  rating numeric(3, 1) DEFAULT 5.0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are public"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO products (name, description, price, original_price, category, image_url, is_promotional, discount_percentage, rating) VALUES
('Perfume AltaEsencia Negro', 'Fragancia exclusiva con notas de ámbar y vainilla', 189.99, 249.99, 'perfumes', 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg', true, 24, 4.9),
('Chaqueta Premium Negra', 'Chaqueta de lujo en tela 100% algodón', 399.99, 499.99, 'clothing', 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg', true, 20, 4.8),
('Sérum Facial Dorado', 'Sérum antienvejecimiento con oro coloidal', 129.99, 179.99, 'cosmetics', 'https://images.pexels.com/photos/3762285/pexels-photo-3762285.jpeg', false, 0, 4.7),
('Tom Ford Noir', 'Perfume de lujo Tom Ford Negro', 249.99, 349.99, 'perfumes', 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg', false, 0, 5.0),
('Pantalón Premium Gris', 'Pantalón de vestir en lana fina italiana', 279.99, 349.99, 'clothing', 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg', false, 0, 4.6),
('Lipstick Rojo Intenso', 'Labial de larga duración en rojo profundo', 79.99, 99.99, 'cosmetics', 'https://images.pexels.com/photos/3987003/pexels-photo-3987003.jpeg', true, 20, 4.8),
('Dior Sauvage', 'Perfume fresco y sofisticado de Dior', 199.99, 279.99, 'perfumes', 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg', false, 0, 4.9),
('Suéter de Cachemira', 'Suéter premium en cachemira pura', 359.99, 459.99, 'clothing', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', false, 0, 4.7),
('Crema Hidratante Luxury', 'Crema facial con ingredientes premium', 149.99, 199.99, 'cosmetics', 'https://images.pexels.com/photos/3738313/pexels-photo-3738313.jpeg', false, 0, 4.8),
('Perfume AltaEsencia Oro', 'Fragancia dorada con notas florales', 219.99, 299.99, 'perfumes', 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg', true, 26, 5.0);
