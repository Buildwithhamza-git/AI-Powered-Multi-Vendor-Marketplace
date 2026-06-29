import { useEffect, useState } from "react";
import { getAllProducts } from "@/api/productApi";
import { ProductCard } from "@/components/Buyer/ProductCard";
import type { Product } from "@/types/product.types";
import { useCart } from "@/context/CartContext";

export default function BuyerHomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

async function loadProducts() {
  setIsLoading(true);
  try {
    const res = await getAllProducts({ search, page, limit: 12 });
    setProducts(res.data);
    setTotalPages(res.totalPages);
  } catch (err) {
    console.error("Failed to load products:", err);
  } finally {
    setIsLoading(false);
  }
}

useEffect(() => {
  loadProducts();
}, [search, page]);

 const { addToCart } = useCart();

function handleAddToCart(product: Product) {
  addToCart(product);
}

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold text-gray-900">All Products</h1>
    <div className="mb-4">
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
  />
</div>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
  <p className="text-sm text-gray-500">
    {search ? `No products found for "${search}".` : "No products available right now."}
  </p>
) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}