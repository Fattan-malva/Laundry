import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function KehadiranDelete() {
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
            const response = await axios.get("https://localhost:7126/Kehadiran/GetKehadiranById?id="+id);
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
                method: 'DELETE',
                url: 'https://localhost:7126/Kehadiran/DeleteKehadiran?id='+id,
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
                    Hapus Data Kehadiran Siswa "{formValue.nama}"
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
                        <input
                            type="text"
                            name="keterangan"
                            placeholder='enter keterangan'
                            value={formValue.keterangan}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <button type="submit" className='btn btn-danger'>Hapus</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default KehadiranDelete;