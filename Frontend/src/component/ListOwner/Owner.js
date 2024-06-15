import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListOwner() {
    const [owner, setOwner] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7221/owner/GetAllOwners');
        const data = await response.data;
        setOwner(data);
        console.log(data);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nama Owner',
            selector: row => row.namaowner,
            sortable: true,
        },
        {
            name: 'No. Hp',
            selector: row => row.nohp,
            sortable: true,
        },
        {
            name: 'Tanggal Masuk',
            selector: row => row.tanggalmasuk,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <Link to={'/owner_update/'+row.id} className='btn btn-primary'>Edit</Link>,
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => <Link to={'/owner_delete/'+row.id} className='btn btn-danger'>Delete</Link>,
            sortable: true,
        },
    ];

    return (
        <div className='card'>
            <div className='container'>
                <div className='Titel'>
                    Data Owner
                </div>
                <div className='content'>
                    <h2>Owner</h2>
                    <Link to='/owner_add' className='btn btn-primary'>+ Tambah Owner</Link>
                    <DataTable
                        columns={columns}
                        data={owner.data}
                        pagination
                    />
                </div>
            </div>
        </div>
    )
}
export default ListOwner;