import './Mahasiswa.css';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MahasiswaAdd() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        mhs_nim: '',
        mhs_nama: ''
    });

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubnit = async() => {
        const FormDataInput = new FormData();
        FormDataInput.append('mhs_nim', formValue.mhs_nim);
        FormDataInput.append('mhs_nama', formValue.mhs_nama);
        alert('Data Berhasil Disimpan')
        navigate('/datamahasiswa');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7126/Mahasiswa/CreateMahasiswa',
                data: FormDataInput,
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);
            window.location.reload();
        } catch(error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className="card">
            <div className='container'>
                <div className='Titel'>
                    Tambah Data Mahasiswa
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
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

export default MahasiswaAdd;