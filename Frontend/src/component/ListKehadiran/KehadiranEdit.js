import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function KehadiranEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
 
    const [formValue, setFormValue] = React.useState({
        id: '',
        nama: '',
        kelas: '',
        tanggal: '',
        keterangan: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7126/Kehadiran/GetKehadiranById?id='+id);
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
    }

    const handleSubnit = async(event) => {
        event.preventDefault();
        alert('Data Berhasil Disimpan');
        navigate('/listkehadiran');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7126/Kehadiran/UpdateKehadiran?id='+id,
                data: formValue,
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
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
                    Edit Data Kehadiran Siswa "{formValue.nama}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Siswa'
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
                            type="teks"
                            name="kelas"
                            placeholder='enter kelas'
                            value={formValue.kelas}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="date"
                            name="tanggal"
                            placeholder='enter tanggal'
                            value={formValue.tanggal}
                            disabled
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
                        <button type="submit" className='btn btn-primary'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default KehadiranEdit;