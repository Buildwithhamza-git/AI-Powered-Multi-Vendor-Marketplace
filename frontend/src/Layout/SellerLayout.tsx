import { Outlet } from "react-router-dom";
import { SellerTopbar } from "@/components/auth/seller/SellerTopbar";
import { Sidebar } from "@/components/auth/seller/sidebar";

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