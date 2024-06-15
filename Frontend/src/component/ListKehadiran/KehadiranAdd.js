import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NilaiKehadiran() {
    const navigate = useNavigate();
 
    const [formValue, setFormValue] = React.useState({
        id: '',
        nama: '',
        kelas: '',
        tanggal: '',
        keterangan: '',
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
        FormDataInput.append('tanggal', formValue.tanggal);
        FormDataInput.append('keterangan', formValue.keterangan);
        alert('Data Berhasil Disimpan');
        navigate('/listkehadiran');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7126/Kehadiran/CreateKehadiran/',
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
                    Tambah Kehadiran Siswa
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Siswa'
                            value={formValue.id}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nama"
                            placeholder='enter Nama'
                            value={formValue.nama}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="teks"
                            name="kelas"
                            placeholder='enter kelas'
                            value={formValue.kelas}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="date"
                            name="tanggal"
                            placeholder='enter tanggal'
                            value={formValue.tanggal}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <select
                            name="keterangan"
                            value={formValue.keterangan}
                            required
                            onChange={handleChange}
                        >
                            <option value="">Pilih Keterangan</option>
                            <option value="Hadir">Hadir</option>
                            <option value="Izin">Izin</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Tanpa Keterangan">Tanpa Keterangan</option>
                        </select><br/><br/>
                        <button type="submit" className='btn btn-primary'>Tambah</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NilaiKehadiran;