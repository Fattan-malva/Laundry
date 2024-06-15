import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OwnerAdd() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        namaowner: '',
        nohp: '',
        tanggalmasuk: ''
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
        FormDataInput.append('namaowner', formValue.namaowner);
        FormDataInput.append('nohp', formValue.nohp);
        FormDataInput.append('tanggalmasuk', formValue.tanggalmasuk);
        alert('Data Berhasil Disimpan');
        navigate('/listowner');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7221/owner/GetPostOwners',
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
                    Tambah Data Owner
                </div>
                <div className='content'>
                    <form onSubmit={handleSubnit}>
                        <input
                            type="text"
                            name="id"
                            placeholder='Id Owner'
                            value={formValue.id}
                            required
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

export default OwnerAdd;