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
    serverTimestamp,
    query,
    where
} from "firebase/firestore";




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
        this.bloodPressureCollectionRef = collection(db, "bloodPressure");
    }


    addBloodPressure = async () => {
        const bloodPressureCollectionRef = collection(db, "bloodPressure");
        const date = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const { value1, value2, comment } = this.state;
        await addDoc(bloodPressureCollectionRef, {
            value1: value1,
            value2: value2,
            comment: comment,
            time: date,
            timestamp: serverTimestamp(),
            uid: this.state.uid
        });
        window.open('/medi-app-react-firebase/blood-pressure', '_self');
    }

    deleteBloodPressure = async (id) => {
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureDoc);
        window.open('/medi-app-react-firebase/blood-pressure', '_self');
    };



    async getBloodPressure() {
        try {
            const bloodPressureCollectionRef = collection(db, "bloodPressure");
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
                            .map((bp) => {
                                return (
                                    <div className="blood-pressure-list-item" key={bp.id}>
                                        <div>
                                            <p>{bp.time.toString()}</p>
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