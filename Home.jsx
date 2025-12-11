// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import productsSeed from "../data/products";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SidebarFilters from "../components/SidebarFilters";
import CartDrawer from "../components/CartDrawer";
import ProductModal from "../components/ProductModal";
import TopBanners from "../components/TopBanners";
import img from "../assets/vibebastra.png";
import { addToCart as addToCartUtil, removeFromCart as removeFromCartUtil, changeQty as changeQtyUtil } from "../utils/cart";
const PRODUCTS_KEY = "vibevastra_products";

// load or initialize products in localStorage
function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading products from localStorage", e);
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsSeed));
  return productsSeed;
}

export default function Home() {
  // products state (persisted)
  const [products, setProducts] = useState(() => loadProducts());

  // cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // filters / UI
  const [activeCategory, setActiveCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // modal state: this must hold the selected product object
  const [modalProduct, setModalProduct] = useState(null);

  // keep products in sync across tabs (Admin updates)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === PRODUCTS_KEY) {
        try {
          const v = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]");
          setProducts(v);
        } catch (err) {
          console.warn("invalid products JSON in localStorage", err);
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // helper to update and persist products (used by admin via localStorage too)
  function persistProducts(next) {
    setProducts(next);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
    // dispatch storage-like event so other listeners update
    window.dispatchEvent(new StorageEvent("storage", { key: PRODUCTS_KEY, newValue: JSON.stringify(next) }));
  }

  // cart helpers (use variant-aware utils)
  function handleAddToCart(item) {
    setCartItems(prev => addToCartUtil(prev, item));
    setCartOpen(true);
  }
  function handleRemoveFromCart(id) {
    setCartItems(prev => removeFromCartUtil(prev, id));
  }
  function handleChangeQty(id, qty) {
    setCartItems(prev => changeQtyUtil(prev, id, qty));
  }

  // categories derived
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  const [sortOption, setSortOption] = useState("popular");

  // filtered list
  const filtered = products.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (p.price < priceRange.min || p.price > priceRange.max) return false;
    if (searchTerm && !`${p.title} ${p.description} ${p.category}`.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0; // "popular" or default (insertion order)
  });

  // OPEN modal: sets the modalProduct to the full product object

  // OPEN modal: sets the modalProduct to the full product object
  function openProductModal(productOrId) {
    // Accept either a product object or an id
    if (!productOrId) {
      console.warn("openProductModal called with falsy:", productOrId);
      return;
    }
    let productObj = null;
    if (typeof productOrId === 'number' || typeof productOrId === 'string') {
      productObj = products.find(p => String(p.id) === String(productOrId));
    } else if (productOrId && productOrId.id != null) {
      // try to find a fresh object from products state by id
      productObj = products.find(p => p.id === productOrId.id) || productOrId;
    } else {
      productObj = productOrId;
    }

    if (!productObj) {
      console.warn("Product not found in current products list. Falling back to argument:", productOrId);
      productObj = productOrId;
    }
    setModalProduct(productObj);
  }


  // CLOSE modal: set null
  function closeProductModal() {
    setModalProduct(null);
  }

  return (
    <div className="min-h-screen bg-white w-auto" style={{ backgroundImage: `url(${img})` }}>
      {/*<img src={img} alt="img" />style={{ backgroundImage: `url(${img})` }}*/}

      <Header
        onToggleCart={() => setCartOpen(true)}
        cartCount={cartItems.reduce((s, i) => s + i.qty, 0)}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        onOpenMenu={() => setMobileMenuOpen(v => !v)}
      />
      <TopBanners />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
          <SidebarFilters
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />

          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold" style={{ color: "white" }}>Products</h2>
                <p className="text-sm text-gray-500" style={{ color: "white" }}>Showing {filtered.length} results</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  className="border rounded-md px-3 py-2"
                  style={{ color: "white" }}
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="popular" style={{ color: "black" }}>Sort: Popular</option>
                  <option value="price-asc" style={{ color: "black" }}>Price: Low to High</option>
                  <option value="price-desc" style={{ color: "black" }}>Price: High to Low</option>
                </select>
                <button onClick={() => { setActiveCategory(null); setSearchTerm(""); setPriceRange({ min: 0, max: 1000 }); setSortOption("popular"); }} className="px-3 py-2 rounded-md border" style={{ color: "white" }}>Reset</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={(p, colorVariant, sizeVariant) => {
                    // quick add: adds default variant or selected color
                    handleAddToCart({
                      id: p.id,
                      title: p.title,
                      price: p.price,
                      image: colorVariant ? colorVariant.image : p.image,
                      qty: 1,
                      selectedSize: sizeVariant || null,
                      selectedColor: colorVariant ? colorVariant.name : null,
                      selectedColorHex: colorVariant ? colorVariant.hex : null
                    });
                  }}
                  onOpen={(p) => openProductModal(p)}
                />
              ))}
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden mt-6 p-4 rounded shadow">
                <h4 className="font-semibold mb-2 text-white">Categories</h4>
                <div className="flex gap-2 flex-wrap bg-white">
                  <button onClick={() => setActiveCategory(null)} className={`px-3 py-1 rounded bg-white${activeCategory === null ? "bg-indigo-600 text-white" : "border text-white"}`}>All</button>
                  {categories.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1 rounded ${activeCategory === c ? "bg-indigo-600 text-white" : "border text-white"}`}>{c}</button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} VibeVastra. Built with ❤️
        </div>
      </footer>

      {/* Cart and Modal: pass correct props */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={(id) => handleRemoveFromCart(id)}
        onChangeQty={(id, qty) => handleChangeQty(id, qty)}
      />

      <ProductModal
        product={modalProduct}      // <-- this must be the full product object
        onClose={closeProductModal}
        onAdd={(item) => handleAddToCart(item)} // item from modal includes variant metadata
      />
    </div >
  );
}
