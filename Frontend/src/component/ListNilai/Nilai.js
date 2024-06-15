import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListNilai() {
    const [nilai, setNilai] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('https://localhost:7126/Nilai/GetNilai');
        const data = await response.data;
        setNilai(data);
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
            name: 'Kelas',
            selector: row => row.kelas,
            sortable: true,
        },
        {
            name: 'Mata Pelajaran',
            selector: row => row.mapel,
            sortable: true,
        },
        {
            name: 'Nilai',
            selector: row => row.nilai,
            sortable: true,
        },
        {
            name: 'Indeks',
            selector: row => row.indeks,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <Link to={'/nilai_edit/'+row.id} className='btn btn-primary'>Edit</Link>,
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => <Link to={'/nilai_delete/'+row.id} className='btn btn-danger'>Delete</Link>,
            sortable: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                marginTop: '10px',
                fontWeight: 'bold',
                fontSize: '18px',
                backgroundColor: '#f69d49',
                color: '#fff',
                boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 1)',
            },
        },
        cells: {
            style: {
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#f1f8e9',
                boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 1)',
            },
        },
        rows: {
            style: {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f9fbe7',
                },
            },
        },
    };

    return (
        <div className='card'>
            <div className='container'>
                <div className='Titel'>
                    Data Nilai Siswa
                </div>
                <div className='content'>
                    <h2>Nilai Siswa</h2>
                    <Link to='/nilai_add' className='btn btn-primary'>+ Tambah Trainer</Link>
                    <DataTable
                        columns={columns}
                        data={nilai.data}
                        pagination
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </div>
    )
}
export default ListNilai;