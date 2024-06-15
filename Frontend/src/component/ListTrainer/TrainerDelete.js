import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TrainerDelete() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id: '',
        nama: '',
        email: '',
        password: '',
        nohp: '',
        status: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7126/Trainer/GetTrainerById?id='+id);
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
        FormDataInput.append('nama', formValue.nama);
        FormDataInput.append('email', formValue.email);
        FormDataInput.append('password', formValue.password);
        FormDataInput.append('nohp', formValue.nohp);
        FormDataInput.append('status', formValue.status);
        alert('Data berhasil dihapus');
        navigate('/listowner');
        try {
            const response = await axios({
                method: "DELETE",
                url: "https://localhost:7221/owner/DeleteOwner?id="+id,
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
                    Delete Data Owner "{formValue.nama}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Owner'
                            value={formValue.id}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="namaowner"
                            placeholder='enter Nama Owner'
                            value={formValue.namaowner}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nohp"
                            placeholder='enter nohp'
                            value={formValue.nohp}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="date"
                            name="tanggalmasuk"
                            placeholder='enter tanggalmasuk'
                            value={formValue.password}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <button type="submit" className='btn btn-primary'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TrainerDelete;