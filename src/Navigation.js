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
                    <Link to="blood-pressure">
                        <li>Blood Pressure</li>
                    </Link>
                    <Link to="medication-list">
                        <li>Medication</li>
                    </Link>
                    <Link to="/">
                        <li>Day</li>
                    </Link>
                </ul>
            </div>

            <div className="welcome">
                Welcome {auth.currentUser.email}!
            </div>

        </div>
    );
}

export default Navigation;
