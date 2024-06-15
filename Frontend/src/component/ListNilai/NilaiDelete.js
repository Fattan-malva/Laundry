import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NilaiDelete() {
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
                method: 'DELETE',
                url: 'https://localhost:7126/Nilai/DeleteNilai?id='+id,
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
                    Hapus Nilai Siswa "{formValue.nama}"
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
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="number"
                            name="nilai"
                            min='0'
                            max='100'
                            placeholder='enter nilai'
                            value={formValue.nilai}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="teks"
                            name="indeks"
                            placeholder='enter indeks'
                            value={formValue.indeks}
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

export default NilaiDelete;