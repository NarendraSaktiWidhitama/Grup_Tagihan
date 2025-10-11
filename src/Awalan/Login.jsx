import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/users", {
        params: { username: form.username, password: form.password }
      });

      if (res.data.length > 0) {
        await Swal.fire({ icon: "success", title: "Berhasil login", showConfirmButton: false, timer: 1200 });
        navigate("/dashboard");
      } else {
        Swal.fire({ icon: "error", title: "Gagal", text: "Username / password salah" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Terjadi kesalahan server" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-emerald-200 to-emerald-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border rounded-lg px-4 py-2" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="border rounded-lg px-4 py-2" required />
          <button type="submit" className="bg-emerald-400 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold">Login</button>
          <p className="text-center text-sm">Belum punya akun? <span className="text-emerald-400 cursor-pointer" onClick={() => navigate("/register")}>Register</span></p>
        </form>
      </div>
    </div>
  );
}

export default Login;