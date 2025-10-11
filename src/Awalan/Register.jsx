import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      Swal.fire({ icon: "error", title: "Password tidak cocok" });
      return;
    }
    try {
      const check = await axios.get("http://localhost:5000/users", { params: { username: form.username } });
      if (check.data.length > 0) {
        Swal.fire({ icon: "error", title: "Username sudah dipakai" });
        return;
      }
      await axios.post("http://localhost:5000/users", { username: form.username, password: form.password });
      Swal.fire({ icon: "success", title: "Berhasil daftar", timer: 1200, showConfirmButton: false });
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Gagal mendaftar" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-emerald-200 to-emerald-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border rounded-lg px-4 py-2" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border rounded-lg px-4 py-2" required />
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Konfirmasi Password" className="border rounded-lg px-4 py-2" required />
          <button type="submit" className="bg-emerald-400 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold">Register</button>
          <p className="text-center text-sm">Sudah punya akun? <span className="text-emerald-500 cursor-pointer" onClick={() => navigate("/")}>Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default Register;