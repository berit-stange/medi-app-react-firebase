import React from 'react';
// import PropTypes from 'prop-types';
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
    // serverTimestamp,
    query,
    where
} from "firebase/firestore";


const symptomsCollectionRef = collection(db, "symptoms");

export class SymptomsContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            symptoms: [],
            id: "",
            value1: "",
            value2: "",
            comment: "",
            time: "",
            timestamp: null,
            uid: 0
        };
        // this.bloodPressureCollectionRef = collection(db, "bloodPressure");
    }

    addSymptom = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { value1, value2, comment } = this.state;
        await addDoc(symptomsCollectionRef, {
            value1: value1,
            value2: value2,
            comment: comment,
            time: dateDisplay,
            // timestamp: serverTimestamp(),
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/blood-pressure', '_self');
    }

    deleteSymptom = async (id) => {
        const symptomsCollectionRef = doc(db, "symptoms", id);
        await deleteDoc(symptomsCollectionRef);
        window.open('/blood-pressure', '_self');
    };

    async getSymptoms() {
        try {
            const uid = localStorage.getItem("uid"); //warum funktioniert es nicht mit this.state.uid? 
            const q = query(symptomsCollectionRef, where("uid", "==", uid));
            const symptoms = await getDocs(q);
            const setSymptoms = () => (symptoms.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            this.setState({
                symptoms: JSON.parse(JSON.stringify(setSymptoms()))
            });
        } catch (error) {
            console.log(error);
        }
        console.log(this.state.symptoms);
    }

    componentDidMount() {
        this.setState({
            symptoms: [],
            id: "",
            value1: "",
            uid: localStorage.getItem("uid")
        });
        this.getSymptoms();
    };

    render() {
        const { symptoms } = this.state;

        return (

            <div>

                <div>
                    <h2>Add Symptoms</h2>
                    <div className="blood-pressure-input-box">
                        <div className="blood-pressure-input">
                            <div className="blood-pressure-values">
                                <input
                                    placeholder="value 1"
                                    onChange={event => this.setState({ value1: event.target.value })}
                                />
                                <input
                                    placeholder="value 2"
                                    onChange={event => this.setState({ value2: event.target.value })}
                                />
                            </div>
                            <div className="blood-pressure-comment">
                                <input
                                    placeholder="comment"
                                    onChange={event => this.setState({ comment: event.target.value })}
                                />
                                <div className="btn-bp">
                                    <button className="btn-add-bp" onClick={event => this.addSymptoms(event)} >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Blutdruck Aufzeichnung</h2>
                        {symptoms
                            .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                            .map((s) => {
                                return (
                                    <div className="blood-pressure-list-item" key={s.id}>
                                        <div>
                                            <p>{s.time.toString()}</p>
                                            {/* <p>{bp.timestamp}</p> */}
                                            <p>{s.value1} /{s.value2}</p>
                                            <p>{s.comment}</p>
                                            {/* <p>uid: {bp.uid}</p> */}
                                        </div>
                                        <div className="btn-box">
                                            <button className=""
                                                onClick={() => { this.deleteSymptom(s.id); }}
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

            </div >

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