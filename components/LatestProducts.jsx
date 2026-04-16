"use client";
import { useEffect, useState } from "react";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null); // ✅ NEW

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    image: "",
  });

  // FETCH
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✏️ EDIT CLICK (NEW)
  const handleEditClick = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      mrp: product.mrp,
      image: product.images?.[0] || "",
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  // ADD + UPDATE (MERGED)
  const handleSubmit = async () => {
    try {
      const url = editingId
        ? `/api/products/${editingId}`
        : `/api/products`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          mrp: Number(form.mrp),
          price: Number(form.price),
          images: [form.image || "https://picsum.photos/200"],
          category: "Test",
          inStock: true,
          storeId: "69e0f688e2712c23bedf61ff",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      if (editingId) {
        // update UI
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? data : p))
        );
      } else {
        // add UI
        setProducts((prev) => [data, ...prev]);
      }

      // reset
      setForm({
        name: "",
        description: "",
        price: "",
        mrp: "",
        image: "",
      });

      setEditingId(null);
      setShowForm(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-10 py-10">

      {/* ➕ BUTTON */}
      <button
        onClick={() => {
          setEditingId(null); // ensure ADD mode
          setShowForm(true);
        }}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center justify-center text-2xl"
      >
        +
      </button>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="relative group bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition"
          >
            <img
              src={p.images?.[0] || "https://picsum.photos/200"}
              onError={(e) =>
                (e.target.src = "https://picsum.photos/200")
              }
              alt={p.name}
              className="w-full h-40 object-contain mb-3"
            />

            <h3 className="font-semibold">{p.name}</h3>

            <p className="text-green-600 font-bold">₹{p.price}</p>

            <p className="text-gray-400 line-through text-sm">
              ₹{p.mrp}
            </p>

            {/* ACTION BUTTONS */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => handleEditClick(p)}
                className="bg-white p-2 rounded-full shadow hover:bg-yellow-100"
              >
                ✏️
              </button>

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

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="Name"
              className="w-full border p-2 mb-3 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 mb-3 rounded"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <div className="flex gap-2">
              <input
                placeholder="Price"
                type="number"
                className="w-1/2 border p-2 mb-3 rounded"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              <input
                placeholder="MRP"
                type="number"
                className="w-1/2 border p-2 mb-3 rounded"
                value={form.mrp}
                onChange={(e) =>
                  setForm({ ...form, mrp: e.target.value })
                }
              />
            </div>

            <input
              placeholder="Image URL"
              className="w-full border p-2 mb-4 rounded"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}