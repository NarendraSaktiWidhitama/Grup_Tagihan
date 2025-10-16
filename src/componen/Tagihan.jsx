import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Tagihan() {
  const [data, setData] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (filterJenis = "") => {
    if (!loading) setLoading(true); 

    try {
      if (!showContent) {
        await new Promise(resolve => setTimeout(resolve, 500)); 
      }
      
      const dataUrl = filterJenis 
        ? `http://localhost:5000/data?jenis=${encodeURIComponent(filterJenis)}`
        : "http://localhost:5000/data";

      const [r1, r2] = await Promise.all([
        axios.get(dataUrl),
        axios.get("http://localhost:5000/jenis"),
      ]);
      setData(r1.data);
      setJenis(r2.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    
      if (!showContent) {
        setTimeout(() => {
          setShowContent(true);
        }, 50);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const val = e.target.value;
    fetchData(val); 
  };

  const toggleStatus = async (item) => {
    try {
      await axios.patch(`http://localhost:5000/data/${item.id}`, {
        status: !item.status,
      });
      setData((prev) =>
        prev.map((d) =>
          d.id === item.id ? { ...d, status: !item.status } : d
        )
      );
    } catch (err) {
      console.error("Gagal ubah status", err);
    }
  };
  
  const handleDelete = async (d) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang sudah dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/data/${d.id}`);
        setData((prev) => prev.filter((x) => x.id !== d.id));
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Data berhasil dihapus.",
          showConfirmButton: false,
          timer: 1200,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus data.",
        });
      }
    }
  };

  if (loading && !showContent) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-emerald-500"></div>
        <p className="mt-4 text-xl font-medium text-gray-700">Memuat data tagihan...</p>
      </div>
    </div>
  );

  const baseAnimation = showContent 
    ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out' 
    : 'opacity-0 translate-y-4';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className={`flex-1 p-8 ml-56 ${baseAnimation}`}>
        <div className={`bg-gradient-to-r from-emerald-200 to-emerald-500 p-4 rounded-lg mb-6 transition-all ease-out duration-700`}>
          <h1 className="text-3xl font-bold">Daftar Tagihan</h1>
        </div>

        <div className={`flex justify-between items-center mb-4 transition-all ease-out duration-700 delay-100 ${baseAnimation}`}>
          <div>
            <label className="font-medium mr-2">Filter jenis:</label>
            <select
              className="border rounded px-3 py-1 transition-all"
              onChange={handleFilterChange}
            >
              <option value="">Semua</option>
              {jenis.map((j) => (
                <option key={j.id} value={j.nama}>
                  {j.nama}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate("/tambahdata")}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
          >
            + Tambah Data
          </button>
        </div>

        <div className={`bg-white p-4 rounded-lg shadow transition-all ease-out duration-700 delay-200 ${baseAnimation}`}>
          <table className="w-full text-center border-collapse">
            <thead className="bg-emerald-200">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Email</th>
                <th className="p-2">Jenis</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Status</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id} className="hover:bg-emerald-50 transition-colors">
                  <td className="p-2 text-right">{i + 1}</td>
                  <td className="p-2 text-left">{d.nama}</td>
                  <td className="p-2 text-left">{d.email}</td>
                  <td className="p-2">{d.jenis}</td>
                  <td className="p-2 mx-8">Rp {d.jumlah?.toLocaleString()}</td>
                  <td className="p-2">{d.status ? "Lunas" : "Belum Lunas"}</td>
                  <td className="p-2 flex justify-center gap-2">
                    
                    <button
                    onClick={() => navigate(`/edit/${d.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded transition shadow-md text-lg"
                    >
                      ✏️
                      </button>
                      
                      <button
                      onClick={() => handleDelete(d)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition shadow-md text-lg"
                      >
                        🗑️
                        </button>

                    <button
                      onClick={d.status ? undefined : () => toggleStatus(d)}
                      disabled={d.status}
                      className={`min-w-[130px] text-sm px-2 py-1 rounded transition shadow-md text-white ${
                        d.status
                          ? "bg-gray-400 cursor-not-allowed opacity-70"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                    >
                      {d.status ? "Lunas" : "Tandai Lunas"}
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-gray-500">
                    Tidak ada data
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

export default Tagihan;