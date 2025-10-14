import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";

const cardAnimationClasses = (index, show) => 
  `transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transform delay-${index * 150}`;

function Dashboard() {
  const [data, setData] = useState([]);
  const [, setJenis] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); 

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
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl font-medium text-gray-700">Memuat data...</p>
    </div>
  );

  const totalTagihan = data.length;
  const sudahBayar = data.filter(d => d.status === true).length;
  const belumBayar = totalTagihan - sudahBayar;
  const totalNominal = data.reduce((s, it) => s + (it.jumlah || 0), 0);

  const dashboardCards = [
    { title: "Total Tagihan", value: totalTagihan, style: "text-gray-900" },
    { title: "Sudah Lunas", value: sudahBayar, style: "text-green-600" },
    { title: "Belum Lunas", value: belumBayar, style: "text-red-600" },
    { title: "Total Nominal", value: `Rp ${totalNominal.toLocaleString()}`, style: "text-gray-900" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div className={`flex-1 p-8 ml-56 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <div 
              key={index}
              className={`bg-white p-5 rounded-lg shadow ${cardAnimationClasses(index, showContent)}`}
            >
              <div className="text-sm text-gray-500">{card.title}</div>
              <div className={`text-2xl font-bold ${card.style}`}>{card.value}</div>
            </div>
          ))}
        </div>

        <div className={`bg-white p-4 rounded-lg shadow transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0 delay-1000' : 'opacity-0 translate-y-4'}`}>
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