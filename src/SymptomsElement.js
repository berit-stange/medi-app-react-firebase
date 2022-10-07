import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import BloodPressureModal from './BloodPressureModal';


const SymptomsElement = ({ symptoms }) => {

    const [editActive, setEditActive] = useState("false");
    const [intensity, setSymptomIntensity] = useState("");
    const [description, setSymptomDescription] = useState("");
    const [symptom, setSymptom] = useState([]);
    const [time, setBloodPressureTime] = useState("");

    const deleteSymptom = async (id) => {
        const symptomsDoc = doc(db, "symptoms", id);
        await deleteDoc(symptomsDoc);
    };

    const selectSymptom = () => {
        setEditActive(true);
        setSymptomIntensity(symptoms.intensity);
        setSymptomDescription(symptoms.description);
        setBloodPressureTime(symptoms.time);
        console.log("selectSymptom: " + symptoms.description);
    }

    const updateSymptom = async (click, id) => {
        click.preventDefault();
        const symptomsDoc = doc(db, "symptoms", id);
        await updateDoc(symptomsDoc, {
            time: time,
            intensity: intensity,
            description: description
        });
        setEditActive(false);
    };


    return (
        <div key={symptoms.id} className="medi-list-item">
            <div>
                <p>{symptoms.time.toString()}</p>
                <p>{symptoms.description}</p>
                <p>{symptoms.intensity} / 10</p>
            </div>

            <div className="list-element-btn-box">
                <button onClick={() => setSymptom()} >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>

            {
                editActive === true &&
                <BloodPressureModal
                    symptom={symptom}
                    setEditActive={setEditActive}
                    setSymptomIntensity={setSymptomIntensity}
                    intensity={intensity}
                    setSymptomDescription={setSymptomDescription}
                    description={description}
                    setBloodPressureTime={setBloodPressureTime}
                    time={time}
                    updateSymptom={updateSymptom}
                    deleteSymptom={deleteSymptom}
                />
            }

        </div>
    );

}

export default SymptomsElement; 