import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/users", form);

      alert("Account Created Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-6 max-w-md mx-auto">
      <h1 className="text-5xl text-yellow-500 font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border text-white p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border text-white p-2 w-full mt-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border text-white p-2 w-full mt-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 text-white p-2 w-full mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
