import { api } from "@/api/axiosInstance";
import type { Product } from "@/types/product.types";

interface ProductListResponse {
  success: boolean;
  count: number;
  data: Product[];
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export async function getSellerProducts(token: string) {
  const res = await api.get<ProductListResponse>("/products/seller", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createProduct(formData: FormData, token: string) {
  const res = await api.post<ProductResponse>("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateProduct(id: string, formData: FormData, token: string) {
  const res = await api.put<ProductResponse>(`/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function deleteProduct(id: string, token: string) {
  const res = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


export async function getAllProducts(params: { search?: string; page?: number; limit?: number } = {}) {
  const res = await api.get<ProductListResponse>("/products", { params });
  return res.data;
}