import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="Titel">
                        Profile
                    </div>
                    <div className="content">
                        <b>Belajar React JS</b> <br />
                        Membuat Website Sederhana Dengan ReactJS
                    </div>
                    <div className='biodata'>
                        Biodata
                    </div>
                    <div className='isiBiodata'>
                        <table>
                            <tr>
                                <td>Nama</td>
                                <td className='paddingLeft'>:</td>
                                <td className='paddingLeft'>Indra Febry Setyawan</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td className='paddingLeft'>:</td>
                                <td className='paddingLeft'>Kediri, Jawa Timur</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td className='paddingLeft'>:</td>
                                <td className='paddingLeft'>indrafebryf@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Institusi Pendidikan Terakhir</td>
                                <td className='paddingLeft'>:</td>
                                <td className='paddingLeft'>SMK Negeri 1 Ngasem</td>
                            </tr>
                            <tr>
                                <td>Cita-Cita</td>
                                <td className='paddingLeft'>:</td>
                                <td className='paddingLeft'>Full Stack Web Development</td>
                            </tr>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default Profile;