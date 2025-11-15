import { useEffect,useState } from "react";

export default function UserCard({ user, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });


  function handleEdit(e) {
    e.preventDefault();
    onEdit(user._id, form);
    setShowModal(false);
  }

  return (
    <div
      className="flex flex-col gap-3 p-4 border rounded-2xl shadow-sm bg-gray-900 hover:shadow-md 
    transition relative"
    >
      <h3 className="text-lg font-semibold text-amber-300">{user.name}</h3>
      <p className="text-amber-100 text-sm">{user.email}</p>
     {/*  <div className="flex gap-2 mt-2">
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 border border-blue-600 px-2 py-1 rounded
           hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className="text-red-600 border border-red-600 px-2 py-1 rounded
           hover:bg-red-50"
        >
          Delete
        </button>
      </div> */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-amber-100 p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg text-black font-bold mb-4"> Edit User</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-black text-sm mb-1">Name</label>
                <input
                  className="w-full border rounded p-2"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black  text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded p-2"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black  text-sm mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border rounded p-2"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 border text-black  rounded"
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-green-600  text-black  rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
