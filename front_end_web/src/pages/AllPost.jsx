import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 async function fetchPosts(controller = null) {
  try {
    setLoading(true);
    setError(null);
    const options = controller ? { signal: controller.signal } : {};
    const res = await api.get("/posts", options);
    setPosts(res.data);
  } catch (err) {
    if (err.name === "CanceledError" || err.message === "canceled") return;
    console.error(err);
    setError(err.response?.data?.message || err.message || "Error");
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller);
    return () => {
      controller.abort();
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Do you have Delete this Post ?")) return;
    try {
      await api.delete(`/posts/${id}`);
      await fetchPosts();
    } catch (err) {
      alert(
        "حدث خطأ أثناء الحذف: " + (err.response?.data?.message || err.message)
      );
    }
  }

  async function handleEdit(id, updatedData) {
    try {
      await api.put(`/posts/${id}`, updatedData);
      await fetchPosts();
      alert("تم التعديل بنجاح ✅");
    } catch (err) {
      alert(
        "خطأ أثناء التعديل: " + (err.response?.data?.message || err.message)
      );
    }
  }

  return (
    <div>
      <h2 className="pt-20 text-xl font-bold mb-4">All User </h2>
      {loading && <div>Loading ... </div>}
      {error && <div className="text-red-600 mb-3">{error}</div>}

      {!loading && !error && (
        <div className="flex flex-col gap-4 ">
          {posts.map((u) => (
            <PostCard
              key={u.id || u._id}
              post={u}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
