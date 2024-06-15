import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListPelajaran() {
const [Pelajaran, setPelajaran] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const response = await axios.get('https://localhost:7126/Pelajaran/GetPelajaran');
        const data = await response.data;
        setPelajaran(data);
        console.log(data);

        
    }
    
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Hari',
            selector: row => row.hari,
            sortable: true,
        },
        {
            name: 'Mata Pelajaran',
            selector: row => row.nama_pelajaran,
            sortable: true,
        },
        {
            name: 'Guru Pengampu',
            selector: row => row.nama_guru,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <Link to={'/pelajaran_edit/'+row.id} className='btn btn-primary'>Edit</Link>,
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => <Link to={'/pelajaran_delete/'+row.id} className='btn btn-danger'>Delete</Link>,
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
    
    const [param, setParam] = useState('')
    const [value, setValue] = useState('')
    
    const handleChange = (e) => {
        e.preventDefault()
        setParam(value)
    }
    
    const filteredData = Pelajaran?.data?.filter(d => d.hari === param) || 
    Pelajaran?.data?.filter(d => d.nama_pelajaran === param) || 
    Pelajaran?.data?.filter(d => d.nama_guru === param)
    
    return (
        <div className='card'>
            <div className='container'>
                <div className='Titel'>
                    Data Jadwal Pelajaran
                </div>
                <div className='content'>
                    <h2>Jadwal Pelajaran</h2>
                    <div className='search'>
                        {/* <input onChange={(e) => setValue(e.target.value)} placeholder='search mapel...' /> */}
                        <select onChange={(e) => setValue(e.target.value)}>
                            <option value=''>Pilih Hari</option>
                            <option value='Senin'>Senin</option>
                            <option value='Selasa'>Selasa</option>
                            <option value='Rabu'>Rabu</option>
                            <option value='Kamis'>Kamis</option>
                            <option value="Jum'at">Jum'at</option>
                        </select>
                        {/* <select onChange={(e) => setValue(e.target.value)}>
                            <option value=''>Pilih Guru</option>
                            <option value='Pak Saidi'>Pak Saidi</option>
                            <option value='Bu Muthe'>Bu Muthe</option>
                            <option value='Pak Fuad'>Pak Fuad</option>
                            <option value='Bu Lyn'>Bu Lyn</option>
                            <option value="Bu Siti">Bu Siti</option>
                        </select> */}
                        {/* <button onClick={() => console.log(filteredData)}>Search</button> */}
                        <button onClick={() => setParam(value)}>Search</button>
                    </div>
    
                    <Link to='/pelajaran_add' className='btn btn-primary'>+ Tambah Pelajaran</Link>
                    <DataTable
                        columns={columns}
                        data={filteredData?.length === 0 ? Pelajaran.data : filteredData}
                        pagination
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </div>
    )
}


export default ListPelajaran;