import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidnav from "../src/componen/Sidnav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Tambahkategori() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    kategori: "",
    jabatan: "",
    tanggal: "",
  });

  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");

  const daftarKelas = ["X", "XI", "XII"];
  const daftarJurusan = ["TKJ", "TSM", "DPB", "AKL"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalJabatan = form.jabatan;

    if (form.kategori === "Siswa") {
      if (!kelas || !jurusan)
        return Swal.fire("Oops!", "Kelas & Jurusan harus dipilih!", "warning");
      finalJabatan = `${kelas} ${jurusan}`;
    }

    try {
      await axios.post("http://localhost:5000/kategoridata", {
        ...form,
        jabatan: finalJabatan,
      });

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

            {/* PILIH KATEGORI */}
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Siswa">Siswa</option>
              <option value="Guru">Guru</option>
              <option value="Karyawan">Karyawan</option>
            </select>

            {/* JIKA SISWA → PILIH KELAS & JURUSAN */}
            {form.kategori === "Siswa" && (
              <>
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Pilih Kelas</option>
                  {daftarKelas.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>

                <select
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Pilih Jurusan</option>
                  {daftarJurusan.map((j) => (
                    <option key={j}>{j}</option>
                  ))}
                </select>
              </>
            )}

            {/* JIKA GURU ATAU KARYAWAN → INPUT JABATAN */}
            {(form.kategori === "Guru" || form.kategori === "Karyawan") && (
              <input
                name="jabatan"
                value={form.jabatan}
                onChange={handleChange}
                placeholder={
                  form.kategori === "Guru"
                    ? "Pilih guru"
                    : "TU / Satpam / Bendahara"
                }
                className="w-full border px-4 py-2 rounded"
                required
              />
            )}

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