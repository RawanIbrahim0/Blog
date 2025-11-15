import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", form);

      // حفظ بيانات اليوزر بالـ localStorage
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);

      alert("Login Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-6 max-w-md mx-auto">
      <h1 className="text-5xl text-yellow-500 font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border text-white p-2 w-full"
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

        <button className="bg-blue-600 text-white p-2 w-full mt-4">
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-400 text-center">
        Dont have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
}
