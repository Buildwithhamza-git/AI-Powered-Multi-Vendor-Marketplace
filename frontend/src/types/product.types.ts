export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}