import React from 'react';
// import Navigation from './Navigation';
import BloodPressureInput from './BloodPressureInput';

const DayView = () => {

    // DATE
    // const date = new Date();
    // const month = new Array();
    // month[0] = "Januar";
    // month[1] = "Februar";
    // month[2] = "März";
    // month[3] = "April";
    // month[4] = "Mai";
    // month[5] = "Juni";
    // month[6] = "Juli";
    // month[7] = "August";
    // month[8] = "September";
    // month[9] = "Oktober";
    // month[10] = "November";
    // month[11] = "Dezember";
    // let nameOfMonth = month[date.getMonth()];
    // const displayTodaysDate = date.getDate() + '. ' + nameOfMonth + ' ' + date.getFullYear();

    return (

        <div className="day-container">
            {/* <h1>{displayTodaysDate}</h1> */}
            <BloodPressureInput />
        </div>

    );
}

export default DayView;