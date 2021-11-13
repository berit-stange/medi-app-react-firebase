import React from 'react';
import { auth } from './firebase';

import { useState, useEffect } from "react";

// import { db } from "./firebase-config";
import { db } from "./firebase";

import {
    collection,
    // getDocs,
    // getDoc,
    addDoc,
    // updateDoc,
    deleteDoc,
    doc,
    // setDoc,
    // serverTimestamp,

    orderBy,
    query,
    onSnapshot

} from "firebase/firestore";


const BloodPressureContainer = () => {

    // Signout function
    const logout = () => {
        auth.signOut();
    }

    const [value1, setBloodPressureValue1] = useState("");
    const [value2, setBloodPressureValue2] = useState("");
    const [comment, setBloodPressureComment] = useState("");
    // const [time, setTimestamp] = useState("");
    const [bloodPressure, setBloodPressure] = useState([]);

    // const bloodPressureCollectionRef = collection(db, "bloodPressure");

    const addBloodPressure = async () => {
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
        const bloodPressureCollectionRef = collection(db, "bloodPressure");
        await addDoc(bloodPressureCollectionRef, {
            value1: value1,
            value2: value2,
            comment: comment,
            // time: serverTimestamp()
            time: date
        });
    };

    const deleteBloodPressure = async (id) => {
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureDoc);
    };


    useEffect(() => {
        const bloodPressureRef = collection(db, "bloodPressure");
        const q = query(bloodPressureRef, orderBy("time", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setBloodPressure(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        );
        return unsub;
    }, []);

    // useEffect(() => {
    //     const getBloodPressure = async () => {
    //         const data = await getDocs(bloodPressureCollectionRef);
    //         setBloodPressure(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getBloodPressure();
    // }, []);


    return (
        <div>
            <div className="welcome">
                Welcome {auth.currentUser.email}!

                <button className="btn-logout"
                    onClick={logout}>
                    Logout
                </button>
            </div>
            <div>
                <h2>Add Blood Pressure</h2>
                <div className="blood-pressure-input-box">

                    <form className="blood-pressure-input">

                        <div className="blood-pressure-values">
                            <input
                                placeholder="value 1"
                                onChange={(event) => {
                                    setBloodPressureValue1(event.target.value);
                                }}
                            />
                            <input
                                placeholder="value 2"
                                onChange={(event) => {
                                    setBloodPressureValue2(event.target.value);
                                }}
                            />
                        </div>
                        <div className="blood-pressure-comment">
                            <input
                                placeholder="comment"
                                onChange={(event) => {
                                    setBloodPressureComment(event.target.value);
                                }}
                            />
                            <div className="btn-bp">
                                <button className="btn-add-bp"
                                    onClick={addBloodPressure} >+</button>
                            </div>
                        </div>
                    </form>



                </div>

                <div>
                    <h2>Blood Pressure Diary</h2>
                    {bloodPressure.map((bloodPressure) => {
                        return (
                            <div className="blood-pressure-list-item" key={bloodPressure.id}>
                                <div>
                                    <p>{bloodPressure.time.toString()}</p>
                                    <p>{bloodPressure.value1} / {bloodPressure.value2}</p>
                                    <p>{bloodPressure.comment}</p>
                                </div>
                                <div className="btn-bp">
                                    <button className=""
                                        onClick={() => {
                                            deleteBloodPressure(bloodPressure.id);
                                        }}
                                    >
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
    );
}

export default BloodPressureContainer;