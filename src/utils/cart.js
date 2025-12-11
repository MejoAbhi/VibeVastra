// src/utils/cart.js
// Variant-aware addToCart: combines items with same id + selectedSize + selectedColor

export function addToCart(prevItems, product) {
  // product should include selectedSize and selectedColor (or null)
  const matchIndex = prevItems.findIndex(p =>
    p.id === product.id &&
    (p.selectedSize || null) === (product.selectedSize || null) &&
    (p.selectedColor || null) === (product.selectedColor || null)
  );

  if (matchIndex >= 0) {
    // increment qty for matching variant
    return prevItems.map((p, i) => i === matchIndex ? { ...p, qty: p.qty + 1 } : p);
  }

  // new entry
  return [...prevItems, { ...product, qty: 1 }];
}

export function removeFromCart(prevItems, id) {
  // note: id alone may remove all variants with same id; if you pass unique composite key, change this logic.
  return prevItems.filter(p => p.id !== id);
}

export function changeQty(prevItems, id, qty) {
  // change qty for the first matching id (or change all matching variants if needed)
  return prevItems.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p);
}
