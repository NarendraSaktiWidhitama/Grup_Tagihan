import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Editdata() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jenis, setJenis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    jurusan: "",
    jenis: "",
    jumlah: "",
    tanggal: "",
    status: false,
  });

  useEffect(() => {
    const fetchDataAndForm = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const r1 = await axios.get("http://localhost:5000/jenis");
        setJenis(r1.data);

        const r2 = await axios.get(`http://localhost:5000/data/${id}`);
        setForm({
          ...r2.data,
          tanggal: r2.data.tanggal
            ? new Date(r2.data.tanggal).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 50);
      }
    };

    fetchDataAndForm();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Yakin Ingin Mengubah?",
      text: "Data tagihan akan diperbarui.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Ubah Data!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/data/${id}`, {
          ...form,
          jumlah: Number(form.jumlah),
        });

        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data tagihan berhasil diperbarui.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/tagihan");
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal Update",
          text: "Terjadi kesalahan saat memperbarui data.",
        });
      }
    }
  };

  if (loading && !showContent)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">
            Memuat data tagihan
          </p>
        </div>
      </div>
    );

  const baseAnimation = showContent
    ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
    : "opacity-0 translate-y-4";

  return (
    <div className="flex min-h-screen bg-emerald-400">
      <Sidnav />
      <div className={`flex-1 p-8 ml-56 ${baseAnimation}`}>
        <div
          className={`bg-white p-6 ml-65 m-15 rounded-lg shadow-xl max-w-lg transition-all ease-out duration-700 delay-100 ${baseAnimation}`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Formulir Edit Tagihan
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="w-full border px-4 py-2 rounded focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full border px-4 py-2 rounded focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            />
            <input
              name="jurusan"
              value={form.jurusan}
              onChange={handleChange}
              placeholder="Jurusan"
              className="w-full border px-4 py-2 rounded focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
            />

            <select
              name="jenis"
              value={form.jenis}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            >
              <option value="">Pilih jenis</option>
              {jenis.map((j) => (
                <option key={j.id} value={j.nama}>
                  {j.nama}
                </option>
              ))}
            </select>

            <input
              name="jumlah"
              value={form.jumlah}
              onChange={handleChange}
              placeholder="Jumlah (angka)"
              type="number"
              className="w-full border px-4 py-2 rounded focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            />

            <div>
              <label className="block text-gray-600 mb-1">
              </label>
              <input
                name="tanggal"
                type="date"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                required
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-green-600 transition transform hover:scale-[1.02]"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => navigate("/tagihan")}
                type="button"
                className="bg-gray-400 text-white font-semibold px-6 py-2 rounded shadow hover:bg-gray-500 transition"
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

export default Editdata;
