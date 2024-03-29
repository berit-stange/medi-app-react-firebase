import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import SymptomsModal from './SymptomsModal';


const SymptomsElement = ({ symptoms }) => {

    const [editActive, setEditActive] = useState("false");
    const [intensity, setSymptomIntensity] = useState("");
    const [description, setSymptomDescription] = useState("");
    // const [symptom, setSymptom] = useState([]);
    const [time, setSymptomTime] = useState("");

    const deleteSymptom = async (id) => {
        const symptomsDoc = doc(db, "symptoms", id);
        await deleteDoc(symptomsDoc);
    };

    const selectSymptom = () => {
        setEditActive(true);
        setSymptomIntensity(symptoms.intensity);
        setSymptomDescription(symptoms.description);
        setSymptomTime(symptoms.time);
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
                <p>Intensität: {symptoms.intensity} / 10</p>
            </div>

            <div className="list-element-btn-box">
                <button onClick={() => selectSymptom()} >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>

            {
                editActive === true &&
                <SymptomsModal
                    symptoms={symptoms}
                    setEditActive={setEditActive}
                    setSymptomIntensity={setSymptomIntensity}
                    intensity={intensity}
                    setSymptomDescription={setSymptomDescription}
                    description={description}
                    setSymptomTime={setSymptomTime}
                    time={time}
                    updateSymptom={updateSymptom}
                    deleteSymptom={deleteSymptom}
                />
            }

        </div>
    );

}

export default SymptomsElement; 