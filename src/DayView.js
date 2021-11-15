import React from 'react';
// import Navigation from './Navigation';
import BloodPressureInput from './BloodPressureInput';

const DayView = () => {

    return (

        <div className="day-container">
            <h1>Heute</h1>
            <BloodPressureInput />
        </div>

    );
}

export default DayView;