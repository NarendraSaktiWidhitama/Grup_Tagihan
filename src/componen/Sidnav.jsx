import React from "react";
import { Link } from "react-router-dom";

const Sidnav = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-56 shadow text-black bg-gradient-to-b from-emerald-200 to-emerald-600">
      <div className="text-3xl font-bold text-center pt-6">Menu</div>
      <nav className="mt-8 space-y-4 text-center">
        <Link to="/dashboard" className="block py-2 px-3 rounded hover:bg-emerald-600 font-medium">Dashboard</Link>
        <Link to="/tagihan" className="block py-2 px-3 rounded hover:bg-emerald-600 font-medium">Tagihan</Link>
        <Link to="/Jenistagihan" className="block py-2 px-3 rounded hover:bg-emerald-600 font-medium">Jenis Tagihan</Link>
        <div className="pt-85">
        <Link to="/" className="block py-2 px-3 rounded hover:bg-red-800 font-medium">Keluar</Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidnav;