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


const bloodPressureCollectionRef = collection(db, "bloodPressure");

export class BloodPressureContainerClassComp extends React.Component {

    constructor() {
        super();
        this.state = {
            bloodPressure: [],
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

    addBloodPressure = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { value1, value2, comment } = this.state;
        await addDoc(bloodPressureCollectionRef, {
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

    deleteBloodPressure = async (id) => {
        const bloodPressureCollectionRef = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureCollectionRef);
        window.open('/blood-pressure', '_self');
    };

    async getBloodPressure() {
        try {
            const uid = localStorage.getItem("uid"); //warum funktioniert es nicht mit this.state.uid? 
            const q = query(bloodPressureCollectionRef, where("uid", "==", uid));
            const bloodPressure = await getDocs(q);
            const setBloodPressure = () => (bloodPressure.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            this.setState({
                bloodPressure: JSON.parse(JSON.stringify(setBloodPressure()))
            });
        } catch (error) {
            console.log(error);
        }
        console.log(this.state.bloodPressure);
    }

    componentDidMount() {
        this.setState({
            bloodPressure: [],
            id: "",
            value1: "",
            uid: localStorage.getItem("uid")
        });
        this.getBloodPressure();
    };

    render() {
        const { bloodPressure } = this.state;

        return (

            <div>

                <div>
                    <h2>Add Blood Pressure</h2>
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
                                    <button className="btn-add-bp" onClick={event => this.addBloodPressure(event)} >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Blutdruck Aufzeichnung</h2>
                        {bloodPressure
                            .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                            .map((bp) => {
                                return (
                                    <div className="blood-pressure-list-item" key={bp.id}>
                                        <div>
                                            <p>{bp.time.toString()}</p>
                                            {/* <p>{bp.timestamp}</p> */}
                                            <p>{bp.value1} /{bp.value2}</p>
                                            <p>{bp.comment}</p>
                                            {/* <p>uid: {bp.uid}</p> */}
                                        </div>
                                        <div className="btn-box">
                                            <button className=""
                                                onClick={() => { this.deleteBloodPressure(bp.id); }}
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