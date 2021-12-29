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

    const [settings, setSettings] = useState([]);
    const [title, setSettingsTitle] = useState("");
    const [unit, setSettingsUnit] = useState("");
    const [dose, setSettingsDose] = useState("");
    const settingsCollectionRef = useRef(collection(db, "settings"));


    const addSetting = async (e) => {
        e.preventDefault();
        await addDoc(settingsCollectionRef.current, {
            unit: unit,
            dose: dose,
            title: title,
            uid: user.uid
        });
        setSettingsTitle("");
        setSettingsUnit("");
        setSettingsDose("");
    };


    const deleteSettings = async (id) => {
        const settingsDoc = doc(db, "settings", id);
        await deleteDoc(settingsDoc);
    };


    useEffect(() => {
        const q = query(settingsCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setSettings(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("useEffect ok");
        return onSnapshot(q, settingsCollectionRef.current, handleSnapshot)
    }, [user.uid, settingsCollectionRef]);



    return (

        <div className="blood-pressure-input-box">



            <div className="blood-pressure-input">
                <h2>Einstellungen</h2>
                <div className="blood-pressure-comment">
                    <input
                        placeholder="title"
                        value={title}
                        onChange={(event) => {
                            setSettingsTitle(event.target.value);
                        }}
                    />
                    <div className="btn-bp">
                        <button className="btn-add-bp" onClick={addSetting} >+</button>
                    </div>
                </div>

                <div className="blood-pressure-values">
                    <input
                        placeholder="dose"
                        value={dose}
                        onChange={(event) => {
                            setSettingsDose(event.target.value);
                        }}
                    />
                    <input
                        placeholder="unit"
                        value={unit}
                        onChange={(event) => {
                            setSettingsUnit(event.target.value);
                        }}
                    />
                </div>

            </div>



            <div className="medi-list">
                <h2>Sammlung</h2>
                {settings
                    .sort((a, b) => a.title < b.title ? -1 : 1)
                    .map((settings) => {
                        return (
                            <div className="medi-list-item" key={settings.id}>
                                <div>
                                    <p>{settings.title} - {settings.dose} {settings.unit}</p>
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
            </div>


            <div className="medi-list">
                <h2>Elemente</h2>
                {settings
                    .sort((a, b) => a.title < b.title ? -1 : 1)
                    .map((settings) => {
                        return (
                            <div className="medi-values">
                                <p className="medi-title">{settings.title} - {settings.dose} {settings.unit}</p>
                                <div>
                                    <button className="btn-add-dose" /* onClick={addCalcium1} */ >{settings.dose}</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>


        </div>


    );
}

export default UserSettings;