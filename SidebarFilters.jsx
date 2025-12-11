import React from "react";

export default function SidebarFilters({ categories, active, onChange, priceRange, onPriceChange }) {
  return (
    <aside className="hidden lg:block w-64">
      <div className="sticky top-[88px] space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
          <div className="space-y-2">
            <button onClick={() => onChange(null)} className={`block text-left w-full px-3 py-2 rounded-md ${active === null ? "bg-indigo-50 text-indigo-600" : "text-white hover:bg-white/10"}`}>All</button>
            {categories.map((c) => (
              <button key={c} onClick={() => onChange(c)} className={`block text-left w-full px-3 py-2 rounded-md ${active === c ? "bg-indigo-50 text-indigo-600" : "text-white hover:bg-white/10"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Price</h4>
          <div className="flex gap-2">
            <input type="number" value={priceRange.min} onChange={(e) => onPriceChange({ ...priceRange, min: Number(e.target.value) })} className="w-24 border rounded-md px-2 py-1 bg-transparent text-white border-white/50" />
            <input type="number" value={priceRange.max} onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })} className="w-24 border rounded-md px-2 py-1 bg-transparent text-white border-white/50" />
          </div>
        </div>
      </div>
    </aside>
  );
}
