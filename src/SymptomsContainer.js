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
            intensity: "",
            // value2: "",
            description: "",
            time: "",
            timestamp: null,
            uid: 0
        };
        // this.bloodPressureCollectionRef = collection(db, "bloodPressure");
    }

    addSymptom = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { intensity, /* value2, */ description } = this.state;
        await addDoc(symptomsCollectionRef, {
            intensity: intensity,
            // value2: value2,
            description: description,
            time: dateDisplay,
            // timestamp: serverTimestamp(),
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/symptoms', '_self');
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
            intensity: "",
            uid: localStorage.getItem("uid")
        });
        this.getSymptoms();
    };

    render() {
        const { symptoms } = this.state;

        return (

            <div>

                <div>
                    <h2>Symptom hinzufügen</h2>
                    <div className="blood-pressure-input-box">
                        <div className="blood-pressure-input">

                            <div className="blood-pressure-comment">
                                <input
                                    placeholder="description"
                                    onChange={event => this.setState({ description: event.target.value })}
                                />
                                <div className="btn-bp">
                                    <button className="btn-add-bp" onClick={event => this.addSymptom(event)} >+</button>
                                </div>
                            </div>

                            <div className="blood-pressure-values">
                                <input
                                    placeholder="intensity"
                                    onChange={event => this.setState({ intensity: event.target.value })}
                                />
                            </div>

                        </div>
                    </div>

                    <div>
                        <h2>Symptome Aufzeichnung</h2>
                        {symptoms
                            .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                            .map((s) => {
                                return (
                                    <div className="blood-pressure-list-item" key={s.id}>
                                        <div>
                                            <p>{s.time.toString()}</p>
                                            <p>{s.description}</p>
                                            <p>{s.intensity} / 10</p>
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