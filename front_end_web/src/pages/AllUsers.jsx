import UserCard from "../components/UserCard";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 async function fetchUsers(controller = null) {
  try {
    setLoading(true);
    setError(null);
    const options = controller ? { signal: controller.signal } : {};
    const res = await api.get("/users", options);
    setUsers(res.data);
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
    fetchUsers(controller);
    return () => {
      controller.abort();
    };
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Do you have Delete this User ?")) return;
    try {
      await api.delete(`/users/${id}`);
      await fetchUsers();
    } catch (err) {
      alert(
        "حدث خطأ أثناء الحذف: " + (err.response?.data?.message || err.message)
      );
    }
  }

  async function handleEdit(id, updatedData) {
    try {
      await api.put(`/users/${id}`, updatedData);
      await fetchUsers();
      alert("تم التعديل بنجاح ✅");
    } catch (err) {
      alert(
        "خطأ أثناء التعديل: " + (err.response?.data?.message || err.message)
      );
    }
  }

  return (
    <div className="pt-20 ">
      <h2 className="text-xl font-bold mb-4">All User </h2>
      {loading && <div>Loading ... </div>}
      {error && <div className="text-red-600 mb-3">{error}</div>}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2">
          {users.map((u) => (
            <UserCard
              key={u.id || u._id}
              user={u}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
