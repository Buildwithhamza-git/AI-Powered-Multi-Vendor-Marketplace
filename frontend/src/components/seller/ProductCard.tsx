import { MoreVertical } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const imageSrc = product.imageUrl ? `http://localhost:5000${product.imageUrl}` : null;

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100"
        aria-label="Product options"
      >
        <MoreVertical size={18} className="text-gray-500" />
      </button>

      {menuOpen && (
        <div className="absolute right-3 top-10 z-10 w-32 rounded-lg border border-gray-200 bg-white shadow-md">
          <button
            type="button"
            onClick={() => {
              onEdit(product);
              setMenuOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete(product._id);
              setMenuOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {imageSrc ? (
          <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        )}
      </div>

      <h3 className="truncate text-sm font-semibold text-gray-900">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
        <span className="text-xs text-gray-500">{product.stock} in stock</span>
      </div>
    </div>
  );
}