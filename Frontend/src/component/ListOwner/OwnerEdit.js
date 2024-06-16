import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OwnerEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
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
        "https://localhost:7221/owner/GetOwnerById?id=" + id
      );
      const data = await response.data;

      const dataId = data[0].id;
      const dataNamaowner =data[0].namaowner;
      const dataNohp = data[0].nohp;
      const dataTanggalmasuk = data[0].tanggalmasuk;

      setFormValue({
        id: dataId,
        namaowner: dataNamaowner,
        nohp: dataNohp,
        tanggalmasuk: dataTanggalmasuk
        
        
      });
    } catch (error) {
      console.error(error);
      alert("Data tidak ditemukan!");
    }
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        "https://localhost:7221/owner/GetUpdateOwner?id=" + id,
        formValue
      );

      window.location.href = "/listowner";

      alert("Data berhasil diubah");
    } catch (error) {
      console.error(error);
      alert("Error saat mengubah data");
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="title">Edit Data Owner {id}</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="id"
              placeholder="Masukkan Id"
              value={formValue.id}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="namaowner"
              placeholder="Masukkan Nama owner"
              value={formValue.namaowner}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="nohp"
              placeholder="Masukkan nohp"
              value={formValue.nohp}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="date"
              name="tanggalmasuk"
              placeholder="Masukkan Tanggalmasuk"
              value={formValue.tanggalmasuk}
              onChange={handleChange}
            />
            <br />
            <br />
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerEdit;
