// // src/components/ProductModal.jsx
// import React, { useEffect, useState } from "react";
// import productsSeed from "../data/products"; // fallback seed

// const PRODUCTS_KEY = "vibevastra_products";

// /**
//  * ProductModal
//  * - Accepts `product` which can be:
//  *    - a full product object { id, title, ... }
//  *    - or a product id (number or string)
//  * - Looks up the freshest product data from localStorage(PRODUCTS_KEY) first,
//  *   falls back to productsSeed if not present.
//  *
//  * Props:
//  *  - product: object | id | null
//  *  - onClose(): close modal
//  *  - onAdd(item): add to cart (item includes selectedSize/Color metadata)
//  */
// export default function ProductModal({ product, onClose, onAdd }) {
//   // full product object resolved from product prop (or null)
//   const [fullProduct, setFullProduct] = useState(null);

//   // UI state (variant selections and preview image)
//   const [selectedColorIndex, setSelectedColorIndex] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [displayImage, setDisplayImage] = useState(null);

//   // helper: read products from localStorage (safe)
//   function readProductsFromStorage() {
//     try {
//       const raw = localStorage.getItem(PRODUCTS_KEY);
//       if (raw) {
//         const parsed = JSON.parse(raw);
//         if (Array.isArray(parsed)) return parsed;
//       }
//     } catch (e) {
//       // ignore parse errors
//       // console.warn("Failed to read products from localStorage", e);
//     }
//     return productsSeed || [];
//   }

//   // Resolve the full product object from the incoming prop
//   function resolveFullProduct(productOrId) {
//     if (!productOrId && productOrId !== 0) return null;

//     // if incoming is already a full product with expected fields, try to find freshest by id
//     let id = null;
//     if (typeof productOrId === "number" || typeof productOrId === "string") {
//       id = String(productOrId);
//     } else if (productOrId && productOrId.id != null) {
//       id = String(productOrId.id);
//     }

//     // read freshest products list
//     const list = readProductsFromStorage();

//     if (id != null) {
//       const found = list.find((p) => String(p.id) === String(id));
//       if (found) return found;
//       // fallback: maybe the passed object has the details
//       if (typeof productOrId === "object" && productOrId !== null) return productOrId;
//       return null;
//     }

//     // no id — if the prop is a full object, return it
//     if (typeof productOrId === "object") return productOrId;

//     return null;
//   }

//   // whenever the incoming product prop changes, resolve a full product and initialize state
//   useEffect(() => {
//     const resolved = resolveFullProduct(product);
//     setFullProduct(resolved);

//     if (resolved) {
//       const hasColors = Array.isArray(resolved.colors) && resolved.colors.length > 0;
//       const hasSizes = Array.isArray(resolved.sizes) && resolved.sizes.length > 0;

//       setSelectedColorIndex(hasColors ? 0 : null);
//       setSelectedSize(hasSizes ? resolved.sizes[0] : null);
//       setDisplayImage((hasColors && resolved.colors && resolved.colors[0]) ? resolved.colors[0].image : (resolved.image || null));
//     } else {
//       // clear UI state if resolved product is null
//       setSelectedColorIndex(null);
//       setSelectedSize(null);
//       setDisplayImage(null);
//     }
//     // only depend on product prop
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [product]);

//   // when the selected color index or product changes, update display image
//   useEffect(() => {
//     if (!fullProduct) {
//       setDisplayImage(null);
//       return;
//     }

//     if (selectedColorIndex != null && Array.isArray(fullProduct.colors) && fullProduct.colors[selectedColorIndex]) {
//       setDisplayImage(fullProduct.colors[selectedColorIndex].image || fullProduct.image || null);
//     } else {
//       setDisplayImage(fullProduct.image || null);
//     }
//   }, [selectedColorIndex, fullProduct]);

//   // Listen for other tabs or admin edits to products in localStorage and refresh the fullProduct
//   useEffect(() => {
//     function onStorage(e) {
//       if (e.key === PRODUCTS_KEY) {
//         const updated = resolveFullProduct(product);
//         setFullProduct(updated);
//       }
//     }
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [product]);

//   // If no resolved product, render nothing (or a small placeholder)
//   if (!fullProduct) return null;

//   const hasColors = Array.isArray(fullProduct.colors) && fullProduct.colors.length > 0;
//   const hasSizes = Array.isArray(fullProduct.sizes) && fullProduct.sizes.length > 0;

