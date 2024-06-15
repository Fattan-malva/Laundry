import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NilaiAdd() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        nama: '',
        kelas: '',
        mapel: '',
        nilai: '',
        indeks: ''
    });

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubnit = async() => {
        const FormDataInput = new FormData();
        FormDataInput.append('id', formValue.id);
        FormDataInput.append('nama', formValue.nama);
        FormDataInput.append('kelas', formValue.kelas);
        FormDataInput.append('mapel', formValue.mapel);
        FormDataInput.append('nilai', formValue.nilai);
        FormDataInput.append('indeks', formValue.indeks);
        alert('Data Berhasil Disimpan');
        navigate('/listnilai');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7126/Nilai/CreateNilai',
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
                    Tambah Data Nilai Siswa
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            className='fromControl'
                            placeholder='Id Siswa'
                            value={formValue.id}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nama"
                            className='fromControl'
                            placeholder='enter Nama'
                            value={formValue.nama}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="teks"
                            name="kelas"
                            className='fromControl'
                            placeholder='enter kelas'
                            value={formValue.kelas}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="teks"
                            name="mapel"
                            className='fromControl'
                            placeholder='enter mata pelajaran'
                            value={formValue.mapel}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="number"
                            name="nilai"
                            className='fromControl'
                            min='0'
                            max='100'
                            placeholder='enter nilai'
                            value={formValue.nilai}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <select
                            name="indeks"
                            className='fromControl'
                            value={formValue.indeks}
                            required
                            onChange={handleChange}
                        >
                            <option value="">Pilih Indeks</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select><br/><br/>
                        <button type="submit" className='btn btn-primary'>Tambah</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NilaiAdd;