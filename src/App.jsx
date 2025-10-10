import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Awalan/Login";
import Register from "./Awalan/Register";
import Dashboard from "./componen/Dashboard";
import Sidnav from "./componen/Sidnav";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/R" element={<Register />} />
      <Route path="/D" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
