import React from 'react';
import { /* auth, */ provider } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const GoogleLogin = () => {

    // Sign in with google
    // const signin = () => {
    //     auth.signInWithPopup(provider)
    //         .catch(alert);
    // }


    const auth = getAuth();

    const signin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                localStorage.setItem('token', token);
                localStorage.setItem('uid', user.uid);
            })
        // .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        // });
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