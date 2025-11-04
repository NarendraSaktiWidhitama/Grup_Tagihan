import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "../src/componen/Sidnav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Kategoridata() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState(""); // ← SEARCH
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/kategoridata");
      const result = res.data.reverse();
      setData(result);
      setFiltered(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter kategori + search
  useEffect(() => {
    let result = data;

    if (filter !== "Semua") {
      result = result.filter((d) => d.kategori === filter);
    }

    if (search.trim() !== "") {
      result = result.filter(
        (d) =>
          d.nama.toLowerCase().includes(search.toLowerCase()) ||
          d.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [filter, search, data]);

  const deleteData = async (id) => {
    const ask = await Swal.fire({
      title: "Hapus kategori?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!ask.isConfirmed) return;

    await axios.delete(`http://localhost:5000/kategoridata/${id}`);
    loadData();
    Swal.fire("Berhasil", "Kategori dihapus", "success");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidnav />

      <div className="flex-1 p-8 ml-56 transition-all">
        <h1 className="text-2xl font-bold mb-6">
          <i className="ri-folder-2-fill mr-2"></i> Kategori Data
        </h1>

        <div className="flex justify-between mb-4 items-center">

          {/* FILTER SELECT */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded bg-white shadow"
          >
            <option>Semua</option>
            <option>Siswa</option>
            <option>Guru</option>
            <option>Karyawan</option>
          </select>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari nama"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded shadow w-64"
          />

          <button
            onClick={() => navigate("/tambahkategori")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Kategori
          </button>
        </div>

        <div className="bg-white shadow rounded p-5">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-200">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Email</th>
                <th className="p-2">Jabatan</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Tanggal</th>
                <th className="p-2 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((d, i) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{d.nama}</td>
                  <td className="p-2">{d.email}</td>
                  <td className="p-2">{d.jabatan}</td>
                  <td className="p-2">{d.kategori}</td>
                  <td className="p-2">{d.tanggal}</td>

                  <td className="p-2 text-center">
                    <button
                      onClick={() => navigate(`/editkategori/${d.id}`)}
                      className="mr-3"
                    >
                      ✏️
                    </button>
                    <button onClick={() => deleteData(d.id)}>🗑️</button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    Tidak ada data yang cocok
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

export default Kategoridata;