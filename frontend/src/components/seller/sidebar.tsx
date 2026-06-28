import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Products", to: "/seller/products" },
  { label: "Orders", to: "/seller/orders" },
  { label: "Analytics", to: "/seller/analytics" },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-60 flex-col justify-between border-r border-gray-200 bg-white p-4">
      <div>
        <h2 className="mb-6 px-2 text-lg font-bold text-gray-900">ShopHub Seller</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        type="button"
        onClick={logout}
        className="rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        Logout
      </button>
    </aside>
  );
}