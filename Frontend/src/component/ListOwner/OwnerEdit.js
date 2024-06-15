import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OwnerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id: '',
        namaowner: '',
        nohp: '',
        tanggalmasuk: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7221/owner/GetOwnerById?id='+id);
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
        navigate('/listowner');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7221/owner/GetUpdateOwner?id='+id,
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
                    Edit Data Owner "{formValue.namaowner}"
                </div>
                <div className='content'>
                <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Owner'
                            value={formValue.id}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="namaowner"
                            placeholder='enter Nama Owner'
                            value={formValue.namaowner}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="nohp"
                            placeholder='enter nohp'
                            value={formValue.nohp}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="date"
                            name="tanggalmasuk"
                            placeholder='enter tanggalmasuk'
                            value={formValue.password}
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

export default OwnerEdit;
