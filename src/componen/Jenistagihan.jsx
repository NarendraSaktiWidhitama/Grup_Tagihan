import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";

function Jenistagihan() {
  const [jenis, setJenis] = useState([]);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [r1, r2] = await Promise.all([
          axios.get("http://localhost:5000/jenis"),
          axios.get("http://localhost:5000/data"),
        ]);
        setJenis(r1.data);
        setData(r2.data);
        setIsTableVisible(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelectChange = (e) => {
    const newSelected = e.target.value;
    setSelected(newSelected);

    setIsTableVisible(false);

    if (newSelected) {
      setTimeout(() => {
        setIsTableVisible(true);
      }, 50); 
    }
  };


  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl font-medium text-gray-700">Memuat jenis tagihan...</p>
    </div>
  );

  const filtered = selected ? data.filter((d) => d.jenis === selected) : [];

  const animationClass = isTableVisible 
    ? 'opacity-100 translate-y-0 duration-500 ease-out' 
    : 'opacity-0 translate-y-2';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className="flex-1 p-8 ml-56">
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
              <option value="">-- Pilih --</option>
              {jenis.map((j) => (
                <option key={j.id} value={j.nama}>
                  {j.nama}
                </option>
              ))}
            </select>
          </div>

          {selected ? (
            <>
              <h2 className="font-semibold mb-3 text-lg border-b pb-2">
                Daftar Tagihan {selected}
              </h2>
              <div className={`overflow-x-auto transition-all ${animationClass}`}> 
                <table className="w-full text-center border-collapse">
                  <thead className="bg-emerald-100">
                    <tr>
                      <th className="p-3">No</th>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Tagihan</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, idx) => (
                      <tr key={r.id} className="hover:bg-green-50 transition-colors">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{r.nama}</td>
                        <td className="p-2">
                          Rp {r.jumlah?.toLocaleString()}
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              r.status 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {r.status ? "Lunas" : "Belum Lunas"}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="p-4 text-gray-500 border text-center"
                        >
                          Tidak ada data untuk jenis ini
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-gray-600 p-4 bg-gray-100 border rounded">
              Pilih jenis tagihan
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jenistagihan;
