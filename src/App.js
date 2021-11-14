import React from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleLogin from './GoogleLogin';
// import Mainpage from './MainPage';
import BloodPressureContainer from './BloodPressureContainer';

// import { useState, useEffect } from "react";
import "./App.css";

function App() {

  // Google Login
  const [user] = useAuthState(auth);


  return (
    // user ? <Mainpage /> : <GoogleLogin />
    user ? <BloodPressureContainer /> : <GoogleLogin />
  );
}

export default App;
