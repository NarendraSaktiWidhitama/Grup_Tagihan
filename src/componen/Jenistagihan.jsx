import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";
import { useNavigate } from "react-router-dom";

function Jenistagihan() {
  const [jenis, setJenis] = useState([]);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [r1, r2] = await Promise.all([
          axios.get("http://localhost:5000/jenis"),
          axios.get("http://localhost:5000/data")
        ]);
        setJenis(r1.data);
        setData(r2.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const filtered = selected ? data.filter(d => d.jenis === selected) : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className="flex-1 p-8 ml-56">
        <div className="bg-gradient-to-r from-emerald-200 to-emerald-400 p-4 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Jenis Tagihan</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="mr-2 font-medium">Pilih jenis:</label>
              <select value={selected} onChange={(e) => setSelected(e.target.value)} className="border px-3 py-1 rounded">
                <option value="">-- Pilih --</option>
                {jenis.map(j => <option key={j.id} value={j.nama}>{j.nama}</option>)}
              </select>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => navigate("/tambahdata")}>+ Tambah Data</button>
            </div>
          </div>

          {selected ? (
            <>
              <h2 className="font-semibold mb-3">Daftar {selected}</h2>
              <table className="w-full border-collapse">
                <thead className="bg-emerald-100">
                  <tr>
                    <th className="p-2">No</th>
                    <th className="p-2">Nama Siswa</th>
                    <th className="p-2">Tagihan</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, idx) => (
                    <tr key={r.id} className="hover:bg-green-50">
                      <td className="p-2">{idx+1}</td>
                      <td className="p-2">{r.nama}</td>
                      <td className="p-2">Rp {r.jumlah?.toLocaleString()}</td>
                      <td className="p-2">{r.status ? "Lunas" : "Belum Lunas"}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && <tr><td colSpan="4" className="p-4 text-gray-500">Tidak ada data untuk jenis ini</td></tr>}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-gray-600">Pilih jenis tagihan terlebih dahulu.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jenistagihan;