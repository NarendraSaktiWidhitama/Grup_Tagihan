import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidnav from "../src/componen/Sidnav";

function Kelas() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");

  const [selectedId, setSelectedId] = useState("");

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/kelas");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const daftarKelas = ["X", "XI", "XII"];
  const daftarJurusan = ["TKJ", "AKL", "TSM", "DPB"];

  const tambahData = async () => {
    if (!nama || !kelas || !jurusan)
      return Swal.fire("Oops!", "Form tidak boleh ada yang kosong!", "warning");

    await axios.post("http://localhost:5000/kelas", { nama, kelas, jurusan });

    Swal.fire("Berhasil!", "Data kelas berhasil ditambahkan!", "success");

    setShowModal(false);
    setNama(""); setKelas(""); setJurusan("");
    loadData();
  };

  const bukaEdit = (d) => {
    setSelectedId(d.id);
    setNama(d.nama);
    setKelas(d.kelas);
    setJurusan(d.jurusan);
    setEditModal(true);
  };

  const updateData = async () => {
    await axios.put(`http://localhost:5000/kelas/${selectedId}`, {
      nama,
      kelas,
      jurusan,
    });

    Swal.fire("Updated!", "Data kelas berhasil diupdate!", "success");

    setEditModal(false);
    setNama(""); setKelas(""); setJurusan("");
    loadData();
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Yakin mau hapus?",
      text: "Data tidak bisa dikembalikan setelah dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/kelas/${id}`);
        Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
        loadData();
      }
    });
  };

  const filteredData = data
    .filter((d) => d.nama.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => (filterKelas ? d.kelas === filterKelas : true))
    .filter((d) => (filterJurusan ? d.jurusan === filterJurusan : true));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidnav />

      <div className="flex-1 p-8 ml-56">
        <h1 className="text-2xl font-bold mb-6">Data Kelas</h1>

        <div className="flex justify-between items-center mb-4">

  <div className="flex gap-3">
    <input
      type="text"
      placeholder="Cari nama"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border px-4 py-2 rounded shadow"
    />

    <select
      value={filterKelas}
      onChange={(e) => setFilterKelas(e.target.value)}
      className="border px-3 py-2 rounded shadow"
    >
      <option value="">Semua Kelas</option>
      {daftarKelas.map((k) => <option key={k}>{k}</option>)}
    </select>

    <select
      value={filterJurusan}
      onChange={(e) => setFilterJurusan(e.target.value)}
      className="border px-3 py-2 rounded shadow"
    >
      <option value="">Semua Jurusan</option>
      {daftarJurusan.map((j) => <option key={j}>{j}</option>)}
    </select>
  </div>

  <button
    onClick={() => setShowModal(true)}
    className="bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600"
  >
    + Tambah Data
  </button>

</div>

        <div className="bg-white p-5 rounded shadow">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-emerald-200">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Kelas</th>
                <th className="p-2">Jurusan</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((d, i) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-2 text-center">{i + 1}</td>
                  <td className="p-2 text-center">{d.nama}</td>
                  <td className="p-2 text-center">{d.kelas}</td>
                  <td className="p-2 text-center">{d.jurusan}</td>
                  <td className="p-2 flex justify-center">
                    <button
                      onClick={() => bukaEdit(d)}
                      className="px-3 py-1 text-white rounded"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => deleteData(d.id)}
                      className="px-3 py-1 text-white rounded"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah */}
      {showModal && (
        <div className="fixed inset-0 bg-emerald-200 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-4">Tambah Data Kelas</h2>

            <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama..." className="w-full border px-3 py-2 rounded mb-3" />
            <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full border px-3 py-2 rounded mb-3">
              <option value="">Pilih Kelas</option>
              {daftarKelas.map((k) => <option key={k}>{k}</option>)}
            </select>
            <select value={jurusan} onChange={(e) => setJurusan(e.target.value)} className="w-full border px-3 py-2 rounded mb-3">
              <option value="">Pilih Jurusan</option>
              {daftarJurusan.map((j) => <option key={j}>{j}</option>)}
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600">Batal</button>
              <button onClick={tambahData} className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editModal && (
        <div className="fixed inset-0 bg-emerald-200 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-4">Edit Data Kelas</h2>

            <input value={nama} onChange={(e) => setNama(e.target.value)} className="w-full border px-3 py-2 rounded mb-3" />
            <select value={kelas} onChange={(e) => setKelas(e.target.value)} className="w-full border px-3 py-2 rounded mb-3">
              <option value="">Pilih Kelas</option>
              {daftarKelas.map((k) => <option key={k}>{k}</option>)}
            </select>
            <select value={jurusan} onChange={(e) => setJurusan(e.target.value)} className="w-full border px-3 py-2 rounded mb-3">
              <option value="">Pilih Jurusan</option>
              {daftarJurusan.map((j) => <option key={j}>{j}</option>)}
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditModal(false)} className="px-4 py-2 text-gray-600">Batal</button>
              <button onClick={updateData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kelas;