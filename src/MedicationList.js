import React from 'react';
import { useState, useEffect, useRef } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from "./firebase-config";

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const MedicationList = () => {

    const [user] = useAuthState(auth);
    const [medication, setMedication] = useState([]);
    const mediCollectionRef = useRef(collection(db, "medication"));
    const [searchTerm, setSearchTerm] = useState("");

    const [settings, setElements] = useState([]);
    const settingsCollectionRef = useRef(collection(db, "settings"));


    const addMedi = async (id, settings) => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const settingsRef = doc(db, "settings", id);

        await addDoc(mediCollectionRef.current, {
            title: settings.title,
            comment: settings.dose,
            unit: settings.unit,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid,
            typeId: settingsRef.id
        });
    };


    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    useEffect(() => {
        const q = query(settingsCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setElements(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, settingsCollectionRef.current, handleSnapshot)
    }, [user.uid, settingsCollectionRef]);


    useEffect(() => {
        const q = query(mediCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setMedication(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, mediCollectionRef.current, handleSnapshot)
    }, [user.uid, mediCollectionRef]);


    return (

        <div className="blood-pressure-input-box">

            <h2>Einnahme dokumentieren</h2>
            {settings
                .sort((a, b) => a.title < b.title ? -1 : 1)
                .map((settings) => {
                    return (
                        <div className="medi-values" key={settings.id}>
                            <p className="medi-title">{settings.title} - {settings.dose} {settings.unit} </p>

                            <div>
                                <button
                                    className="btn-add-dose"
                                    onClick={() => { addMedi(settings.id, settings); }}>
                                    {settings.dose}
                                </button>
                            </div>
                        </div>

                    );
                })
            }


            <div className="medi-list">
                <h2>Aufzeichnung</h2>

                <div className="search-box">
                    <input
                        type="search-input"
                        placeholder="Suche"
                        onChange={(event) => { setSearchTerm(event.target.value); }}
                        aria-label="Suche" />
                </div>


                {medication
                    .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                    .filter((val) => { return (val.title.toLowerCase().includes(searchTerm.toLowerCase())) })
                    .map((medication) => {
                        return (
                            <div className="medi-list-item" key={medication.id}>
                                <div>
                                    <p>{medication.time.toString()} - {medication.title} - {medication.comment}</p>
                                </div>

                                <div className="btn-box btn-med-delete">
                                    <button onClick={() => { deleteMedication(medication.id); }} >
                                        <span className="material-icons-round">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>


    );
}

export default MedicationList;