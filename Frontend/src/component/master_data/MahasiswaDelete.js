import './Mahasiswa.css';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MahasiswaDelete() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        mhs_nim: '',
        mhs_nama: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7126/Mahasiswa/GetMahasiswaByNIM?mhs_nim='+id);
            const data = response.data.data[0];
            setFormValue(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Data tidak ditemukan atau sudah dihapus!');
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const FormDataInput = new FormData();
        FormDataInput.append("mhs_nim", formValue.mhs_nim)
        FormDataInput.append("mhs_nama", formValue.mhs_nama)
        alert('Data berhasil dihapus')
        navigate('/datamahasiswa')
        try {
            const response = await axios({
                method: "DELETE",
                url: "https://localhost:7126/Mahasiswa/DeleteMahasiswa?mhs_nim="+id,
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
            window.location.reload();
        } catch(error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div className="card">
            <div className='container'>
                <div className='Titel'>
                    Delete Data Mahasiswa "{formValue.mhs_nama}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="mhs_nim"
                            placeholder='enter NIM'
                            value={formValue.mhs_nim}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="mhs_nama"
                            placeholder='enter Nama'
                            value={formValue.mhs_nama}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <button type="submit" className='btn btn-danger'>Hapus</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MahasiswaDelete;