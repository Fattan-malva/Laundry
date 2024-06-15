import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UnitEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        id: '',
        idpelanggan: '',
        berat: '',
        namabarang: ''
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7221/unit/GetUnitById?id='+id);
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
        navigate('/listunit');
        try {
            const response = await axios({
                method: 'PUT',
                url: 'https://localhost:7221/unit/GetUpdateUnit?id='+id,
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
                    Edit Data unit "{formValue.id}"
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Unit'
                            value={formValue.id}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="idpelanggan"
                            placeholder='enter id pelanggan'
                            value={formValue.idpelanggan}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="berat"
                            placeholder='enter berat'
                            value={formValue.berat}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="date"
                            name="namabarang"
                            placeholder='enter nama barang'
                            value={formValue.namabarang}
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

export default UnitEdit;
