// src/components/ProductCard.jsx
import React, { useState } from "react";

/**
 * Props:
 * - product: product object (from products.js)
 * - onAdd(product, selectedColor) : handler for adding quickly
 * - onOpen(product) : handler to open modal
 */
export default function ProductCard({ product, onAdd, onOpen }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);

  // choose display image: if selectedColor has image, use it, else product.image
  const displayImage = selectedColor?.image || product.image;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-w-4 bg-gray-100">
        <img src={displayImage} alt={product.title} className="object-cover w-full h-full" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{product.title}</h3>
          <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
        </div>

        <p className="text-sm text-gray-500 mt-2 flex-1">{product.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">Colors{selectedColor ? `: ${selectedColor.name}` : ""}</div>
              <div className="flex gap-1">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`w-5 h-5 rounded-full border ${selectedColor === c ? "ring-2 ring-offset-1 ring-indigo-500" : ""}`}
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">Sizes{selectedSize ? `: ${selectedSize}` : ""}</div>
              <div className="flex gap-1">
                {product.sizes.map((s, i) => (
                  <button
                    key={i}
                    className={`px-1.5 py-0.5 text-xs border rounded ${selectedSize === s ? "bg-indigo-600 text-white border-indigo-600" : "text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(s);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => onOpen(product)} className="text-sm px-3 py-2 border rounded-md hover:bg-gray-50">Quick view</button>
          <button onClick={() => onAdd(product, selectedColor, selectedSize)} className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-md">Add</button>
        </div>
      </div>
    </div>
  );
}
