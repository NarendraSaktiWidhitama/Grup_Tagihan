import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";

function Dashboard() {
  const [data, setData] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat...</p>;

  const totalTagihan = data.length;
  const sudahBayar = data.filter(d => d.status === true).length;
  const belumBayar = totalTagihan - sudahBayar;
  const totalNominal = data.reduce((s, it) => s + (it.jumlah || 0), 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className="flex-1 p-8 ml-56">
        <h1 className="text-3xl font-bold">DASHBOARD</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pt-6">
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Tagihan</div>
            <div className="text-2xl font-bold">{totalTagihan}</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="text-sm text-gray-500">Sudah Bayar</div>
            <div className="text-2xl font-bold text-green-600">{sudahBayar}</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="text-sm text-gray-500">Belum Bayar</div>
            <div className="text-2xl font-bold text-red-600">{belumBayar}</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Nominal</div>
            <div className="text-2xl font-bold">Rp {totalNominal.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Daftar Tagihan</h2>
          <table className="w-full text-center border-collapse">
            <thead className="bg-emerald-200">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Jenis</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id} className="hover:bg-emerald-50">
                  <td className="p-2">{i+1}</td>
                  <td className="p-2">{d.nama}</td>
                  <td className="p-2">{d.jenis}</td>
                  <td className="p-2">Rp {d.jumlah?.toLocaleString()}</td>
                  <td className="p-2">{d.status ? "Lunas" : "Belum Lunas"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;