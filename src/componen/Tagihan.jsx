import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";
import { useNavigate } from "react-router-dom";

function Tagihan() {
  const [data, setData] = useState([]);
  const [jenis, setJenis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [r1, r2] = await Promise.all([
          axios.get("http://localhost:5000/data"),
          axios.get("http://localhost:5000/jenis")
        ]);
        setData(r1.data);
        setJenis(r2.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className="flex-1 p-8 ml-56">
        <div className="bg-gradient-to-r from-emerald-200 to-emerald-500 p-4 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Daftar Tagihan</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="font-medium mr-2">Filter jenis:</label>
            <select className="border rounded px-3 py-1" onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                axios.get("http://localhost:5000/data").then(r => setData(r.data));
              } else {
                axios.get(`http://localhost:5000/data?jenis=${encodeURIComponent(val)}`).then(r => setData(r.data));

              }
            }}>
              <option value="">Semua</option>
              {jenis.map(j => <option key={j.id} value={j.nama}>{j.nama}</option>)}
            </select>
          </div>

          <button onClick={() => navigate("/tambahdata")} className="bg-blue-500 text-white px-4 py-2 rounded">+ Tambah Data</button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
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
                <tr key={d.id} className="hover:bg-emerald-50">
                  <td className="p-2">{i+1}</td>
                  <td className="p-2">{d.nama}</td>
                  <td className="p-2">{d.email}</td>
                  <td className="p-2">{d.jenis}</td>
                  <td className="p-2">Rp {d.jumlah?.toLocaleString()}</td>
                  <td className="p-2">{d.status ? "Lunas" : "Belum Lunas"}</td>
                  <td className="p-2">
                    <button onClick={() => navigate(`/edit/${d.id}`)} className="bg-yellow-400 px-3 py-1 rounded mr-2">Edit</button>
                    <button onClick={async () => {
                      if (!confirm("Yakin hapus?")) return;
                      await axios.delete(`http://localhost:5000/data/${d.id}`);
                      setData(prev => prev.filter(x => x.id !== d.id));
                    }} className="bg-red-500 px-3 py-1 rounded text-white">Hapus</button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan="7" className="p-6 text-gray-500">Tidak ada data</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tagihan;