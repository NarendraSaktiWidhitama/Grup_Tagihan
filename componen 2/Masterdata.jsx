import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "../src/componen/Sidnav";

function Masterdata() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Tambahan state loading
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/kategoridata");

        // Biar data terbaru tampil di atas
        setData(res.data.reverse());
      } catch (error) {
        console.log("Gagal mengambil data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowContent(true);
        }, 800);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((d) =>
    [d.nama, d.email, d.jabatan, d.kategori]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading && !showContent)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">
            Memuat master data
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidnav />

      <div className="flex-1 p-8 ml-56">
        <div className="flex justify-between items-center bg-gradient-to-r from-emerald-300 to-emerald-400 px-5 py-4 rounded-md shadow mb-6">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <span>📋</span> Master Data
          </h1>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Cari nama"
            className="px-4 py-2 w-96 border rounded shadow-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded shadow p-5 overflow-x-auto">
          <table className="w-full border-collapse text-base">
            <thead className="bg-emerald-300">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Email</th>
                <th className="p-2">Jabatan</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((d, i) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-2 text-center">{i + 1}</td>
                  <td className="p-2">{d.nama}</td>
                  <td className="p-2">{d.email}</td>
                  <td className="p-2 text-center">{d.jabatan}</td>
                  <td className="p-2 text-center">{d.kategori}</td>
                  <td className="p-2 text-center">{d.tanggal}</td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    Tidak ada data yang cocok.
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

export default Masterdata;