//   function handleAddToCart() {
//     const item = {
//       id: fullProduct.id,
//       title: fullProduct.title,
//       price: fullProduct.price,
//       image: displayImage || fullProduct.image || "",
//       qty: 1,
//       selectedSize: selectedSize || null,
//       selectedColor: selectedColorIndex != null ? (fullProduct.colors[selectedColorIndex]?.name || null) : null,
//       selectedColorHex: selectedColorIndex != null ? (fullProduct.colors[selectedColorIndex]?.hex || null) : null,
//     };
//     onAdd(item);
//     onClose();
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

//       <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full z-10 overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left: preview image */}
//           <div className="p-4 flex items-center justify-center bg-gray-50">
//             {displayImage ? (
//               <img src={displayImage} alt={fullProduct.title} className="w-full max-h-96 object-cover rounded" />
//             ) : (
//               <div className="w-full h-64 flex items-center justify-center text-gray-400">No image</div>
//             )}
//           </div>

//           {/* Right: details and variant selectors */}
//           <div className="p-6 flex flex-col gap-4">
//             <div className="flex justify-between items-start">
//               <h3 className="text-2xl font-semibold">{fullProduct.title}</h3>
//               <div className="text-xl text-gray-700">${Number(fullProduct.price || 0).toFixed(2)}</div>
//             </div>

//             <p className="text-gray-600">{fullProduct.description}</p>

//             {/* Size selector */}
//             {hasSizes && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
//                 <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border rounded px-3 py-2">
//                   {fullProduct.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//               </div>
//             )}

//             {/* Color swatches */}
//             {hasColors && (
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-gray-700">Color</label>
//                   <div className="text-sm text-gray-500">{fullProduct.colors[selectedColorIndex]?.name}</div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   {fullProduct.colors.map((c, idx) => (
//                     <button
//                       key={c.name + "-" + idx}
//                       onClick={() => setSelectedColorIndex(idx)}
//                       title={c.name}
//                       className={`w-8 h-8 rounded-full border-2 ${idx === selectedColorIndex ? 'ring-2 ring-indigo-400' : ''}`}
//                       style={{ backgroundColor: c.hex }}
//                       aria-label={`Select color ${c.name}`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mt-auto flex gap-2">
//               <button onClick={handleAddToCart} className="py-2 px-4 bg-indigo-600 text-white rounded-md">Add to cart</button>
//               <button onClick={onClose} className="py-2 px-4 border rounded-md">Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//---------------------------------------------------->>>>>
// src/components/ProductModal.jsx
import React, { useEffect, useState } from "react";
import productsSeed from "../data/products";

const PRODUCTS_KEY = "vibevastra_products";

/**
 * ProductModal
 * - Accepts product (object or id). Resolves freshest product from localStorage if possible.
 * - Props:
 *    product: object | id | null
 *    onClose(): close modal
 *    onAdd(item): add item to cart (item contains variant metadata)
 *    onShopNow?.(item): optional callback invoked when "Shop Now" pressed (after adding to cart)
 *
 * WhatsApp:
 * - Edit WHATSAPP_NUMBER below to your number in international format without '+' (e.g. "919812345678")
 */
const WHATSAPP_NUMBER = "919999999999"; // <- CHANGE THIS to your number (no '+' sign)

function readProductsFromStorage() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return productsSeed || [];
}

function resolveFullProduct(productOrId) {
  if (!productOrId && productOrId !== 0) return null;

  let id = null;
  if (typeof productOrId === "number" || typeof productOrId === "string") {
    id = String(productOrId);
  } else if (productOrId && productOrId.id != null) {
    id = String(productOrId.id);
  }

  const list = readProductsFromStorage();

  if (id != null) {
    const found = list.find((p) => String(p.id) === String(id));
    if (found) return found;
    if (typeof productOrId === "object" && productOrId !== null) return productOrId;
    return null;
  }

  if (typeof productOrId === "object") return productOrId;
  return null;
}

function createWhatsAppUrl(number, text) {
  // number: international without '+' (e.g. 9198...), text will be encoded
  const base = `https://wa.me/${number}`;
  const q = `?text=${encodeURIComponent(text)}`;
  return base + q;
}

