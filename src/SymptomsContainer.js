import React from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase-config";
import SymptomsElement from './SymptomsElement';

import {
    collection,
    getDocs,
    addDoc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const SymptomsContainer = () => {

    const [user] = useAuthState(auth);
    const [intensity, setSymptomIntensity] = useState("");
    const [description, setSymptomDescription] = useState("");
    const [symptoms, setSymptoms] = useState([]);
    const symptomsCollectionRef = useRef(collection(db, "symptoms"));


    const addSymptom = async (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(symptomsCollectionRef.current, {
            intensity: intensity,
            description: description,
            time: date,
            timestamp: dateSorting,
            uid: user.uid
        });
        setSymptomIntensity("");
        setSymptomDescription("");
    };


    useEffect(() => {
        const q = query(symptomsCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setSymptoms(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        return onSnapshot(q, symptomsCollectionRef.current, handleSnapshot)
    }, [user.uid, symptomsCollectionRef]);



    return (
        <div className="blood-pressure-input-box">
            <h2>Symptom hinzufügen</h2>
            <div className="blood-pressure-input">
                <div className="blood-pressure-values">
                    <input
                        placeholder="description"
                        value={description}
                        onChange={(event) => {
                            setSymptomDescription(event.target.value);
                        }}
                    />
                </div>
                <div className="blood-pressure-comment">
                    <input
                        placeholder="intensity"
                        value={intensity}
                        onChange={(event) => {
                            setSymptomIntensity(event.target.value);
                        }}
                    />
                    <div className="btn-bp">
                        <button className="btn-add-bp" onClick={addSymptom} >+</button>
                    </div>
                </div>
            </div>


            <div className="blood-pressure-list">
                <h2>Aufzeichnung Symptome</h2>
                {symptoms
                    .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                    .map((symptoms) => {
                        return (

                            <div key={symptoms.id}  >
                                <SymptomsElement
                                    symptoms={symptoms}
                                />
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
}

export default SymptomsContainer;