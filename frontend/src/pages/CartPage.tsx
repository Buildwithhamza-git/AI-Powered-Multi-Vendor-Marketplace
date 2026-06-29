import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div>
      <h1 className="mb-5 text-xl font-bold text-gray-900">Your Cart</h1>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const imageSrc = item.product.imageUrl
            ? `http://localhost:5000${item.product.imageUrl}`
            : null;

          return (
            <div
              key={item.product._id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {imageSrc && <img src={imageSrc} alt={item.product.name} className="h-full w-full object-cover" />}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="h-7 w-7 rounded-full border border-gray-300 text-sm hover:bg-gray-50"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  className="h-7 w-7 rounded-full border border-gray-300 text-sm hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.product._id)}
                className="text-xs font-medium text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        <button type="button" onClick={clearCart} className="text-sm font-medium text-gray-500 hover:text-gray-700">
          Clear Cart
        </button>
        <span className="text-lg font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}