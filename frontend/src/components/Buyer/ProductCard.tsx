import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const imageSrc = product.imageUrl ? `http://localhost:5000${product.imageUrl}` : null;
  const outOfStock = product.stock <= 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
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
        {outOfStock && <span className="text-xs font-medium text-red-500">Out of stock</span>}
      </div>

      <button
        type="button"
        disabled={outOfStock}
        onClick={() => onAddToCart(product)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
      >
        <ShoppingCart size={16} />
        {outOfStock ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
}