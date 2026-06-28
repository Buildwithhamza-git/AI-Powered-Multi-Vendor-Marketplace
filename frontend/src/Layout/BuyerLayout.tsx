import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Buyer/Navbar";

export function BuyerLayout() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}