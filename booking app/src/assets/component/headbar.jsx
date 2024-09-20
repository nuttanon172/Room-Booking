import React from 'react';

import './cs/style.css'
import './cs/bootstrap.min.css'
import mut from'./pic/LOGO-Mut-New-03-corp.png'
function Header() {

    return (
        <header className="container py-3 mb-3 border-bottom">
          <div className="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 2fr' }}>
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={mut} alt="Logo" />
              </a>
            </div>
          </div>
        </header>
      );
    }

export default Header;
