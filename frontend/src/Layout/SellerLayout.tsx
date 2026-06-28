import { Outlet } from "react-router-dom";
import { SellerTopbar } from "@/components/seller/SellerTopbar";
import { Sidebar } from "@/components/seller/sidebar";

export function SellerLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <SellerTopbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}