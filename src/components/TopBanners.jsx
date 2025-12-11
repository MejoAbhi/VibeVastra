// import React, { useEffect, useRef, useState } from "react";

// /**
//  * TopBanners.jsx
//  * - Video banner on left (autoplay, muted, loop)
//  * - Dress carousel on right (autoplay, prev/next, indicators)
//  *
//  * Usage: import TopBanners from './components/TopBanners' and include <TopBanners />
//  */

// const dresses = [
//   {
//     id: 1,
//     title: "Floral Summer Dress",
//     desc: "Lightweight cotton, perfect for sunny days.",
//     img: "https://images.unsplash.com/photo-1520975698512-9c9b2b8f4b82?auto=format&fit=crop&w=1200&q=60",
//   },
//   {
//     id: 2,
//     title: "Elegant Evening Gown",
//     desc: "Floor-length, satin finish — great for events.",
//     img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=60",
//   },
//   {
//     id: 3,
//     title: "Casual Shirt Dress",
//     desc: "Relaxed fit, easy to style with sneakers.",
//     img: "https://images.unsplash.com/photo-1602810317197-4f63e15a3b36?auto=format&fit=crop&w=1200&q=60",
//   },
// ];

// function VideoBanner({ videoSrc, poster }) {
//   return (
//     <div className="w-full h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden shadow-md bg-black">
//       <video
//         className="w-full h-full object-cover"
//         src={videoSrc}
//         poster={poster}
//         autoPlay
//         muted
//         loop
//         playsInline
//         controls={false}
//       />
//       {/* Optional overlay content */}
//       <div className="absolute inset-0 pointer-events-none"></div>
//     </div>
//   );
// }

// function DressCarousel({ items, autoplay = true, interval = 4000 }) {
//   const [index, setIndex] = useState(0);
//   const length = items.length;
//   const timerRef = useRef(null);

//   useEffect(() => {
//     if (!autoplay) return;
//     timerRef.current = setInterval(() => {
//       setIndex((i) => (i + 1) % length);
//     }, interval);
//     return () => clearInterval(timerRef.current);
//   }, [autoplay, interval, length]);

//   function prev() {
//     clearInterval(timerRef.current);
//     setIndex((i) => (i - 1 + length) % length);
//   }
//   function next() {
//     clearInterval(timerRef.current);
//     setIndex((i) => (i + 1) % length);
//   }
//   function goTo(i) {
//     clearInterval(timerRef.current);
//     setIndex(i);
//   }

//   return (
//     <div className="w-full h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden shadow-md relative bg-white">
//       {/* Slide */}
//       <div className="w-full h-full flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
//         {items.map((it) => (
//           <div key={it.id} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2">
//             <div className="hidden md:block">
//               <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
//             </div>

//             <div className="p-4 flex items-center">
//               <div>
//                 {/* For small screens show image on top */}
//                 <div className="md:hidden mb-3">
//                   <img src={it.img} alt={it.title} className="w-full h-36 object-cover rounded" />
//                 </div>

//                 <h3 className="text-lg font-semibold">{it.title}</h3>
//                 <p className="text-sm text-gray-600 mt-2">{it.desc}</p>
//                 <div className="mt-4 flex items-center gap-3">
//                   <button className="px-3 py-1 bg-indigo-600 text-white rounded">Shop</button>
//                   <button className="px-3 py-1 border rounded">Details</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Controls */}
//       <button
//         aria-label="previous"
//         onClick={prev}
//         className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow hidden sm:flex"
//       >
//         ‹
//       </button>
//       <button
//         aria-label="next"
//         onClick={next}
//         className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow hidden sm:flex"
//       >
//         ›
//       </button>

