import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidnav from "../src/componen/Sidnav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Tambahkategori() {
  const navigate = useNavigate();
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    jabatan: "",
    kategori: "",
    tanggal: "",
  });

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await axios.get("http://localhost:5000/kategoridata");
        setKategoriList(res.data);
      } catch (error) {
        console.error("Gagal memuat kategori:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setShowContent(true), 50);
      }
    };

    fetchKategori();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/kategoridata", form);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil ditambahkan.",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/Kategoridata");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  };

  if (loading && !showContent)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">Memuat...</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-emerald-400">
      <Sidnav />
      <div className="flex-1 p-8 ml-56 transition-all duration-700 ease-out">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg transition-all duration-700">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Tambah Data Kategori
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama Lengkap"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <input
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
              placeholder="Jabatan (misal: X TKJ / Guru / TU)"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <select
  name="kategori"
  value={form.kategori}
  onChange={handleChange}
  className="w-full border px-4 py-2 rounded"
  required
>
  <option value="">-- Pilih Kategori --</option>
  <option value="Siswa">Siswa</option>
  <option value="Guru">Guru</option>
  <option value="Karyawan">Karyawan</option>
</select>



            <input
              name="tanggal"
              type="date"
              value={form.tanggal}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="bg-emerald-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-emerald-600"
              >
                Simpan
              </button>

              <button
                onClick={() => navigate("/Kategoridata")}
                type="button"
                className="bg-gray-400 text-white font-semibold px-6 py-2 rounded shadow hover:bg-gray-500"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Tambahkategori;