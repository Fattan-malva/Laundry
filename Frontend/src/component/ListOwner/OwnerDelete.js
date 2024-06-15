import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OwnerDelete() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id: '',
        namaowner: '',
        nohp: '',
        tanggalmasuk: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7221/owner/GetOwnerById?id='+id);
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
        FormDataInput.append('id', formValue.id);
        FormDataInput.append('namaowner', formValue.namaowner);
        FormDataInput.append('nohp', formValue.nohp);
        FormDataInput.append('tanggalmasuk', formValue.tanggalmasuk);
        alert('Data Berhasil Dihapus');
        navigate('/listowner');
        try {
            const response = await axios({
                method: "DELETE",
                url: "https://localhost:7126/Trainer/DeleteTrainer?id="+id,
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
                    Delete Data Mahasiswa "{formValue.nama}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                    <input
                            type="text"
                            name="id"
                            placeholder='Id Trainer'
                            value={formValue.id}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nama"
                            placeholder='enter Nama'
                            value={formValue.nama}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="email"
                            name="email"
                            placeholder='enter email'
                            value={formValue.email}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="password"
                            name="password"
                            placeholder='enter password'
                            value={formValue.password}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nohp"
                            placeholder='enter nomor hp'
                            value={formValue.nohp}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="number"
                            name="status"
                            min='0'
                            max='1'
                            placeholder='enter status'
                            value={formValue.status}
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

export default OwnerDelete;