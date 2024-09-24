import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import mut from '../pic/mut.png';

function Header() {
    return (
        <div className="container-fluid "style={{backgroundColor: '#49647C'}}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-1 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src={mut} className="navbar-brand"style={{width:'50%',height:'50%'}} alt="Logo" />
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Header;
