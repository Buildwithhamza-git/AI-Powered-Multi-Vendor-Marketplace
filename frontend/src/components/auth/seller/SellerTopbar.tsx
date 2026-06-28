import { Bell, Search } from "lucide-react";

export function SellerTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search your products..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <button type="button" className="relative rounded-full p-2 hover:bg-gray-100" aria-label="Notifications">
        <Bell size={20} className="text-gray-600" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
      </button>
    </header>
  );
}