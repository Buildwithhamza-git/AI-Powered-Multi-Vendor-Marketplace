import { NavLink } from "react-router-dom";
import { ShoppingCart, Search, PackageSearch, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h2 className="text-lg font-bold text-gray-900">ShopHub</h2>

      

      <nav className="flex items-center gap-5">
        <NavLink
          to="/buyer/about"
          className={({ isActive }) =>
            `text-sm font-medium ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"}`
          }
        >
          About Us
        </NavLink>

        <NavLink to="/buyer/track-order" className="text-gray-600 hover:text-gray-900" aria-label="Track order">
          <PackageSearch size={20} />
        </NavLink>

        <NavLink to="/buyer/account" className="text-gray-600 hover:text-gray-900" aria-label="My account">
          <UserCircle size={20} />
        </NavLink>

        <NavLink to="/buyer/cart" className="relative text-gray-600 hover:text-gray-900" aria-label="Cart">
          <ShoppingCart size={20} />
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
            {totalItems}
          </span>
        </NavLink>

        <button type="button" onClick={logout} className="text-sm font-medium text-gray-500 hover:text-gray-800">
          Logout
        </button>
      </nav>
    </header>
  );
}