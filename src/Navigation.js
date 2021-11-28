import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from './firebase';
import "./App.css";

function Navigation() {

    // Signout function
    const logout = () => {
        auth.signOut();
    }


    return (
        <div>

            <div className="nav-container">

                <div>
                    <button className="btn-logout" onClick={logout}>Logout</button>
                </div>

                <ul>
                    <Link to="/blood-pressure">
                        <li>Blutdruck</li>
                    </Link>
                    <Link to="/medication">
                        <li>Medis</li>
                    </Link>
                    <Link to="/blood-pressure-func">
                        <li>BP-Func</li>
                    </Link>
                </ul>

            </div>

        </div>
    );
}

export default Navigation;
