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
    const [commentAmlo, setCommentAmlo] = useState("");
    const [commentAxi, setCommentAxi] = useState("");
    const [commentNovo, setCommentNovo] = useState("");
    const [commentPara, setCommentPara] = useState("");
    const [commentTrama, setCommentTrama] = useState("");
    const [medication, setMedication] = useState([]);
    // const mediCollectionRef = collection(db, "medication");
    const mediCollectionRef = useRef(collection(db, "medication"));

    const addAmlo = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Amlodipin",
            comment: commentAmlo,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        setCommentAmlo("");
    };

    const addAxi = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Axitinib",
            comment: commentAxi,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        setCommentAxi("");
    };

    const addNovo = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Novaminsulfon",
            comment: commentNovo,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        setCommentNovo("");
    }

    const addPara = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Paracethamol",
            comment: commentPara,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        setCommentPara("");
    }

    const addTrama = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(mediCollectionRef.current, {
            title: "Tramadol",
            comment: commentTrama,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: user.uid
        });
        setCommentTrama("");
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
        // const q = query(mediCollectionRef, where("uid", "==", user.uid));
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

                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Amlo</p>
                                <input
                                    placeholder="dose / comment"
                                    value={commentAmlo}
                                    onChange={(event) => {
                                        setCommentAmlo(event.target.value);
                                    }}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={addAmlo} >+</button>
                                </div>
                            </div>
                        </div>

                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Axi</p>
                                <input
                                    placeholder="dose / comment"
                                    value={commentAxi}
                                    onChange={(event) => {
                                        setCommentAxi(event.target.value);
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
                                    value={commentNovo}
                                    onChange={(event) => {
                                        setCommentNovo(event.target.value);
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
                                    value={commentPara}
                                    onChange={(event) => {
                                        setCommentPara(event.target.value);
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
                                    value={commentTrama}
                                    onChange={(event) => {
                                        setCommentTrama(event.target.value);
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