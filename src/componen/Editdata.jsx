import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";
import { useNavigate, useParams } from "react-router-dom";

function Editdata() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jenis, setJenis] = useState([]);
  const [form, setForm] = useState({ nama: "", email: "", jurusan: "", jenis: "", jumlah: "", status: false });

  useEffect(() => {
    axios.get("http://localhost:5000/jenis").then(r => setJenis(r.data)).catch(console.error);
    axios.get(`http://localhost:5000/data/${id}`).then(r => {
      setForm(r.data);
    }).catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/data/${id}`, { ...form, jumlah: Number(form.jumlah) });
      navigate("/tagihan");
    } catch (err) {
      console.error(err);
      alert("Gagal update");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className="flex-1 p-8 ml-120 m-10">
        <div className="bg-emerald-100 p-6 rounded-lg shadow max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Edit Tagihan</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" className="w-full border px-3 py-2 rounded" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2 rounded" required />
            <input name="jurusan" value={form.jurusan} onChange={handleChange} placeholder="Jurusan" className="w-full border px-3 py-2 rounded" />
            <select name="jenis" value={form.jenis} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
              <option value="">Pilih jenis</option>
              {jenis.map(j => <option key={j.id} value={j.nama}>{j.nama}</option>)}
            </select>
            <input name="jumlah" value={form.jumlah} onChange={handleChange} placeholder="Jumlah (angka)" className="w-full border px-3 py-2 rounded" required />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
              <span>Sudah Lunas?</span>
            </label>
            <div className="flex gap-3">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Simpan</button>
              <button onClick={() => navigate(-1)} type="button" className="bg-gray-300 px-4 py-2 rounded">Batal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editdata;