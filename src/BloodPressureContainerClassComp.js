import React from 'react';
// import PropTypes from 'prop-types';
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
    serverTimestamp,
    query,
    where
} from "firebase/firestore";


class BloodPressureContainerClassComp extends React.Component {

    constructor() {
        super(); //initializes component’s state
        this.state = {
            value1: "",
            value2: "",
            comment: "",
            time: "",
            timestamp: null,
            uid: ""
            // movies: [],
            // selectedMovie: null, //tells the application that no movie cards were clicked
            // registration: null,
            // user: null,
        };
    }

    // const [user] = useAuthState(auth);
    //     const [value1, setBloodPressureValue1] = useState("");
    //     const [value2, setBloodPressureValue2] = useState("");
    //     const [comment, setBloodPressureComment] = useState("banana");
    //     const [bloodPressure, setBloodPressure] = useState([]);


    addBloodPressure = async () => {
        const bloodPressureCollectionRef = collection(db, "bloodPressure");
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        await addDoc(bloodPressureCollectionRef, {
            value1: value1,
            value2: value2,
            comment: comment,
            time: date,
            timestamp: serverTimestamp(),
            uid: user.uid
        });
    }

    getBloodPressure = async () => {
        const q = query(bloodPressureCollectionRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setBloodPressure(querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    componentDidMount() {
        // let accessToken = localStorage.getItem('token');
        // if (accessToken !== null) {
        //     this.setState({
        //         user: localStorage.getItem('user')
        //     });
        //     this.getMovies(accessToken);
        //     this.getUser(accessToken);
        // }
        this.addBloodPressure();
        this.getBloodPressure();
    };


    render() {
        // const { directorData, moviesOfDirector, onBackClick } = this.props; //extracting the props

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
                            })}
                    </div>
                </div>

            </div>

        );
    }
}

// xxxx.propTypes = {
//     directorData: PropTypes.shape({
//        xxx: PropTypes.string.isRequired,
//         xxx: PropTypes.string.isRequired
//     }).isRequired,
//     onBackClick: PropTypes.func.isRequired
// };