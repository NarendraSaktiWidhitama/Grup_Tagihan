import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import background from "../assets/background.avif"
import axios from 'axios';
import Swal from 'sweetalert2';


function Register() {
    const [formData, setFormData] = useState({
            nama: "",
            email: "",
            jurusan: "",
        });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("", formData);

            console.log("Respon server:", response.data);
            Swal.fire({
                title: "Selamat yah!",
                icon: "berhasil",
                draggable: true
            });

            setFormData({
                nama: "",
                email: "",
                jurusan: "",
            });

            navigate("/");
        } catch (error) {
            console.error("Error saat menambahkan data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } finally {
            setLoading(false);
        }
    };

return (
  <div
    className="flex items-center justify-center h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${background})` }}
  >
    <div className="bg-white/20 shadow rounded-lg p-8 shadow-lg max-w-sm w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="nama">
            Nama
          </label>
          <input
            className="bg-white/10 border border-white/40 rounded w-full py-2 px-3 text-white placeholder-white/70 leading-tight focus:outline-none focus:ring-2 focus:ring-white/50"
            id="nama"
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukan nama anda"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-white/10 border border-white/40 rounded w-full py-2 px-3 text-white placeholder-white/70 leading-tight focus:outline-none focus:ring-2 focus:ring-white/50"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukan email anda"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="jurusan">
            Jurusan
          </label>
          <input
            className="bg-white/10 border border-white/40 rounded w-full py-2 px-3 text-white placeholder-white/70 leading-tight focus:outline-none focus:ring-2 focus:ring-white/50"
            id="jurusan"
            type="text"
            name="jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            placeholder="Pilih"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Simpan
          </button>
          <a
            href="/"
            className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Kembali
          </a>
        </div>
      </form>
    </div>
  </div>
);
}

export default Register;