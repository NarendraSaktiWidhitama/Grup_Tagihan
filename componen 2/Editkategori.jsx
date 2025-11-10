import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "../src/componen/Sidnav";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Editkategori() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));

      try {
        const r = await axios.get(`http://localhost:5000/kategoridata/${id}`);
        setForm({
          ...r.data,
          tanggal: r.data.tanggal
            ? new Date(r.data.tanggal).toISOString().split("T")[0]
            : "",
        });
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setShowContent(true), 50);
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ask = await Swal.fire({
      title: "Yakin ingin mengubah kategori?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!ask.isConfirmed) return;

    try {
      await axios.put(`http://localhost:5000/kategoridata/${id}`, form);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/kategoridata");
    } catch (err) {
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  if (loading && !showContent)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">Memuat halaman</p>
        </div>
      </div>
    );

  const baseAnimation = showContent
    ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
    : "opacity-0 translate-y-4";

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidnav />
      <div className={`flex-1 p-8 ml-120 m-20 ${baseAnimation}`}>
        <div className="bg-emerald-100 p-6 rounded-lg shadow-xl max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Edit Kategori Data
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama"
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
              placeholder="Jabatan (misal: X TKJ, Guru, Staff)"
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
              <option value="">Pilih kategori</option>
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
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => navigate("/kategoridata")}
                type="button"
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
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

export default Editkategori;
