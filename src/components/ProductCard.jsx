// src/components/ProductCard.jsx
import React from "react";

/**
 * Props:
 * - product: product object (from products.js)
 * - onAdd(product) : handler for adding quickly (no variants)
 * - onOpen(product) : handler to open modal (recommended for variants)
 */
export default function ProductCard({ product, onAdd, onOpen }) {
  const primaryColor = product.colors && product.colors[0];

  // choose display image: if product has colors prefer color image
  const displayImage = (product.colors && product.colors[0] && product.colors[0].image) ? product.colors[0].image : product.image;

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

        <div className="mt-3 flex items-center gap-3">
          {primaryColor && (
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">Color</div>
              <div className="w-5 h-5 rounded-full border" title={primaryColor.name} style={{ backgroundColor: primaryColor.hex }} />
            </div>
          )}

          {product.sizes && (
            <div className="text-xs text-gray-500 ml-2">Sizes: {product.sizes.join("/")}</div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => onOpen(product)} className="text-sm px-3 py-2 border rounded-md hover:bg-gray-50">Quick view</button>
          <button onClick={() => onAdd(product)} className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-md">Add</button>
        </div>
      </div>
    </div>
  );
}
