import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UnitDelete() {
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
            console.error(error);
            alert('Data tidak ditemukan atau sudah dihapus!');
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const FormDataInput = new FormData();
        FormDataInput.append('id', formValue.id);
        FormDataInput.append('namaowner', formValue.idpelanggan);
        FormDataInput.append('nohp', formValue.berat);
        FormDataInput.append('tanggalmasuk', formValue.namabarang);
        alert('Data Berhasil Dihapus');
        navigate('/listunit');
        try {
            const response = await axios({
                method: "DELETE",
                url: "https://localhost:7221/unit/DeleteUnit?id="+id,
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
            window.location.reload();
        } catch(error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div className="card">
            <div className='container'>
                <div className='Titel'>
                    Delete Data unit "{formValue.id}"
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
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="berat"
                            placeholder='enter berat'
                            value={formValue.berat}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="date"
                            name="namabarang"
                            placeholder='enter nama barang'
                            value={formValue.namabarang}
                            disabled
                            onChange={handleChange}
                        /><br/><br/>
                        <button type="submit" className='btn btn-primary'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UnitDelete;