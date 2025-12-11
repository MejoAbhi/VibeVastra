// src/data/products.js
const products = [
  {
    id: 1,
    title: "Classic White Tee",
    price: 19.99,
    category: "T-Shirts",
    description: "Soft white tee",
    image: "https://picsum.photos/400/300?1",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#ffffff", image: "https://picsum.photos/400/300?1" },
      { name: "Heather Gray", hex: "#9ca3af", image: "https://picsum.photos/400/300?5" },
      { name: "Charcoal", hex: "#374151", image: "https://picsum.photos/400/300?6" }
    ]
  },
  {
    id: 2,
    title: "Denim Jacket",
    price: 69.99,
    category: "Jackets",
    description: "Premium denim jacket.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", hex: "#26418f", image: "https://picsum.photos/400/300?2" },
      { name: "Black", hex: "#111", image: "https://picsum.photos/400/300?3" },
      { name: "Light Blue", hex: "#93c5fd", image: "https://picsum.photos/400/300?4" }
    ],
    image: "https://picsum.photos/400/300?2"
  }
];

export default products;
