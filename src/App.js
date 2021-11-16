import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
// import MainPage from './MainPage';
import DayView from './DayView';
import MedicationList from './MedicationList';
import BloodPressureContainer from './BloodPressureContainer';
// import { BloodPressureContainerClassComp } from './BloodPressureContainerClassComp';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleLogin from './GoogleLogin';
import MainPage from './MainPage';

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

        <Routes >
          {/* <Routes basename="medication-counter-app-react"> */}
          <Route exact path="medi-app-react-firebase" element={<MainPage />} />
          <Route exact path="medi-app-react-firebase/today" element={<DayView />} />
          <Route exact path="medi-app-react-firebase/medication-list" element={<MedicationList />} />
          <Route exact path="medi-app-react-firebase/blood-pressure" element={<BloodPressureContainer />} />
          {/* <Route exact path="medi-app-react-firebase/blood-pressure" element={<BloodPressureContainerClassComp />} /> */}
        </Routes>

      </BrowserRouter>
      : <GoogleLogin />
  );
}

export default App;
