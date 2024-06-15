import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TrainerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id: '',
        nama: '',
        email: '',
        password: '',
        nohp: '',
        status: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7126/Trainer/GetTrainerById?id='+id);
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
    };

    const handleSubnit = async (event) => {
        event.preventDefault();
        alert('Data Berhasil Diubah');
        navigate('/listtrainer');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7126/Trainer/UpdateTrainer?id='+id,
                data: formValue,
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <div className="card">
            <div className='container'>
                <div className='Titel'>
                    Edit Data Trainer "{formValue.nama}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Trainer'
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
                            type="email"
                            name="email"
                            placeholder='enter email'
                            value={formValue.email}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="password"
                            name="password"
                            placeholder='enter password'
                            value={formValue.password}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nohp"
                            placeholder='enter nomor hp'
                            value={formValue.nohp}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="number"
                            name="status"
                            min='0'
                            max='1'
                            placeholder='enter status'
                            value={formValue.status}
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

export default TrainerEdit;
