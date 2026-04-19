export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string;
  image_urls?: string[] | null;
  is_promotional: boolean;
  discount_percentage: number;
  rating: number;
}
