import React from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useState, useEffect } from "react";

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
    // serverTimestamp,
    query,
    where
} from "firebase/firestore";


const BloodPressureContainer = () => {

    const [user] = useAuthState(auth);
    const [value1, setBloodPressureValue1] = useState("");
    const [value2, setBloodPressureValue2] = useState("");
    const [comment, setBloodPressureComment] = useState("no comment");
    const [bloodPressure, setBloodPressure] = useState([]);
    // const [bloodPressure, setBloodPressure] = useState({ value1: "", value2: "", comment: "", time: "", timestamp: "" });
    const bloodPressureCollectionRef = collection(db, "bloodPressure");


    const addBloodPressure = async () => {
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        await addDoc(bloodPressureCollectionRef, {
            value1: value1,
            value2: value2,
            comment: comment,
            time: date,
            timestamp: dateSorting,
            uid: user.uid
        });
    };


    const deleteBloodPressure = async (id) => {
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureDoc);
    };


    // const getBloodPressure = () => {
    //     const q = query(bloodPressureCollectionRef, where("uid", "==", user.uid));
    //     const querySnapshot = getDocs(q);
    //     setBloodPressure(querySnapshot.docs
    //         .map((doc) => ({ ...doc.data(), id: doc.id }))
    //     );
    //     console.log("OK")
    // }
    //     // getBloodPressure();
    //     // return function cleanup() {
    //     //     setBloodPressure();
    //     // };
    //     // ,
    //     // [
    //     //     user,
    //     //     bloodPressureCollectionRef
    //     // ]
    //     ;


    // useEffect(() => {
    //     const q = query(bloodPressureCollectionRef, where("uid", "==", user.uid));
    //     const unsub = onSnapshot(q, (snapshot) =>
    //         setBloodPressure(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //     );
    //     return unsub;
    //     // setTimeout(() => {
    //     //     unsub();
    //     // }, 1000);
    // }, [ 
    //     user,
    //     bloodPressureCollectionRef
    // ]);


    // useEffect(() => {
    //     const getBloodPressure = async () => {
    //         const q = query(bloodPressureCollectionRef, where("uid", "==", user.uid));
    //         const querySnapshot = await getDocs(q);
    //         let timer = setTimeout(() => {
    //             setBloodPressure(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //         }, 1000);
    //         return () => clearTimeout(timer); //soll den infinite loop clearen, funktioniert aber nicht
    //     };
    //     // getBloodPressure();
    // },
    //     console.log("OK"), //loggt ca. 3000 x pro Sekunde
    //     [
    //         // user,
    //         // bloodPressureCollectionRef //mit dependencies loopt es ewig weiter
    //         // bloodPressure
    //         // bloodPressure
    //         // getBloodPressure
    //         //wenn leer, dann wird's noch richtig geadded, aber es aktualisiert nicht die Liste
    //     ]);
    //https://reactjs.org/docs/hooks-effect.html
    //https://www.w3schools.com/react/react_useeffect.asp

    const getBloodPressure = async () => {
        const q = query(bloodPressureCollectionRef, where("uid", "==", user.uid));
        const querySnapshotResponse = await getDocs(q);
        setBloodPressure(querySnapshotResponse.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log("1 - setBloodPressure");
    };

    useEffect(() => {
        getBloodPressure();
        console.log("2 - getBloodPressure"); //infinite loop!
    }, [
        user.uid, //wenn array leer, dann wird's noch richtig geadded, aber es rendert/aktualisiert nicht die Liste
        // bloodPressureCollectionRef
    ]);



    return (
        <div>

            <div>
                <h2>Add Blood Pressure</h2>
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
                            <div className="btn-bp">
                                <button className="btn-add-bp" onClick={addBloodPressure} >+</button>
                            </div>
                            <div className="btn-bp">
                                <button className="btn-add-bp"  >!!!</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Blutdruck Aufzeichnung</h2>
                    {bloodPressure
                        .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                        .map((bloodPressure) => {
                            return (
                                <div className="blood-pressure-list-item" key={bloodPressure.id}>
                                    <div>
                                        <p>{bloodPressure.time.toString()}</p>
                                        <p>{bloodPressure.value1} / {bloodPressure.value2}</p>
                                        <p>{bloodPressure.comment}</p>
                                        {/* <p>uid: {bloodPressure.uid}</p> */}
                                    </div>
                                    <div className="btn-box">
                                        <button className="" onClick={() => { deleteBloodPressure(bloodPressure.id); }} >
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

export default BloodPressureContainer;