import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "../src/componen/Sidnav";

function Masterdata() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/kategoridata");
        setData(res.data);
      } catch (error) {
        console.log("Gagal mengambil data:", error);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidnav />

      {/* Konten */}
      <div className="flex-1 p-8 ml-56">
        <h1 className="text-2xl font-bold mb-5">Master Data</h1>

        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Cari nama"
            className="px-4 py-2 w-96 border rounded shadow-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabel */}
        <div className="bg-white rounded shadow p-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-emerald-200">
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