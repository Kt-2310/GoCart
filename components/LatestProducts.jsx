"use client";
import { useEffect, useState } from "react";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 px-10 py-10">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition"
        >
          <img
            src={p.images?.[0] || "https://via.placeholder.com/200"}
            alt={p.name}
            className="w-full h-40 object-contain mb-3"
          />

          <h3 className="font-semibold">{p.name}</h3>

          <p className="text-green-600 font-bold">₹{p.price}</p>

          <p className="text-gray-400 line-through text-sm">
            ₹{p.mrp}
          </p>
        </div>
      ))}
    </div>
  );
}