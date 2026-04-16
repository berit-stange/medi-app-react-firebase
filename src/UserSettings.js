import React from 'react';
import { useState, useEffect, useRef } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserSettingsElement from './UserSettingsElement';

import { db } from "./firebase-config";

import {
    addDoc,
    collection,
    getDocs,
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

    useEffect(() => {
        const q = query(settingsCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setElements(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, settingsCollectionRef.current, handleSnapshot)
    }, [user.uid, settingsCollectionRef]);


    return (

        <div className="blood-pressure-input-box">
            <div className="blood-pressure-input">
                <h2>Element hinzufügen</h2>
                <div className="blood-pressure-comment">
                    <input
                        placeholder="Titel"
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
                        placeholder="Menge"
                        value={dose}
                        onChange={(event) => {
                            setElementDose(event.target.value);
                        }}
                    />
                    <input
                        placeholder="Einheit"
                        value={unit}
                        onChange={(event) => {
                            setElementUnit(event.target.value);
                        }}
                    />
                </div>
            </div>


            <div className="medi-list">
                <h2>Medikamente bearbeiten</h2>
                {settings
                    .sort((a, b) => b.dose < a.dose ? 1 : -1)
                    .sort((a, b) => a.title < b.title ? -1 : 1)
                    .map((settings) => {
                        return (
                            <div key={settings.id}  >
                                <UserSettingsElement
                                    settings={settings}
                                />
                            </div>
                        );
                    })
                }

            </div>

        </div>


    );
}

export default UserSettings;