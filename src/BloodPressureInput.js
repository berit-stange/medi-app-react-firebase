import React from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useState/* , useEffect */ } from "react";

import { db } from "./firebase-config";

import {
    collection,
    // getDocs, //stattdessen query
    addDoc,
    // updateDoc,
    // deleteDoc,
    // doc,
    // onSnapshot,
    // orderBy,
    serverTimestamp,
    // query,
    // where
} from "firebase/firestore";


const BloodPressureInput = () => {

    const [user] = useAuthState(auth);
    const [value1, setBloodPressureValue1] = useState("");
    const [value2, setBloodPressureValue2] = useState("");
    const [comment, setBloodPressureComment] = useState("");
    // const [bloodPressure, setBloodPressure] = useState([]);
    const bloodPressureCollectionRef = collection(db, "bloodPressure");



    const addBloodPressure = async () => {
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        await addDoc(bloodPressureCollectionRef, {
            value1: value1,
            value2: value2,
            comment: comment,
            time: date,
            timestamp: serverTimestamp(),
            uid: user.uid
        });
    };


    // useEffect(() => {
    //     const getBloodPressure = async () => {
    //         const q = query(bloodPressureCollectionRef, where("uid", "==", user.uid));
    //         const querySnapshot = await getDocs(q);
    //         setBloodPressure(querySnapshot.docs
    //             .map((doc) => ({ ...doc.data(), id: doc.id }))
    //         );
    //     };
    //     getBloodPressure();
    // }, [
    //     user,
    //     bloodPressureCollectionRef
    // ]);







    return (
        <div>

            <div>
                <h2 className="blood-pressure-title">Blutdruck</h2>
                <div className="blood-pressure-input-box">

                    <div className="blood-pressure-input">

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
                            <div className="btn-box">
                                <button className="btn-add-bp"
                                    onClick={addBloodPressure} >+</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default BloodPressureInput;