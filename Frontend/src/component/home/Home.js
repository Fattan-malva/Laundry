import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render () {
        return (
            <div className='card'>
               <div className='container'>
                    <div className='Titel'>
                        SD Ceria Anak Bangsa
                    </div>
                    <div className='content'>
                        Kelompok 5
                        <ul>
                            <li>Faidzah Mastadzul Mutiara Husnah</li>
                            <li>Hanny Khuril Aulia</li>
                            <li>Indra Febry Setyawan</li>
                            <li>M. Arofan Nurhadi</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;