import React from 'react';
import { useState, useEffect, useRef } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// import { auth } from './firebase';
import { db } from "./firebase-config";

import {
    collection,
    getDocs, //stattdessen query
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


    const addAmlo1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Amlodipin",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    };

    const addAmlo2 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Amlodipin",
            comment: "2",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    };

    const addAxi1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Axitinib",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    };

    const addNovo1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Novaminsulfon",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addNovo2 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Novaminsulfon",
            comment: "2",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addPara1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Paracethamol",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addPara2 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Paracethamol",
            comment: "2",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addTrama1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Tramadol",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addTrama2 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Tramadol",
            comment: "2",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };



    useEffect(() => {
        const q = query(mediCollectionRef.current, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setMedication(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("ok");
        return onSnapshot(q, mediCollectionRef.current, handleSnapshot)
    }, [user.uid, mediCollectionRef]);

    return (

        <div>
            <div>
                <div className="blood-pressure-input-box">
                    <div className="blood-pressure-input">


                        <div className="medi-values">
                            <p className="medi-title">Amlodipin</p>
                            <div className="btn-med-box">
                                <button className="btn-add-dose" onClick={addAmlo1} >1</button>
                            </div>
                            <div className="btn-med-box">
                                <button className="btn-add-dose" onClick={addAmlo2} >2</button>
                            </div>
                        </div>

                        <div className="medi-values">
                            <p className="medi-title">Axitinib</p>
                            <div className="btn-med-box">
                                <button className="btn-add-dose" onClick={addAxi1} >1</button>
                            </div>
                        </div>

                        <div className="medi-values">
                            <p className="medi-title">Novalgin</p>
                            <div>
                                <button className="btn-add-dose" onClick={addNovo1} >1</button>
                            </div>
                            <div>
                                <button className="btn-add-dose" onClick={addNovo2} >2</button>
                            </div>
                        </div>

                        <div className="medi-values">
                            <p className="medi-title">Paracetamol</p>
                            <div>
                                <button className="btn-add-dose" onClick={addPara1} >1</button>
                            </div>
                            <div>
                                <button className="btn-add-dose" onClick={addPara2} >2</button>
                            </div>
                        </div>

                        <div className="medi-values">
                            <p className="medi-title">Tramadol</p>
                            <div>
                                <button className="btn-add-dose" onClick={addTrama1} >1</button>
                            </div>
                            <div>
                                <button className="btn-add-dose" onClick={addTrama2} >2</button>
                            </div>
                        </div>

                    </div>


                    <div>
                        <h2>Medi List</h2>
                        {medication
                            .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                            .map((medication) => {
                                return (
                                    <div className="medi-list-item" key={medication.id}>
                                        <div>
                                            <p>{medication.time.toString()}</p>
                                            <p>{medication.title} - {medication.comment}</p>
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
                            })}
                    </div>
                </div>
            </div>
        </div>


    );
}

export default MedicationList;