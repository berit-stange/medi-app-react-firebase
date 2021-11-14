import React from 'react';
import { useState, useEffect } from "react";

// import { auth } from './firebase';
import { db } from "./firebase-config";

import {
    collection,
    getDocs, //stattdessen query
    addDoc,
    // updateDoc,
    deleteDoc,
    doc,
    // onSnapshot,
    // orderBy,
    // query
} from "firebase/firestore";


const MedicationList = () => {

    const [title, setNewTitle] = useState("");
    const [body, setNewBody] = useState("");
    const [medication, setMedication] = useState([]);
    const mediCollectionRef = collection(db, "medication");

    const createMedi = async () => {
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        await addDoc(mediCollectionRef, {
            title: title,
            body: body,
            time: date
        });
    };

    // const updateUser = async (id, lastName) => {
    //   const userDoc = doc(db, "users", id);
    //   const newFields = { lastName: lastName + 1 };
    //   await updateDoc(userDoc, newFields);
    // };

    // const updateMedication = async (id, lastName) => {
    //     const medicationDoc = doc(db, "medication", id);
    //     const newFields = {
    //         title: title,
    //         // createdAt: createdAt
    //     };
    //     // await updateDoc(medicationDoc, newFields);
    //     await addDoc(medicationDoc, /* { createdAt: createdAt } */);
    // };

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    useEffect(() => {
        const getMedication = async () => {
            const mediCollectionRef = collection(db, "medication");
            const data = await getDocs(mediCollectionRef);
            setMedication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getMedication();
    }, []);

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


    return (

        <div>

            <div>
                <div className="blood-pressure-input-box">
                    <div className="blood-pressure-input">
                        <div className="blood-pressure-values">
                            <input
                                placeholder="Medication..."
                                onChange={(event) => {
                                    setNewTitle(event.target.value);
                                }}
                            />
                            <input
                                // type="number"
                                placeholder="Take at..."
                                onChange={(event) => {
                                    setNewBody(event.target.value);
                                }}
                            />
                        </div>
                        <div className="btn-bp">
                            <button className="btn-add-med" onClick={createMedi}>+</button>
                        </div>
                    </div>

                    <div>
                        <h2>Medication List</h2>
                        {medication.map((medication) => {
                            return (
                                <div className="blood-pressure-list-item" key={medication.id}>
                                    <div>
                                        <p>Medication: {medication.title} / {medication.body}</p>
                                        {/* <p>{medication.time.toString()}</p> */}
                                    </div>
                                    <div className="btn-bp">
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