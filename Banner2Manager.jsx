// src/components/Banner2Manager.jsx
import React, { useEffect, useState } from "react";

const BANNERS_KEY = "vibevastra_banners";

// DEFAULT BANNER 2 DATA
export const defaultBanner2 = {
  type: "carousel",
  slides: [
    {
      id: 1,
      title: "Floral Summer Dress",
      desc: "Lightweight cotton, perfect for sunny days.",
      img: "https://picsum.photos/800/600?slide1",
    },
    {
      id: 2,
      title: "Elegant Evening Gown",
      desc: "Floor-length satin finish — perfect for events.",
      img: "https://picsum.photos/800/600?slide2",
    },
  ],
  autoplay: true,
  interval: 4500,
};

// Read banner data (fallback to default)
function loadBanner2() {
  try {
    const raw = localStorage.getItem(BANNERS_KEY);
    if (!raw) {
      const seeded = { banner2: defaultBanner2 };
      localStorage.setItem(BANNERS_KEY, JSON.stringify(seeded));
      return seeded.banner2;
    }
    const parsed = JSON.parse(raw);
    return parsed.banner2 || defaultBanner2;
  } catch (e) {
    console.warn("Failed reading banners:", e);
    return defaultBanner2;
  }
}

export default function Banner2Manager() {
  const [banner2, setBanner2] = useState(() => loadBanner2());

  const [slideForm, setSlideForm] = useState({ title: "", desc: "", img: "" });
  const [editingId, setEditingId] = useState(null);

  // Sync with other tabs
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === BANNERS_KEY) {
        try {
          const parsed = JSON.parse(localStorage.getItem(BANNERS_KEY) || "{}");
          if (parsed.banner2) setBanner2(parsed.banner2);
        } catch {}
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function persist(updatedBanner2) {
    const wrapper = { banner2: updatedBanner2 };
    setBanner2(updatedBanner2);
    localStorage.setItem(BANNERS_KEY, JSON.stringify(wrapper));

    // Notify Home/TopBanners
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: BANNERS_KEY,
        newValue: JSON.stringify(wrapper),
      })
    );
  }

  /* ADD SLIDE */
  function addSlide() {
    if (!slideForm.title.trim()) {
      alert("Slide title required");
      return;
    }
    const nextId =
      banner2.slides.length > 0
        ? Math.max(...banner2.slides.map((s) => s.id)) + 1
        : 1;

    const newSlide = {
      id: nextId,
      title: slideForm.title.trim(),
      desc: slideForm.desc.trim(),
      img:
        slideForm.img.trim() ||
        "https://picsum.photos/800/600?rand=" + Date.now(),
    };

    persist({
      ...banner2,
      slides: [...banner2.slides, newSlide],
    });

    setSlideForm({ title: "", desc: "", img: "" });
  }

  /* START EDIT */
  function startEdit(slide) {
    setEditingId(slide.id);
    setSlideForm({
      title: slide.title,
      desc: slide.desc,
      img: slide.img,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* SAVE EDIT */
  function saveEdit() {
    const slides = banner2.slides.map((s) =>
      s.id === editingId
        ? {
            ...s,
            title: slideForm.title.trim(),
            desc: slideForm.desc.trim(),
            img: slideForm.img.trim() || s.img,
          }
        : s
    );

    persist({ ...banner2, slides });
    setEditingId(null);
    setSlideForm({ title: "", desc: "", img: "" });
  }

  /* DELETE SLIDE */
  function deleteSlide(id) {
    if (!confirm("Delete this slide?")) return;

    const slides = banner2.slides.filter((s) => s.id !== id);
    persist({ ...banner2, slides });

    if (editingId === id) {
      setEditingId(null);
      setSlideForm({ title: "", desc: "", img: "" });
    }
  }

  /* UPDATE SETTINGS */
  function saveSettings(field, value) {
    persist({ ...banner2, [field]: value });
  }

  /* RESET */
  function resetBanner2() {
    persist(defaultBanner2);
    setSlideForm({ title: "", desc: "", img: "" });
    setEditingId(null);
  }

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-lg font-semibold mb-4">Banner 2 (Carousel) Manager</h2>

      {/* Slide form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          className="border rounded px-3 py-2 col-span-2"
          placeholder="Slide Title"
          value={slideForm.title}
          onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
        />
        <input
          className="border rounded px-3 py-2 col-span-2"
          placeholder="Image URL"
          value={slideForm.img}
          onChange={(e) => setSlideForm({ ...slideForm, img: e.target.value })}
        />
        <input
          className="border rounded px-3 py-2 col-span-4"
          placeholder="Short Description"
          value={slideForm.desc}
          onChange={(e) => setSlideForm({ ...slideForm, desc: e.target.value })}
        />

        <div className="flex gap-2">
          {editingId ? (
            <>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Edit
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setSlideForm({ title: "", desc: "", img: "" });
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addSlide}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add Slide
            </button>
          )}
        </div>
      </div>

      {/* Slides list */}
      <div className="bg-gray-50 p-2 rounded mb-4 overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Image</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banner2.slides.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2">{s.title}</td>
                <td className="px-3 py-2">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-24 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(s)}
                      className="px-3 py-1 border rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSlide(s.id)}
                      className="px-3 py-1 border rounded text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {banner2.slides.length === 0 && (
              <tr>
                <td className="px-3 py-3" colSpan={4}>
                  No slides yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={banner2.autoplay}
            onChange={(e) => saveSettings("autoplay", e.target.checked)}
          />
          <span>Autoplay</span>
        </label>

        <div className="flex gap-3 items-center">
          <span>Interval (ms)</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-32"
            value={banner2.interval}
            onChange={(e) =>
              saveSettings("interval", Number(e.target.value))
            }
          />
        </div>

        <button
          onClick={resetBanner2}
          className="px-4 py-2 border rounded"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
