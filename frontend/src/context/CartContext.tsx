import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/types/product.types";
import type { CartItem } from "@/types/cart.types";

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  function persist(nextItems: CartItem[]) {
    setItems(nextItems);
    localStorage.setItem("cartItems", JSON.stringify(nextItems));
  }

  function addToCart(product: Product) {
    const existing = items.find((item) => item.product._id === product._id);

    if (existing) {
      const next = items.map((item) =>
        item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      persist(next);
    } else {
      persist([...items, { product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId: string) {
    persist(items.filter((item) => item.product._id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const next = items.map((item) => (item.product._id === productId ? { ...item, quantity } : item));
    persist(next);
  }

  function clearCart() {
    persist([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider.");
  }
  return ctx;
}