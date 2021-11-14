import React from 'react';
import { auth, provider } from './firebase';

// import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// const aut = getAuth();
// var id_token = googleUser.getAuthResponse().id_token

const GoogleLogin = () => {

    // Sign in with google
    const signin = () => {
        auth.signInWithPopup(provider)
            .catch(alert);
    }


    return (
        <div>
            <center>
                <h1>Medi App</h1>

                <button className="btn-login"
                    onClick={signin}>
                    Log in with Google
                </button>

            </center>
        </div>
    );
}

export default GoogleLogin;