export default function ProductModal({ product, onClose, onAdd, onShopNow }) {
  const [fullProduct, setFullProduct] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    const resolved = resolveFullProduct(product);
    setFullProduct(resolved);

    if (resolved) {
      const hasColors = Array.isArray(resolved.colors) && resolved.colors.length > 0;
      const hasSizes = Array.isArray(resolved.sizes) && resolved.sizes.length > 0;

      setSelectedColorIndex(hasColors ? 0 : null);
      setSelectedSize(hasSizes ? resolved.sizes[0] : null);
      setDisplayImage((hasColors && resolved.colors && resolved.colors[0]) ? resolved.colors[0].image : (resolved.image || null));
    } else {
      setSelectedColorIndex(null);
      setSelectedSize(null);
      setDisplayImage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (!fullProduct) {
      setDisplayImage(null);
      return;
    }
    if (selectedColorIndex != null && Array.isArray(fullProduct.colors) && fullProduct.colors[selectedColorIndex]) {
      setDisplayImage(fullProduct.colors[selectedColorIndex].image || fullProduct.image || null);
    } else {
      setDisplayImage(fullProduct.image || null);
    }
  }, [selectedColorIndex, fullProduct]);

  // Update when storage changes (admin edits products)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === PRODUCTS_KEY) {
        const updated = resolveFullProduct(product);
        setFullProduct(updated);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [product]);

  if (!fullProduct) return null;

  const hasColors = Array.isArray(fullProduct.colors) && fullProduct.colors.length > 0;
  const hasSizes = Array.isArray(fullProduct.sizes) && fullProduct.sizes.length > 0;

  function buildCartItem() {
    return {
      id: fullProduct.id,
      title: fullProduct.title,
      price: fullProduct.price,
      image: displayImage || fullProduct.image || "",
      qty: 1,
      selectedSize: selectedSize || null,
      selectedColor: selectedColorIndex != null ? (fullProduct.colors[selectedColorIndex]?.name || null) : null,
      selectedColorHex: selectedColorIndex != null ? (fullProduct.colors[selectedColorIndex]?.hex || null) : null,
    };
  }

  function handleAdd() {
    const item = buildCartItem();
    if (typeof onAdd === "function") onAdd(item);
    onClose();
  }

  function handleShopNow() {
    const item = buildCartItem();
    if (typeof onAdd === "function") onAdd(item); // ensure added to cart
    if (typeof onShopNow === "function") {
      onShopNow(item);
    } else {
      // default behavior: close modal (cart UI may open via onAdd handler in parent)
      onClose();
    }
  }

  function handleWhatsApp() {
    // Build message with product, variant, and a short note
    const color = selectedColorIndex != null ? fullProduct.colors[selectedColorIndex]?.name : null;
    const size = selectedSize || null;
    const price = fullProduct.price != null ? `Price: ${fullProduct.price}` : "";
    const messageParts = [
      `Hi, I'm interested in this product:`,
      `${fullProduct.title}`,
      size ? `Size: ${size}` : null,
      color ? `Color: ${color}` : null,
      price,
      `Can you provide more details?`
    ].filter(Boolean);
    const message = messageParts.join(" | ");

    const waUrl = createWhatsAppUrl(919740435146, message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full z-10 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: image */}
          <div className="p-4 flex items-center justify-center bg-gray-50">
            {displayImage ? (
              <img src={displayImage} alt={fullProduct.title} className="w-full max-h-[520px] object-contain rounded" />
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>

          {/* Right: details */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{fullProduct.title}</h3>
                <div className="text-sm text-gray-500 mt-1">{fullProduct.category}</div>
              </div>
              <div className="text-2xl font-semibold text-gray-800">${Number(fullProduct.price || 0).toFixed(2)}</div>
            </div>

            <p className="text-gray-600">{fullProduct.description}</p>

            {/* Size */}
            {hasSizes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select
                  value={selectedSize || ""}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  {fullProduct.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}

            {/* Colors */}
            {hasColors && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <div className="text-sm text-gray-500">{fullProduct.colors[selectedColorIndex]?.name}</div>
                </div>

                <div className="flex items-center gap-3">
                  {fullProduct.colors.map((c, idx) => (
                    <button
                      key={`${c.name}-${idx}`}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={c.name}
                      className={`w-8 h-8 rounded-full border-2 ${idx === selectedColorIndex ? 'ring-2 ring-indigo-400' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={`Select color ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              {/* <button
                onClick={handleShopNow}
                className="w-full sm:w-auto flex-1 px-4 py-3 bg-indigo-600 text-white rounded-md text-center"
              >
                Shop Now
              </button> */}

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-4 py-3 bg-green-600 text-white rounded-md flex items-center justify-center gap-2"
              >
                <span style={{ fontSize: 18 }}>📱</span>
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => { onAdd(buildCartItem()); }}
                className="w-full sm:w-auto px-4 py-3 border rounded-md"
              >
                Add to Cart
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-3 border rounded-md"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
