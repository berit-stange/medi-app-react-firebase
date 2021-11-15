import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
// import MainPage from './MainPage';
import DayView from './DayView';
import MedicationList from './MedicationList';
import BloodPressureContainer from './BloodPressureContainer';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleLogin from './GoogleLogin';
// import MainPage from './MainPage';
// import BloodPressureContainer from './BloodPressureContainer';

// import { useState, useEffect } from "react";
import "./App.css";

function App() {

  // Google Login
  const [user] = useAuthState(auth);

  return (
    // user ? <MainPage /> : <GoogleLogin />
    // user ? <BloodPressureContainer /> : <GoogleLogin />
    user ?

      <BrowserRouter >
        <div className="welcome">
          Hallo {auth.currentUser.email}!
        </div>
        <Navigation />

        <Routes basename="medication-counter-app-react">
          <Route exact path="/" element={<DayView />} />
          <Route exact path="medication-list" element={<MedicationList />} />
          <Route exact path="blood-pressure" element={<BloodPressureContainer />} />
        </Routes>

      </BrowserRouter>
      : <GoogleLogin />
  );
}

export default App;
