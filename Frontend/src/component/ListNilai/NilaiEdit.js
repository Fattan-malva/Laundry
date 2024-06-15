import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NilaiEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        nama: '',
        kelas: '',
        mapel: '',
        nilai: '',
        indeks: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7126/Nilai/GetNilaiById?id='+id);
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
        navigate('/listnilai');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7126/Nilai/UpdateNilai?id='+id,
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
                    Edit Data Nilai Siswa "{formValue.nama}"
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
                            type="teks"
                            name="mapel"
                            placeholder='enter mata pelajaran'
                            value={formValue.mapel}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="number"
                            name="nilai"
                            min='0'
                            max='100'
                            placeholder='enter nilai'
                            value={formValue.nilai}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="teks"
                            name="indeks"
                            placeholder='enter indeks'
                            value={formValue.indeks}
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

export default NilaiEdit;