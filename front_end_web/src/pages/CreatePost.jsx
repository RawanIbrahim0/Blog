import { useState } from "react";
import api from "../services/api";

export default function CreatePost() {
  const [form, setForm] = useState({ content: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    try {
      const res = await api.post(`/posts/${userId}`, form);
      alert("Post Created Successfully ");
      console.log("Created Post:", res.data);

      setForm({ content: "" });
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create post : " +
        (err.response?.data?.message || err.message)
      );
    }
  }

  return (
    <div className="pt-30 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-white font-medium mb-1">Content</label>
          <input
            className="w-full text-white border rounded p-2"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
