// src/layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 px-4 py-2">
        <Outlet />
      </main>
      {/* Add Footer or BottomNav here if global */}
    </div>
  );
}
