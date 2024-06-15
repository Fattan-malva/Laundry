import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnitAdd() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        idpelanggan: '',
        berat: '',
        namabarang: ''
    });

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleSubnit = async() => {
        const FormDataInput = new FormData();
        FormDataInput.append('id', formValue.id);
        FormDataInput.append('namaowner', formValue.idpelanggan);
        FormDataInput.append('nohp', formValue.berat);
        FormDataInput.append('tanggalmasuk', formValue.namabarang);
        alert('Data Berhasil Disimpan');
        navigate('/listunit');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7221/unit/GetPostUnits',
                data: FormDataInput,
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
                    Tambah Data Unit
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Unit'
                            value={formValue.id}
                            required
                            onChange={handleChange}
                        /><br/><br/>
                        <input
                            type="text"
                            name="idpelanggan"
                            placeholder='enter Id Pelanggan'
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

export default UnitAdd;