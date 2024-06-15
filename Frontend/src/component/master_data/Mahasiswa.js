import React, { useState, useEffect } from 'react';
import './Mahasiswa.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataMahasiswa() {
    const [datamahasiswa, setDataMahasiswa] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7126/Mahasiswa/GetMahasiswa');
        const data = await response.data;
        setDataMahasiswa(data);
        console.log(data);
    }

    const columns = [
        {
            name: 'NIM',
            selector: row => row.mhs_nim,
            sortable: true,
        },
        {
            name: 'Nama',
            selector: row => row.mhs_nama,
            sortable: true,
        },
        {
            name: 'Ubah',
            selector: row => <Link to={'/datamahasiswa_edit/'+row.mhs_nim} className='btn btn-primary'>Edit</Link>,
            sortable: true,
        },
        {
            name: 'Hapus',
            selector: row => <Link to={'/datamahasiswa_delete/'+row.mhs_nim} className='btn btn-danger'>Delete</Link>,
            sortable: true,
        },
    ];

    return (
        <div className='card'>
            <div className='container'>
                <div className='Titel'>
                    Data Mahasiswa
                </div>
                <div className='content'>
                    <h2>Mahasiswa</h2>
                    <Link to='/datamahasiswa_add' className='btn btn-primary'>+ Data Mahasiswa</Link>
                    <DataTable
                        columns={columns}
                        data={datamahasiswa.data}
                        pagination
                    />
                </div>
            </div>
        </div>
    )
}
export default DataMahasiswa;