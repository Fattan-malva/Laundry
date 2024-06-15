import './Mahasiswa.css';
import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MahasiswaEdit() {
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
            console.error("Error fetching data:", error);
        }
    }, [id]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert('Data Berhasil Diubah');
        navigate('/datamahasiswa');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7126/Mahasiswa/UpdateMahasiswa?mhs_nim='+id,
                data: formValue,
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <div className="card">
            <div className='container'>
                <div className='Titel'>
                    Edit Data Mahasiswa "{formValue.mhs_nama}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="mhs_nim"
                            placeholder='enter NIM'
                            value={formValue.mhs_nim}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="mhs_nama"
                            placeholder='enter Nama'
                            value={formValue.mhs_nama}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <button type="submit" className='btn btn-primary'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MahasiswaEdit;
