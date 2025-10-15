import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";

function Jenistagihan() {
  const [jenis, setJenis] = useState([]);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [contentVisible, setContentVisible] = useState(false); 

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        const [r1, r2] = await Promise.all([
          axios.get("http://localhost:5000/jenis"),
          axios.get("http://localhost:5000/data"),
        ]);
        
        setJenis(r1.data);
        setData(r2.data);
        
        setLoading(false);
        setTimeout(() => setContentVisible(true), 50); 
        
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelectChange = (e) => {
    const newSelected = e.target.value;
    setSelected(newSelected);
  };

  const dataToShow = selected ? data.filter((d) => d.jenis === selected) : data;

  const mainContentAnimationClass = contentVisible
    ? 'opacity-100 transform translate-y-0 transition-all duration-700 ease-out'
    : 'opacity-0 transform -translate-y-4';

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">Memuat data tagihan...</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className={`flex-1 p-8 ml-56 ${mainContentAnimationClass}`}>
        <div className="bg-gradient-to-r from-emerald-200 to-emerald-400 p-4 rounded-lg mb-6 shadow-md">
          <h1 className="text-3xl font-bold">Jenis Tagihan</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow w-[90%] mx-auto">
          <div className="flex items-center mb-6">
            <label className="mr-2 font-medium">Pilih jenis:</label>
            <select
              value={selected}
              onChange={handleSelectChange}
              className="border px-3 py-1 rounded focus:ring-emerald-500 focus:border-emerald-500 transition"
            >
              <option value="">Semua Jenis Tagihan</option>
              {jenis.map((j) => (
                <option key={j.id} value={j.nama}>
                  {j.nama}
                </option>
              ))}
            </select>
          </div>

          <>
            <h2 className="font-semibold mb-3 text-lg pb-2">
              Daftar Tagihan {selected || "Keseluruhan"}
            </h2>
            <div className={`overflow-x-auto`}>
              <table className="w-full text-center border-collapse">
                <thead className="bg-emerald-100">
                  <tr>
                    <th className="p-3">No</th>
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3">Jenis Tagihan</th>
                    <th className="p-3">Tagihan</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToShow.map((r, idx) => (
                    <tr key={r.id} className="hover:bg-green-50 transition-colors">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">{r.nama}</td>
                      <td className="p-2 font-medium">{r.jenis}</td>
                      <td className="p-2">Rp {r.jumlah?.toLocaleString()}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            r.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.status ? "Lunas" : "Belum Lunas"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {dataToShow.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-4 text-gray-500 border text-center"
                      >
                        Tidak ada data untuk jenis tagihan ini
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Jenistagihan;