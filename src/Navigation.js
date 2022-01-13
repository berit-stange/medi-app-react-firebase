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
                        <li>Medikamente</li>
                    </Link>
                    <Link to="/settings">
                        <span className="material-icons-round">settings</span>
                    </Link>
                </ul>

            </div>

        </div>
    );
}

export default Navigation;