//       {/* Indicators */}
//       <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
//         {items.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => goTo(i)}
//             className={`w-2 h-2 rounded-full ${i === index ? "bg-indigo-600" : "bg-white/80"}`}
//             aria-label={`Go to slide ${i + 1}`}
//             title={`Slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function TopBanners() {
//   const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4"; // sample mp4; replace with your asset
//   const poster = "https://images.unsplash.com/photo-1518546305923-8f4f9b3f6f6c?auto=format&fit=crop&w=1200&q=60";

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
//         {/* Left: Video */}
//         {/* <div className="relative">
//           <VideoBanner videoSrc={videoSrc} poster={poster} /> */}
//           {/* optional overlay text */}
//           {/* <div className="absolute left-4 top-4 bg-black/40 text-white px-3 py-1 rounded">
//             <div className="text-sm font-semibold">New Collection</div>
//             <div className="text-xs">Summer 2025</div>
//           </div>
//         </div> */}

//         {/* Right: Dress carousel */}
//         <div>
//           <DressCarousel items={dresses} autoplay interval={4500} />
//         </div>
//       </div>
//     // </div>
//   );
// }
//-------------------------------------------------------------------------->>>>
// src/components/TopBanners.jsx
import React, { useEffect, useRef, useState } from "react";

const BANNERS_KEY = "vibevastra_banners";

const defaultBanner2 = {
  type: "carousel",
  slides: [
    { id: 1, title: "Floral Summer Dress", desc: "Lightweight cotton, perfect for sunny days.", img: "https://picsum.photos/1200/600?1" },
    { id: 2, title: "Elegant Evening Gown", desc: "Floor-length satin finish.", img: "https://picsum.photos/1200/600?2" }
  ],
  autoplay: true,
  interval: 4500
};

function readBanner2() {
  try {
    const raw = localStorage.getItem(BANNERS_KEY);
    if (!raw) return defaultBanner2;
    const parsed = JSON.parse(raw);
    return (parsed && parsed.banner2) ? parsed.banner2 : defaultBanner2;
  } catch (e) {
    console.warn("Failed to read banners from localStorage:", e);
    return defaultBanner2;
  }
}

export default function TopBanners() {
  const [banner2, setBanner2] = useState(() => readBanner2());
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Listen for admin updates in other tabs / same tab storage events
  useEffect(() => {
    function onStorage(e) {
      if (e.key === BANNERS_KEY) {
        setBanner2(readBanner2());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Reset index if slides change
  useEffect(() => {
    if (!banner2 || !Array.isArray(banner2.slides) || banner2.slides.length === 0) {
      setIndex(0);
      return;
    }
    if (index >= banner2.slides.length) setIndex(0);
  }, [banner2, index]);

  // Autoplay
  useEffect(() => {
    clearInterval(timerRef.current);
    if (banner2 && banner2.autoplay && Array.isArray(banner2.slides) && banner2.slides.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex(i => {
          const next = (i + 1) % (banner2.slides.length || 1);
          return next;
        });
      }, Math.max(800, banner2.interval || 4500));
    }
    return () => clearInterval(timerRef.current);
  }, [banner2]);

  const slides = (banner2 && banner2.slides) || [];

  if (!slides.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="w-full h-56 rounded-lg overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">No banner slides configured.</div>
        </div>
      </div>
    );
  }

  function prev() {
    clearInterval(timerRef.current);
    setIndex(i => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    clearInterval(timerRef.current);
    setIndex(i => (i + 1) % slides.length);
  }
  function goTo(i) {
    clearInterval(timerRef.current);
    setIndex(i);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative rounded-lg overflow-hidden shadow-md">
        {/* Slides container */}
        <div className="w-full h-56 md:h-64 lg:h-80 relative">
          {slides.map((s, i) => (
            <div
              key={s.id || i}
              className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              aria-hidden={i !== index}
            >
              <img src={s.img} alt={s.title || `slide-${i+1}`} className="w-full h-full object-cover" />
              {/* overlay text */}
              {(s.title || s.desc) && (
                <div className="absolute left-6 bottom-6 bg-black/40 text-white px-4 py-2 rounded">
                  {s.title && <div className="text-lg font-semibold">{s.title}</div>}
                  {s.desc && <div className="text-sm mt-1">{s.desc}</div>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <button aria-label="previous" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden sm:flex">‹</button>
        <button aria-label="next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden sm:flex">›</button>

        {/* Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full ${i === index ? "bg-indigo-600" : "bg-white/80"}`} aria-label={`Go to slide ${i+1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
