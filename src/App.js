import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
// import MainPage from './MainPage';
// import DayView from './DayView';
import MedicationList from './MedicationList';
import BloodPressureContainer from './BloodPressureContainer';
import UserSettings from './UserSettings';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleLogin from './GoogleLogin';


// import { useState, useEffect } from "react";
import "./App.css";

function App() {

  // Google Login
  const [user] = useAuthState(auth);

  return (

    user ?

      <BrowserRouter >
        <div className="welcome">
          Hallo {auth.currentUser.email}!
        </div>
        <Navigation />
        <Routes >
          <Route exact path="/" element={<MedicationList />} />
          <Route exact path="/medication" element={<MedicationList />} />
          <Route exact path="/blood-pressure" element={<BloodPressureContainer />} />
          <Route exact path="/settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>

      : <GoogleLogin />
  );
}

export default App;
