import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputField } from "@/components/auth/InputField";
import { productSchema, type ProductSchema } from "@/schemas/productSchema";
import type { Product } from "@/types/product.types";

interface ProductFormModalProps {
  initialProduct?: Product;
  onSubmit: (data: ProductSchema, imageFile: File | null) => Promise<void>;
  onClose: () => void;
}

export function ProductFormModal({ initialProduct, onSubmit, onClose }: ProductFormModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<ProductSchema>({
  resolver: zodResolver(productSchema),
  defaultValues: {
    name: initialProduct?.name ?? "",
    description: initialProduct?.description ?? "",
    price: initialProduct ? String(initialProduct.price) : "",
    stock: initialProduct ? String(initialProduct.stock) : "",
    category: initialProduct?.category ?? "",
  },
});

async function handleFormSubmit(values: ProductSchema) {
  await onSubmit(values, imageFile);
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          {initialProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-3">
          <InputField label="Name" error={errors.name?.message} {...register("name")} />
          <InputField label="Description" error={errors.description?.message} {...register("description")} />
          <InputField label="Price" type="number" step="0.01" error={errors.price?.message} {...register("price")} />
          <InputField label="Stock" type="number" error={errors.stock?.message} {...register("stock")} />
          <InputField label="Category" error={errors.category?.message} {...register("category")} />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : initialProduct ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}