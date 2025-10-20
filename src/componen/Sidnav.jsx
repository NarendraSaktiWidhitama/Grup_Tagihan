import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import gambar from "../assets/uang.png"

const Sidnav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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

  const baseLinkClasses = "block w-full py-3 rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-[1.03]";
  
  const inactiveLinkClasses = "hover:bg-emerald-700/70 shadow-none";

  const activeLinkClasses = "bg-emerald-300 text-emerald-900 shadow-lg border-l-4 border-white transform scale-[1.01]";


  return (
    <div className="fixed top-0 left-0 h-full w-56 shadow-2xl text-white bg-gradient-to-br from-emerald-400 to-emerald-700 flex flex-col transition-all duration-300">
      
      <div className="flex items-center justify-center p-4 pt-6 pb-6 border-emerald-500/30">
        <img 
          src={gambar} 
          alt="gambar uang" 
          className="w-14 h-14 -ml-10" 
        />
        <div className="text-2xl font-black tracking-widest uppercase">
          MENU
        </div>
      </div>

      <nav className="space-y-3 px-3 flex-1">
        <Link 
          to="/dashboard" 
          className={`${baseLinkClasses} ${isActive('/dashboard') ? activeLinkClasses : inactiveLinkClasses}`}
        >
          Dashboard
        </Link>

        <Link 
          to="/tagihan" 
          className={`${baseLinkClasses} ${isActive('/tagihan') ? activeLinkClasses : inactiveLinkClasses}`}
        >
          Tagihan
        </Link>

        <Link 
          to="/Jenistagihan" 
          className={`${baseLinkClasses} ${isActive('/Jenistagihan') ? activeLinkClasses : inactiveLinkClasses}`}
        >
          Jenis Tagihan
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={handleLogout} 
          className="block w-full py-3 px-3 rounded-lg bg-red-600 shadow-xl hover:bg-red-700 font-bold text-center transition-all duration-150 transform hover:scale-[1.03] active:scale-95 active:shadow-inner tracking-wider"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidnav;