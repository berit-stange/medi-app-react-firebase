import React from 'react';
import { useState, useEffect } from "react";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// import { auth } from './firebase';
import { db } from "./firebase-config";

import {
    collection,
    getDocs, //stattdessen query
    addDoc,
    // updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    // orderBy,
    query,
    where
} from "firebase/firestore";


const MedicationList = () => {

    const [user] = useAuthState(auth);
    // const [title] = useState("");
    // const [body] = useState("");
    const [comment, setComment] = useState("");
    const [medication, setMedication] = useState([]);
    const mediCollectionRef = collection(db, "medication");

    // const createMedi = async () => {
    //     const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
    //     await addDoc(mediCollectionRef, {
    //         title: title,
    //         body: body,
    //         time: date
    //     });
    // };

    const addAxi = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef, {
            title: "Axitinib",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        // window.open('/medication', '_self');
    };

    const addNovo = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef, {
            title: "Novaminsulfon",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        // window.open('/medication', '_self');
    }

    const addPara = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef, {
            title: "Paracethamol",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        // window.open('/medication', '_self');
    }

    const addTrama = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef, {
            title: "Tramadol",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        // window.open('/medication', '_self');
    }

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    // useEffect(() => {
    //     const getMedication = async () => {
    //         const mediCollectionRef = collection(db, "medication");
    //         const data = await getDocs(mediCollectionRef);
    //         setMedication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getMedication();
    // }, []);

    // useEffect(() => {
    //     const getMedication = async () => {
    //         const mediCollectionRef = collection(db, "medication");
    //         const data = await getDocs(mediCollectionRef);
    //         setMedication(data.docs
    //             .map((doc) => ({ ...doc.data(), id: doc.id }))
    //             .sort((a, b) => a.title > b.title ? 1 : -1)
    //         );
    //     };
    //     getMedication();
    // }, [
    //     user,
    //     mediCollectionRef
    // ]);

    // useEffect(() => {
    //     const mediCollectionRef = collection(db, "medication");
    //     const q = query(mediCollectionRef, orderBy("time", "asc"));
    //     const unsub = onSnapshot(q, (snapshot) =>
    //         setMedication(snapshot.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id
    //         })))
    //     );
    //     return unsub;
    // }, []);

    useEffect(() => {
        const q = query(mediCollectionRef, where("uid", "==", user.uid));
        const handleSnapshot = (snapshot) => {
            setMedication(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getDocs(q).then(handleSnapshot);
        console.log("ok");
        return onSnapshot(q, mediCollectionRef, handleSnapshot)
    }, [user.uid]);

    return (

        <div>
            <div>
                <div className="blood-pressure-input-box">
                    <div className="blood-pressure-input">
                        {/* <div className="blood-pressure-values">
                            <input
                                placeholder="Medikament..."
                                onChange={(event) => {
                                    setNewTitle(event.target.value);
                                }}
                            />
                            <input
                                // type="number"
                                placeholder="Dosierung"
                                onChange={(event) => {
                                    setNewBody(event.target.value);
                                }}
                            />
                        </div>
                        <div className="btn-box">
                            <button className="btn-add-med" onClick={createMedi}>+</button>
                        </div> */}


                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Axi</p>
                                <input
                                    placeholder="dose / comment"
                                    onChange={(event) => {
                                        setComment(event.target.value);
                                    }}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={addAxi} >+</button>
                                </div>
                            </div>
                        </div>

                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Novo</p>
                                <input
                                    placeholder="dose / comment"
                                    onChange={(event) => {
                                        setComment(event.target.value);
                                    }}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={addNovo} >+</button>
                                </div>
                            </div>
                        </div>

                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Para</p>
                                <input
                                    placeholder="dose / comment"
                                    onChange={(event) => {
                                        setComment(event.target.value);
                                    }}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={addPara} >+</button>
                                </div>
                            </div>
                        </div>

                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Trama</p>
                                <input
                                    placeholder="dose / comment"
                                    onChange={(event) => {
                                        setComment(event.target.value);
                                    }}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={addTrama} >+</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div>
                        <h2>Medi List</h2>
                        {medication.map((medication) => {
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