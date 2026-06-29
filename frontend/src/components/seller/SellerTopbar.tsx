import { Bell, Search } from "lucide-react";

export function SellerTopbar() {
  return (
    <header className="flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6">
    

      <button type="button" className="relative rounded-full  p-2 hover:bg-gray-100" aria-label="Notifications">
        <Bell size={20} className="text-gray-600" />
        <span className="absolute right-1.5  top-1.5 h-2 w-2 rounded-full bg-orange-500" />
      </button>
    </header>
  );
}