import React, { Component } from 'react';
import './Documentation.css';
import img from './documentation.jpg';

class Documentation extends Component {
    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="Titel">
                        Documentation
                    </div>
                    <div className="gambar">
                        <img src={img} alt='Documentation'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Documentation;