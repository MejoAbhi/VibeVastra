import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsSeed from "../data/products";
import Banner2Manager from "../components/Banner2Manager";

const SESSION_KEY = "adminSession";
const PRODUCTS_KEY = "vibevastra_products";

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}
function requireAuth(navigate) {
  const s = getSession();
  if (!s) navigate("/admin");
}

function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsSeed));
  return productsSeed;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => { requireAuth(navigate); }, [navigate]);

  const [products, setProducts] = useState(() => loadProducts());
  const [editing, setEditing] = useState(null); // product object when editing
  const [form, setForm] = useState({ title: "", price: 0, category: "", image: "", description: "" });

  useEffect(() => {
    // keep in sync with localStorage changes (other tabs)
    function handler(e) {
      if (e.key === PRODUCTS_KEY) {
        try {
          setProducts(JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]"));
        } catch {}
      }
    }
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  function persist(next) {
    setProducts(next);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
    // trigger storage event
    window.dispatchEvent(new StorageEvent("storage", { key: PRODUCTS_KEY, newValue: JSON.stringify(next) }));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    navigate("/admin");
  }

  function startAdd() {
    setEditing(null);
    setForm({ title: "", price: 0, category: "", image: "", description: "" });
  }

  function startEdit(p) {
    setEditing(p.id);
    setForm({ title: p.title, price: p.price, category: p.category, image: p.image, description: p.description });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function save() {
    if (!form.title.trim()) return alert("Title required");
    if (editing == null) {
      // add new
      const id = Math.max(0, ...products.map(p => p.id)) + 1;
      const next = [{ id, ...form }, ...products];
      persist(next);
      startAdd();
    } else {
      // update
      const next = products.map(p => p.id === editing ? { ...p, ...form } : p);
      persist(next);
      setEditing(null);
    }
  }

  function remove(id) {
    if (!confirm("Delete this product?")) return;
    const next = products.filter(p => p.id !== id);
    persist(next);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <button onClick={logout} className="px-3 py-2 bg-red-500 text-white rounded">Logout</button>
            <a href="/" target="_blank" rel="noreferrer" className="px-3 py-2 border rounded">Open Store</a>
          </div>
        </div>
        <Banner2Manager/>
        {/* Add / Edit form */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="font-semibold mb-3">{editing == null ? "Add product" : `Edit product #${editing}`}</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border rounded px-3 py-2 col-span-2" />
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price" className="border rounded px-3 py-2" />
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="border rounded px-3 py-2" />
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="border rounded px-3 py-2 col-span-2" />
            <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border rounded px-3 py-2 col-span-2" />
            <div className="flex items-center gap-2">
              <button onClick={save} className="px-3 py-2 bg-indigo-600 text-white rounded">{editing == null ? "Add" : "Save"}</button>
              <button onClick={startAdd} className="px-3 py-2 border rounded">Reset</button>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3">${Number(p.price).toFixed(2)}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">
                    {p.image && <img src={p.image} alt={p.title} className="w-20 h-12 object-cover rounded" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(p)} className="px-2 py-1 border rounded text-sm">Edit</button>
                      <button onClick={() => remove(p.id)} className="px-2 py-1 border rounded text-sm text-red-500">Delete</button>
                      <button onClick={() => {
                        // quick toggle price or something to show realtime update demo
                        const next = products.map(x => x.id === p.id ? { ...x, price: Number(x.price) + 1 } : x);
                        persist(next);
                      }} className="px-2 py-1 border rounded text-sm">+ $1</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
