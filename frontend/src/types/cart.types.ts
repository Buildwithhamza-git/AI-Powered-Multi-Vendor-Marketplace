import type { Product } from "@/types/product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}