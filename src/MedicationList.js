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


    const addAmlo05 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Amlodipin",
            comment: "0.5",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    };

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

    // const addAxi1 = async () => {
    //     const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
    //     const dateSorting = new Date().toISOString();
    //     await addDoc(mediCollectionRef.current, {
    //         title: "Axitinib",
    //         comment: "1",
    //         time: dateDisplay,
    //         timestamp: dateSorting,
    //         uid: user.uid
    //     });
    // };

    const addNovo05 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Novaminsulfon",
            comment: "0.5",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

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

    const addPara05 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Paracethamol",
            comment: "0.5",
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

    const addMorphin05 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "MST",
            comment: "0.5",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addMorphin1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Morphin",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addMorphin2 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Morphin",
            comment: "2",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addSevredol1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Sevredol",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addZofran1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Zofran",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addManna1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Manna 30-60 ml",
            comment: "1",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addMovicol1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Movicol",
            comment: "1 Beutel",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addLaxans1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Laxans 15 Tropfen",
            comment: "15",
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
    }

    const addCalcium1 = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Calcium",
            comment: "1",
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
        console.log("useEffect ok");
        return onSnapshot(q, mediCollectionRef.current, handleSnapshot)
    }, [user.uid, mediCollectionRef]);


    return (

        <div className="blood-pressure-input-box">
            <div className="blood-pressure-input">
                <h2>Medikamente</h2>

                <div className="medi-values">
                    <p className="medi-title">Amlodipin</p>
                    <div className="btn-med-box">
                        <button className="btn-add-dose" onClick={addAmlo05} >0.5</button>
                    </div>
                    <div className="btn-med-box">
                        <button className="btn-add-dose" onClick={addAmlo1} >1</button>
                    </div>
                </div>

                {/* <div className="medi-values">
                    <p className="medi-title">Axitinib</p>
                    <div className="btn-med-box">
                        <button className="btn-add-dose" onClick={addAxi1} >1</button>
                    </div>
                </div> */}

                <div className="medi-values">
                    <p className="medi-title">Morphin</p>
                    <div>
                        <button className="btn-add-dose" onClick={addMorphin05} >0.5</button>
                    </div>
                    <div>
                        <button className="btn-add-dose" onClick={addMorphin1} >1</button>
                    </div>
                    <div>
                        <button className="btn-add-dose" onClick={addMorphin2} >2</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Novalgin</p>
                    <div>
                        <button className="btn-add-dose" onClick={addNovo05} >0.5</button>
                    </div>
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
                        <button className="btn-add-dose" onClick={addPara05} >0.5</button>
                    </div>
                    <div>
                        <button className="btn-add-dose" onClick={addPara1} >1</button>
                    </div>
                    <div>
                        <button className="btn-add-dose" onClick={addPara2} >2</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Sevredol</p>
                    <div>
                        <button className="btn-add-dose" onClick={addSevredol1} >1</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Zofran</p>
                    <div>
                        <button className="btn-add-dose" onClick={addZofran1} >1</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Manna</p>
                    <div>
                        <button className="btn-add-dose" onClick={addManna1} >1</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Movicol</p>
                    <div>
                        <button className="btn-add-dose" onClick={addMovicol1} >1</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Laxans</p>
                    <div>
                        <button className="btn-add-dose" onClick={addLaxans1} >1</button>
                    </div>
                </div>

                <div className="medi-values">
                    <p className="medi-title">Calcium</p>
                    <div>
                        <button className="btn-add-dose" onClick={addCalcium1} >1</button>
                    </div>
                </div>


            </div>


            <div className="medi-list">
                <h2>Aufzeichnung</h2>
                {medication
                    .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
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
                    })}
            </div>
        </div>


    );
}

export default MedicationList;