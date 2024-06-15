import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListTrainer() {
    const [trainer, setTrainer] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7126/Trainer/GetTrainer');
        const data = await response.data;
        setTrainer(data);
        console.log(data);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nama',
            selector: row => row.nama,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Password',
            selector: row => row.password,
            sortable: true,
        },
        {
            name: 'Nomor',
            selector: row => row.nohp,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <Link to={'/trainer_edit/'+row.id} className='btn btn-primary'>Edit</Link>,
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => <Link to={'/trainer_delete/'+row.id} className='btn btn-danger'>Delete</Link>,
            sortable: true,
        },
    ];

    return (
        <div className='card'>
            <div className='container'>
                <div className='Titel'>
                    Data Trainer
                </div>
                <div className='content'>
                    <h2>Trainer</h2>
                    <Link to='/trainer_add' className='btn btn-primary'>+ Tambah Trainer</Link>
                    <DataTable
                        columns={columns}
                        data={trainer.data}
                        pagination
                    />
                </div>
            </div>
        </div>
    )
}
export default ListTrainer;