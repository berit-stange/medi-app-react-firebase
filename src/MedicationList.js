import React from 'react';
import { useState, useEffect, useRef } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import MedicationElement from './MedicationElement';

import { db } from "./firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const MedicationList = () => {

    const [user] = useAuthState(auth);
    const [medication, setMedication] = useState([]);
    const mediCollectionRef = useRef(collection(db, "medication"));

    const settingsCollectionRef = useRef(collection(db, "settings"));
    const [searchTerm, setSearchTerm] = useState("");
    const [settings, setElements] = useState([]);


    const addMedi = async (id, settings) => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const settingsRef = doc(db, "settings", id);

        await addDoc(mediCollectionRef.current, {
            title: settings.title,
            dose: settings.dose,
            unit: settings.unit,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid,
            typeId: settingsRef.id
        });
    };


    useEffect(() => {
        const q = query(settingsCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setElements(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("get Settings ok");
        return onSnapshot(q, settingsCollectionRef.current, handleSnapshot)
    }, [user.uid, settingsCollectionRef]);


    useEffect(() => {
        const q = query(mediCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setMedication(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q)
            .then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, mediCollectionRef.current, handleSnapshot)
    }, [
        user.uid,
        mediCollectionRef
    ]);



    return (

        <div className="blood-pressure-input-box">

            <h2>Einnahme dokumentieren</h2>
            {settings
                .sort((a, b) => b.dose < a.dose ? 1 : -1)
                .sort((a, b) => a.title < b.title ? -1 : 1)
                .map((settings) => {
                    return (
                        <div className="medi-values" key={settings.id}>
                            <p className="medi-title">{settings.title} - {settings.dose} {settings.unit} </p>

                            <div>
                                <button
                                    className="btn-add-dose"
                                    onClick={() => { addMedi(settings.id, settings); }}>
                                    {settings.dose} {settings.unit}
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
                            <div key={medication.id}  >
                                <MedicationElement
                                    medi={medication}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
}

export default MedicationList;