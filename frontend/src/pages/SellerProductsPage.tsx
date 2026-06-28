import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSellerProducts, createProduct, updateProduct, deleteProduct } from "@/api/productApi";
import { ProductCard } from "@/components/seller/ProductCard";
import { ProductFormModal } from "@/components/seller/ProductFormModal";
import type { Product } from "@/types/product.types";
import type { ProductSchema } from "@/schemas/productSchema";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export default function SellerProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await getSellerProducts(token);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function buildFormData(values: ProductSchema, imageFile: File | null) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    if (values.stock !== undefined) formData.append("stock", String(values.stock));
    if (values.category) formData.append("category", values.category);
    if (imageFile) formData.append("image", imageFile);
    return formData;
  }

  async function handleCreate(values: ProductSchema, imageFile: File | null) {
    if (!token) return;
    const formData = buildFormData(values, imageFile);
    await createProduct(formData, token);
    setShowModal(false);
    loadProducts();
  }

  async function handleUpdate(values: ProductSchema, imageFile: File | null) {
    if (!token || !editingProduct) return;
    const formData = buildFormData(values, imageFile);
    await updateProduct(editingProduct._id, formData, token);
    setEditingProduct(undefined);
    setShowModal(false);
    loadProducts();
  }

  async function confirmDelete() {
    if (!token || !deleteTarget) return;
    await deleteProduct(deleteTarget, token);
    setDeleteTarget(null);
    loadProducts();
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Your Products</h1>
        <button
          type="button"
          onClick={() => {
            setEditingProduct(undefined);
            setShowModal(true);
          }}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          + Add Product
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-500">No products found. Add your first product.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={(p) => {
                setEditingProduct(p);
                setShowModal(true);
              }}
              onDelete={(id) => setDeleteTarget(id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <ProductFormModal
          initialProduct={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(undefined);
          }}
        />
      )}
      {deleteTarget && (
  <ConfirmDialog
    title="Delete Product"
    message="Are you sure you want to delete this product? This cannot be undone."
    onConfirm={confirmDelete}
    onCancel={() => setDeleteTarget(null)}
  />
)}
    </div>
  );
}