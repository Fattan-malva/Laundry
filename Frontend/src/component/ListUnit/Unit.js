import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function ListUnit() {
    const [unit, setUnit] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7221/unit/GetAllUnits');
        const data = await response.data;
        setUnit(data);
        console.log(data);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Id Pelanggan',
            selector: row => row.idpelanggan,
            sortable: true,
        },
        {
            name: 'Berat',
            selector: row => row.berat,
            sortable: true,
        },
        {
            name: 'Nama Barang',
            selector: row => row.namabarang,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <Link to={'/unit_update/'+row.id} className='btn btn-primary'>Edit</Link>,
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => <Link to={'/unit_delete/'+row.id} className='btn btn-danger'>Delete</Link>,
            sortable: true,
        },
    ];

    return (
        <div className='card'>
            <div className='container'>
                <div className='Titel'>
                    Data Unit
                </div>
                <div className='content'>
                    <h2>Unit</h2>
                    <Link to='/unit_add' className='btn btn-primary'>+ Tambah Unit</Link>
                    <DataTable
                        columns={columns}
                        data={unit.data}
                        pagination
                    />
                </div>
            </div>
        </div>
    )
}
export default ListUnit;