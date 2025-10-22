import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";
import Swal from "sweetalert2";

function Jenistagihan() {
  const [jenis, setJenis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await axios.get("http://localhost:5000/jenis");
        setJenis(res.data);
        setLoading(false);
        setTimeout(() => setContentVisible(true), 50);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Jenis Tagihan",
      html: `
        <input id="nama" class="swal2-input" placeholder="Nama Jenis">
        <input id="ket" class="swal2-input" placeholder="Keterangan">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Tambah",
      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const ket = document.getElementById("ket").value;
        if (!nama) {
          Swal.showValidationMessage("Nama jenis wajib diisi!");
          return false;
        }
        return { nama, keterangan: ket };
      },
    });

    if (!formValues) return;

    try {
      const res = await axios.post("http://localhost:5000/jenis", formValues);
      Swal.fire("Berhasil!", "Jenis tagihan berhasil ditambahkan", "success");
      setJenis([...jenis, res.data]);
    } catch (err) {
      Swal.fire("Gagal", "Tidak bisa menambah jenis tagihan", "error");
      console.error(err);
    }
  };

  const handleEdit = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Jenis Tagihan",
      html: `
        <input id="nama" class="swal2-input" value="${item.nama}" placeholder="Nama Jenis">
        <input id="ket" class="swal2-input" value="${item.keterangan || ""}" placeholder="Keterangan">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const ket = document.getElementById("ket").value;
        if (!nama) {
          Swal.showValidationMessage("Nama jenis tidak boleh kosong!");
          return false;
        }
        return { nama, keterangan: ket };
      },
    });

    if (!formValues) return;

    try {
      await axios.put(`http://localhost:5000/jenis/${item.id}`, formValues);
      Swal.fire("Berhasil!", "Jenis tagihan berhasil diperbarui", "success");
      setJenis(
        jenis.map((j) =>
          j.id === item.id ? { ...j, ...formValues } : j
        )
      );
    } catch (err) {
      Swal.fire("Gagal", "Tidak bisa mengedit jenis tagihan", "error");
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    const konfirmasi = await Swal.fire({
      title: "Hapus Jenis Tagihan?",
      text: `Yakin ingin menghapus "${item.nama}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!konfirmasi.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/jenis/${item.id}`);
      Swal.fire("Terhapus!", "Jenis tagihan berhasil dihapus", "success");
      setJenis(jenis.filter((j) => j.id !== item.id));
    } catch (err) {
      Swal.fire("Gagal", "Tidak bisa menghapus jenis tagihan", "error");
      console.error(err);
    }
  };

  const mainContentAnimationClass = contentVisible
    ? "opacity-100 transform translate-y-0 transition-all duration-700 ease-out"
    : "opacity-0 transform -translate-y-4";

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">
            Memuat jenis tagihan
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className={`flex-1 p-8 ml-56 ${mainContentAnimationClass}`}>
        <div className="bg-gradient-to-r from-emerald-200 to-emerald-400 p-4 rounded-lg mb-6 shadow-md flex justify-between items-center">
          <h1 className="text-3xl font-bold">Jenis Tagihan</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            + Tambah Jenis
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow w-full max-w-[1200px] mx-auto">
          <h2 className="font-semibold mb-3 text-lg pb-2">
            Daftar Jenis Tagihan
          </h2>
          <table className="w-full text-center border-collapse">
            <thead className="bg-emerald-100 border-gray-300">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Nama Jenis</th>
                <th className="p-3">Keterangan</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jenis.map((j, i) => (
                <tr
                  key={j.id}
                  className="hover:bg-green-50 transition-colors border-gray-200"
                >
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2 font-medium">{j.nama}</td>
                  <td className="p-2 font-medium">
                    {j.keterangan || "-"}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(j)}
                      className="px-3 py-1 rounded transition hover:scale-[1.30]"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(j)}
                      className="px-3 py-1 rounded transition hover:scale-[1.30]"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {jenis.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-gray-500 border">
                    Tidak ada data jenis tagihan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Jenistagihan;