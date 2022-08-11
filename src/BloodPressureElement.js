import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import BloodPressureModal from './BloodPressureModal';


const BloodPressureElement = ({ bloodPressure }) => {

    const [editActive, setEditActive] = useState("false");
    const [value1, setBloodPressureValue1] = useState("");
    const [value2, setBloodPressureValue2] = useState("");
    const [comment, setBloodPressureComment] = useState("");
    const [time, setBloodPressureTime] = useState("");

    const deleteBloodPressure = async (id) => {
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureDoc);
    };

    const selectBloodPressure = () => {
        setEditActive(true);
        setBloodPressureValue1(bloodPressure.value1);
        setBloodPressureValue2(bloodPressure.value2);
        setBloodPressureComment(bloodPressure.comment);
        setBloodPressureTime(bloodPressure.time);
        console.log("selectMedi: " + bloodPressure.value1);
    }

    const updateBloodPressure = async (click, id) => {
        click.preventDefault();
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await updateDoc(bloodPressureDoc, {
            time: time,
            value2: value2,
            value1: value1,
            comment: comment
        });
        setEditActive(false);
    };


    return (
        <div key={bloodPressure.id} className="medi-list-item">
            <div>
                <p>{bloodPressure.time.toString()}</p>
                <p>{bloodPressure.value1} / {bloodPressure.value2}</p>
                <p>{bloodPressure.comment}</p>
            </div>

            <div className="list-element-btn-box">
                <button onClick={() => selectBloodPressure()} >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>

            {
                editActive === true &&
                <BloodPressureModal
                    bloodPressure={bloodPressure}
                    setEditActive={setEditActive}
                    setBloodPressureValue1={setBloodPressureValue1}
                    value1={value1}
                    setBloodPressureValue2={setBloodPressureValue2}
                    value2={value2}
                    setBloodPressureComment={setBloodPressureComment}
                    comment={comment}
                    setBloodPressureTime={setBloodPressureTime}
                    time={time}
                    updateBloodPressure={updateBloodPressure}
                    deleteBloodPressure={deleteBloodPressure}
                />
            }

        </div>
    );

}

export default BloodPressureElement; 