import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidnav from "./Sidnav";

const cardAnimationClasses = (index, show) =>
  `transition-all duration-700 ease-out transform ${
    show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  } ${show ? `delay-${index * 150}` : "delay-0"}`;

function Dashboard() {
  const [data, setData] = useState([]);
  const [, setJenis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const [r1, r2] = await Promise.all([
          axios.get("http://localhost:5000/data"),
          axios.get("http://localhost:5000/jenis"),
        ]);

        setData(r1.data);
        setJenis(r2.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 50);
      }
    };
    load();
  }, []);

  if (loading && !showContent)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-emerald-500"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">
            Memuat dashboard
          </p>
        </div>
      </div>
    );

  const totalTagihan = data.length;
  const sudahBayarData = data.filter((d) => d.status === true);
  const belumBayarData = data.filter((d) => !d.status);
  const sudahBayar = sudahBayarData.length;
  const belumBayar = belumBayarData.length;

  const totalNominal = data.reduce((s, it) => s + (it.jumlah || 0), 0);
  const totalSudahLunas = sudahBayarData.reduce(
    (s, it) => s + (it.jumlah || 0),
    0
  );
  const totalBelumLunas = belumBayarData.reduce(
    (s, it) => s + (it.jumlah || 0),
    0
  );

  const dashboardCards = [
    {
      title: "Total Tagihan",
      value: totalTagihan,
      style: "text-white font-bold",
      bgColor: "bg-blue-500",
    },
    {
      title: "Sudah Lunas",
      value: sudahBayar,
      style: "text-white font-bold",
      bgColor: "bg-green-500",
    },
    {
      title: "Belum Lunas",
      value: belumBayar,
      style: "text-white font-bold",
      bgColor: "bg-red-500",
    },
    {
      title: "Total Nominal",
      value: `Rp ${totalNominal.toLocaleString()}`,
      style: "text-white font-bold",
      bgColor: "bg-yellow-500",
    },
    {
      title: "Nominal Sudah Lunas",
      value: `Rp ${totalSudahLunas.toLocaleString()}`,
      style: "text-white font-bold",
      bgColor: "bg-green-600",
    },
    {
      title: "Nominal Belum Lunas",
      value: `Rp ${totalBelumLunas.toLocaleString()}`,
      style: "text-white font-bold",
      bgColor: "bg-red-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidnav />
      <div
        className={`flex-1 p-8 ml-56 transition-all ${
          showContent
            ? "opacity-100 translate-y-0 duration-1000"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.slice(0, 4).map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} p-6 rounded-xl shadow-lg text-center hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 ${cardAnimationClasses(
                index,
                showContent
              )}`}
            >
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className={`text-2xl ${card.style}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.slice(4).map((card, index) => (
            <div
              key={index + 4}
              className={`col-span-1 sm:col-span-2 lg:col-span-2 ${
                card.bgColor
              } p-6 rounded-xl shadow-lg text-center hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 ${cardAnimationClasses(
                index + 4,
                showContent
              )}`}
            >
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className={`text-2xl ${card.style}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div
          className={`bg-white p-6 rounded-lg shadow-xl transition-all duration-700 ease-out ${
            showContent
              ? "opacity-100 translate-y-0 delay-[600ms]"
              : "opacity-0 translate-y-4 delay-0"
          }`}
        >
          <h2 className="text-lg font-semibold mb-3 pb-2">
            Daftar Tagihan Terbaru
          </h2>
          <div className="overflow-x-auto">
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
                {data.slice(0, 10).map((d, i) => (
                  <tr
                    key={d.id}
                    className="hover:bg-emerald-50 transition-colors"
                  >
                    <td className="p-2 text-right">{i + 1}</td>
                    <td className="p-2 text-left">{d.nama}</td>
                    <td className="p-2">{d.jenis}</td>
                    <td className="p-2 text-right">
                      Rp {d.jumlah?.toLocaleString()}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          d.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {d.status ? "Lunas" : "Belum Lunas"}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-gray-500 border text-center"
                    >
                      Tidak ada data tagihan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;