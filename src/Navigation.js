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
                    <Link to="medi-app-react-firebase/blood-pressure">
                        <li>Blutdruck</li>
                    </Link>
                    <Link to="medi-app-react-firebase/medication-list">
                        <li>Medis</li>
                    </Link>
                    <Link to="medi-app-react-firebase/today">
                        <li>Heute</li>
                    </Link>
                </ul>

            </div>

        </div>
    );
}

export default Navigation;
