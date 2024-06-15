import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PelajaranEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        hari: '',
        nama_pelajaran: '',
        nama_guru: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7126/Pelajaran/GetPelajaranById?id='+id);
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
        navigate('/listpelajaran');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7126/Pelajaran/UpdatePelajaran?id='+id,
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
                    Edit Jadwal Pelajaran "{formValue.nama_pelajaran}"
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

export default PelajaranEdit;