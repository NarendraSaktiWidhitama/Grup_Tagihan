import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidnav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin Keluar?",
      text: "Anda akan diarahkan ke halaman utama.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      navigate("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-56 shadow-2xl text-white bg-gradient-to-b from-emerald-500 to-emerald-700 flex flex-col transition-all duration-300">
      <div className="text-3xl font-extrabold text-center pt-8 pb-4">
        Menu
      </div>

      <nav className="mt-4 space-y-2 px-4 flex-1">
        <Link 
          to="/dashboard" 
          className="block py-2 px-3 rounded-lg hover:bg-emerald-800 font-medium text-center transition-all duration-200"
        >
          Dashboard
        </Link>
        <Link 
          to="/tagihan" 
          className="block py-2 px-3 rounded-lg hover:bg-emerald-800 font-medium text-center transition-all duration-200"
        >
          Tagihan
        </Link>
        <Link 
          to="/Jenistagihan" 
          className="block py-2 px-3 rounded-lg hover:bg-emerald-800 font-medium text-center transition-all duration-200"
        >
          Jenis Tagihan
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={handleLogout} 
          className="block w-full py-3 px-3 rounded-xl bg-red-600 shadow-md hover:bg-red-700 font-bold text-center transition-all duration-150 transform hover:scale-[1.02] active:scale-95 active:shadow-inner"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidnav;
