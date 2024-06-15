import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PelajaranDelete() {
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
        const FormDataInput = new FormData();
        FormDataInput.append('id', formValue.id);
        FormDataInput.append('hari', formValue.hari);
        FormDataInput.append('nama_pelajaran', formValue.nama_pelajaran);
        FormDataInput.append('nama_guru', formValue.nama_guru);
        alert('Data Berhasil Disimpan');
        navigate('/listpelajaran');
        try {
            const response = await axios({
                method: 'DELETE',
                url: 'https://localhost:7126/Pelajaran/DeletePelajaran?id='+id,
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
                    Hapus Jadwal Pelajaran "{formValue.nama_pelajaran}"
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
                            name="hari"
                            placeholder='enter hari'
                            value={formValue.hari}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nama_pelajaran"
                            placeholder='enter Jadwal'
                            value={formValue.nama_pelajaran}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nama_guru"
                            placeholder='enter Guru'
                            value={formValue.nama_guru}
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

export default PelajaranDelete;