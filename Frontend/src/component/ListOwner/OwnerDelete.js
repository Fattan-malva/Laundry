import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OwnerDelete() {
  const { id } = useParams();
  const [owner, setOwner] = useState({
    id: '',
    namaowner: '',
    nohp: '',
    tanggalmasuk: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7221/owner/GetOwnerById?id=${id}`
      );
      const data = response.data;
      setOwner({
        id: data.id,
        namaowner: data.namaowner,
        nohp: data.nohp,
        tanggalmasuk: data.tanggalmasuk

       
      });
    } catch (error) {
      console.log(error);
      alert("Data tidak ditemukan atau sudah dihapus!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(
        `https://localhost:7221/owner/DeleteOwner?id=${id}`
      );
      alert("Data berhasil dihapus");
      window.location.href = "/listowner";
    } catch (error) {
      console.error(error);
      alert("Error deleting data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Hapus Data Owner {id}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <p>Yakin ingin menghapus owner {owner.namaowner}?</p>
            <button type="submit" className="btn btn-danger">
              Hapus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerDelete;
