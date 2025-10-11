import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Awalan/Login";
import Register from "./Awalan/Register";
import Dashboard from "./componen/Dashboard";
import Tagihan from "./componen/Tagihan"
import Jenistagihan from "./componen/Jenistagihan";
import Tambahdata from "./componen/Tambahdata";
import Editdata from "./componen/Editdata";
import Sidnav from "./componen/Sidnav";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/tagihan" element={<Tagihan />} />
      <Route path="/Jenistagihan" element={<Jenistagihan />} />
      <Route path="/tambahdata" element={<Tambahdata />} />
      <Route path="/edit/:id" element={<Editdata />} />
    </Routes>
  );
}

export default App;
