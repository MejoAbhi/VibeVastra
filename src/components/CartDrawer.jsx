// src/components/CartDrawer.jsx
import React from "react";

/**
 * Props:
 * - open: boolean
 * - items: array of cart items
 * - onClose(): close drawer
 * - onRemove(id): remove item by id (or unique key)
 * - onChangeQty(id, qty): change item qty
 *
 * Items expected to have:
 *  id, title, price, qty, image, selectedSize, selectedColor, selectedColorHex
 */

export default function CartDrawer({ open, items, onClose, onRemove, onChangeQty }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className={`fixed inset-0 z-40 pointer-events-none ${open ? '' : 'opacity-0'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`} onClick={onClose}></div>

      <aside className={`absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b">
          <h3 className="text-lg font-semibold">Your cart</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">✕</button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {items.map((it, idx) => (
                <li key={idx} className="flex gap-4 items-center">
                  <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{it.title}</h4>
                      <div className="text-sm text-gray-600">${(it.price * it.qty).toFixed(2)}</div>
                    </div>

                    <div className="text-sm text-gray-500">
                      ${it.price.toFixed(2)} each
                      {it.selectedSize && <span className="ml-3">• Size: <b>{it.selectedSize}</b></span>}
                      {it.selectedColor && (
                        <span className="ml-3 flex items-center gap-2">
                          • Color: <b>{it.selectedColor}</b>
                          <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: it.selectedColorHex }} />
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => onChangeQty(it.id, Math.max(1, it.qty - 1))} className="px-2 py-1 border rounded">-</button>
                      <div className="px-3">{it.qty}</div>
                      <button onClick={() => onChangeQty(it.id, it.qty + 1)} className="px-2 py-1 border rounded">+</button>
                      <button onClick={() => onRemove(it.id)} className="ml-auto text-sm text-red-500">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="font-semibold">${subtotal.toFixed(2)}</div>
          </div>
          <button className="w-full py-2 bg-indigo-600 text-white rounded-md">Checkout</button>
        </div>
      </aside>
    </div>
  );
}
