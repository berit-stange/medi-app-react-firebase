import React from 'react';
import { auth } from './firebase';

import { useState, useEffect } from "react";

import { db } from "./firebase-config";

import {
    collection,
    // getDocs, //stattdessen query
    addDoc,
    // updateDoc,
    deleteDoc,
    doc,
    orderBy,
    onSnapshot, query
} from "firebase/firestore";


const Mainpage = () => {

    // Signout function
    const logout = () => {
        auth.signOut();
    }


    const [title, setNewTitle] = useState("");
    const [body, setNewBody] = useState("");
    // const [createdAt, setNewTimestamp] = useState("");

    const [medication, setMedication] = useState([]);
    const mediCollectionRef = collection(db, "medication");

    // const createUser = async () => {
    //   await addDoc(usersCollectionRef, { firstName: firstName, lastName: lastName });
    // };

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


    // useEffect(() => {
    //     const getMedication = async () => {
    //         const mediCollectionRef = collection(db, "medication");
    //         const data = await getDocs(mediCollectionRef);
    //         setMedication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getMedication();
    // }, []);

    useEffect(() => {
        const mediCollectionRef = collection(db, "medication");
        const q = query(mediCollectionRef, orderBy("title", "asc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setMedication(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        );
        return unsub;
    }, []);


    return (
        <div>
            Welcome {auth.currentUser.email}!

            <button style={{ "marginLeft": "20px" }}
                onClick={logout}>
                Logout
            </button>

            <div>
                <div className="">
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
                    <button className="btn-add" onClick={createMedi}>+</button>
                </div>


                {medication.map((medication) => {
                    return (
                        <div className="container" key={medication.id}>

                            <p>Medication: {medication.title} / {medication.body}</p>
                            <p>{medication.time.toString()}</p>
                            <div>
                                {/* <button
                                    onClick={() => {
                                        // updateUser(user.id, user.lastName);
                                        updateMedication(
                                            medication.id,
                                            medication.title,
                                            medication.body,
                                            medication.createdAt
                                        );
                                    }}
                                >
                                    +
                                </button> */}

                                <button
                                    onClick={() => {
                                        // deleteUser(user.id);
                                        deleteMedication(medication.id);
                                    }}
                                >
                                    -
                                </button>
                            </div>

                        </div>
                    );
                })}


            </div>



        </div>
    );
}

export default Mainpage;