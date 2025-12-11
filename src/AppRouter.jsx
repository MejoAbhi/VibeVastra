import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

/**
 * AppRouter:
 * - "/" -> Home (public storefront)
 * - "/admin" -> AdminLogin or Dashboard (protected route handled inside pages)
 *
 * We also keep a small external-link anchor to /admin; you can use this URL externally
 * (e.g., send to admin@... or bookmark).
 */
export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* fallback to home */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* small floating admin shortcut (optional) */}
      <a
        href="/admin"
        className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded shadow-lg"
        title="Admin"
      >
        Admin
      </a>
    </>
  );
}
