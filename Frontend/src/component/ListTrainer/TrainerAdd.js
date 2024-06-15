import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrainerAdd() {
    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        id: '',
        nama: '',
        email: '',
        password: '',
        nohp: '',
        status: ''
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
        FormDataInput.append('nama', formValue.nama);
        FormDataInput.append('email', formValue.email);
        FormDataInput.append('password', formValue.password);
        FormDataInput.append('nohp', formValue.nohp);
        FormDataInput.append('status', formValue.status);
        alert('Data Berhasil Disimpan');
        navigate('/listtrainer');
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://localhost:7126/Trainer/AddTrainer',
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
                    Tambah Data Trainer
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

export default TrainerAdd;