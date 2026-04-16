"use client";
import { useEffect, useState } from "react";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  // ✅ reusable fetch
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    // update UI instantly
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ CREATE (example)
const handleAddDummy = async () => {
  if (products.some(p => p.name === "New Product")) {
    alert("Already added!");
    return;
  }
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Product",
        description: "This is a dummy product",
        mrp: 1299,
        price: 999,
        images: ["https://picsum.photos/200"],
        category: "Test",
        inStock: true,
        storeId: "69e0f688e2712c23bedf61ff",
      }),
    });

    const data = await res.json(); // 👈 IMPORTANT
    console.log("API RESPONSE:", data);

    if (!res.ok) throw new Error(data.error);

    setProducts((prev) => [data, ...prev]);

  } catch (err) {
    console.error("ADD ERROR:", err);
  }
};

  // ✅ UPDATE (example)
  const handleUpdate = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Updated Product",
      }),
    });

    const updated = await res.json();

    // update UI instantly
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  return (
    <div className="px-10 py-10">
      
     <button
  onClick={handleAddDummy}
  className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center justify-center text-2xl"
>
  +
</button>

      <div className="grid grid-cols-4 gap-6">
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

            {/* 🔴 DELETE */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
  
  {/* ✏️ UPDATE */}
  <button
    onClick={() => handleUpdate(p.id)}
    className="bg-white p-2 rounded-full shadow hover:bg-yellow-100"
  >
    ✏️
  </button>

  {/* 🗑 DELETE */}
  <button
    onClick={() => handleDelete(p.id)}
    className="bg-white p-2 rounded-full shadow hover:bg-red-100"
  >
    🗑
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}