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


const UserSettings = () => {

    const [user] = useAuthState(auth);

    const [settings, setElements] = useState([]);
    const [title, setElementTitle] = useState("");
    const [unit, setElementUnit] = useState("");
    const [dose, setElementDose] = useState("");
    const settingsCollectionRef = useRef(collection(db, "settings"));

    const [medication, setMedication] = useState([]);
    const mediCollectionRef = useRef(collection(db, "medication"));

    const addElement = async (e) => {
        e.preventDefault();
        await addDoc(settingsCollectionRef.current, {
            unit: unit,
            dose: dose,
            title: title,
            uid: user.uid
        });
        setElementTitle("");
        setElementUnit("");
        setElementDose("");
    };

    const deleteSettings = async (id) => {
        const settingsDoc = doc(db, "settings", id);
        await deleteDoc(settingsDoc);
    };

    const addMedi = async (id, title) => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const settingsRef = doc(db, "settings", id);
        // https://firebase.google.com/docs/firestore/query-data/get-data

        await addDoc(mediCollectionRef.current, {
            title: settingsRef.title,
            // title: "...",
            comment: "dose",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid,
            typeId: settingsRef.id
        });
    }

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

            <div className="blood-pressure-input">
                <h2>Add new Element</h2>
                <div className="blood-pressure-comment">
                    <input
                        placeholder="title"
                        value={title}
                        onChange={(event) => {
                            setElementTitle(event.target.value);
                        }}
                    />
                    <div className="btn-bp">
                        <button className="btn-add-bp" onClick={addElement} >+</button>
                    </div>
                </div>

                <div className="blood-pressure-values">
                    <input
                        placeholder="dose"
                        value={dose}
                        onChange={(event) => {
                            setElementDose(event.target.value);
                        }}
                    />
                    <input
                        placeholder="unit"
                        value={unit}
                        onChange={(event) => {
                            setElementUnit(event.target.value);
                        }}
                    />
                </div>

            </div>



            <div className="medi-list">
                <h2>Elemente</h2>
                {settings
                    .sort((a, b) => a.title < b.title ? -1 : 1)
                    .map((settings) => {
                        return (
                            <div className="medi-values" key={settings.id}>
                                <p className="medi-title">{settings.title} - {settings.dose} {settings.unit}- {settings.id}</p>

                                <div>
                                    <button
                                        className="btn-add-dose"
                                        // onClick={() => { addMedi(settings.id); }}>
                                        onClick={() => { addMedi(settings.id, settings.title); }}>
                                        {settings.dose}
                                    </button>
                                </div>

                                <div className="btn-box btn-med-delete">
                                    <button>
                                        <span className="material-icons-round">settings</span>
                                    </button>
                                    <button onClick={() => { deleteSettings(settings.id); }} >
                                        <span className="material-icons-round">
                                            delete
                                        </span>
                                    </button>

                                </div>
                            </div>

                        );
                    })
                }


                <div className="medi-list">
                    <h2>Aufzeichnung</h2>

                    {medication
                        .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                        // .filter((val) => { return (val.title.toLowerCase().includes(searchTerm.toLowerCase())) })
                        .map((medication) => {
                            return (
                                <div className="medi-list-item" key={medication.id}>
                                    <div>
                                        <p>{medication.time.toString()} - title: {medication.title} - typeId: {medication.typeId}</p>
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


        </div>


    );
}

export default UserSettings;