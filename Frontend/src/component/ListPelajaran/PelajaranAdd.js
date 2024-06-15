import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PelajaranAdd() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        hari: '',
        nama_pelajaran: '',
        nama_guru: ''
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
        FormDataInput.append('hari', formValue.hari);
        FormDataInput.append('nama_pelajaran', formValue.nama_pelajaran);
        FormDataInput.append('nama_guru', formValue.nama_guru);
        alert('Data Berhasil Disimpan');
        navigate('/listpelajaran');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7126/Pelajaran/CreatePelajaran',
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
                    Tambah Jadwal Pelajaran
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Jadwal'
                            value={formValue.id}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <select
                            name="hari"
                            value={formValue.hari}
                            required
                            onChange={handleChange}
                        >
                            <option value="">Pilih Hari</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jum'at">Jum'at</option>
                            <option value="Sabtu">Sabtu</option>
                        </select><br/><br/>
                        <input
                            type="text"
                            name="nama_pelajaran"
                            placeholder='enter Jadwal'
                            value={formValue.nama_pelajaran}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nama_guru"
                            placeholder='enter Guru'
                            value={formValue.nama_guru}
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

export default PelajaranAdd;