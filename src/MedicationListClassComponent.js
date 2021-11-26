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


const medicationRef = collection(db, "medication");

export class MedicationListClassComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            medication: [],
            id: "",
            title: "",
            comment: "",
            time: "",
            timestamp: null,
            uid: 0
        };
    }

    addMedication = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { title, comment } = this.state;
        await addDoc(medicationRef, {
            title: title,
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/medication', '_self');
    }

    addAxi = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { comment } = this.state;
        await addDoc(medicationRef, {
            title: "Axitinib",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/medication', '_self');
    }

    addNovo = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { comment } = this.state;
        await addDoc(medicationRef, {
            title: "Novaminsulfon",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/medication', '_self');
    }

    addPara = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { comment } = this.state;
        await addDoc(medicationRef, {
            title: "Paracethamol",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/medication', '_self');
    }

    addTrama = async () => {
        const dateDisplay = new Date().toLocaleDateString('de-DE', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
        const dateSorting = new Date().toISOString();
        const { comment } = this.state;
        await addDoc(medicationRef, {
            title: "Tramadol",
            comment: comment,
            time: dateDisplay,
            timestamp: dateSorting,
            uid: this.state.uid
        });
        window.open('/medication', '_self');
    }

    deleteBloodPressure = async (id) => {
        const medicationRef = doc(db, "medication", id);
        await deleteDoc(medicationRef);
        window.open('/medication', '_self');
    };

    async getMedication() {
        try {
            const uid = localStorage.getItem("uid"); //warum funktioniert es nicht mit this.state.uid? 
            const q = query(medicationRef, where("uid", "==", uid));
            const medi = await getDocs(q);
            const setBloodPressure = () => (medi.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            this.setState({
                medication: JSON.parse(JSON.stringify(setBloodPressure()))
            });
        } catch (error) {
            console.log(error);
        }
        console.log(this.state.medication);
    }

    componentDidMount() {
        this.setState({
            medication: [],
            id: "",
            title: "",
            uid: localStorage.getItem("uid")
        });
        this.getMedication();
    };

    render() {
        const { medication } = this.state;

        return (

            <div>

                <div>
                    <h2>Medikament hinzufügen</h2>

                    <div className="medi-input-box">
                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Axi</p>
                                <input
                                    placeholder="comment"
                                    onChange={event => this.setState({ comment: event.target.value })}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={event => this.addAxi(event)} >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="medi-input-box">
                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Novo</p>
                                <input
                                    placeholder="comment"
                                    onChange={event => this.setState({ comment: event.target.value })}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={event => this.addNovo(event)} >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="medi-input-box">
                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Para</p>
                                <input
                                    placeholder="comment"
                                    onChange={event => this.setState({ comment: event.target.value })}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={event => this.addPara(event)} >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="medi-input-box">
                        <div className="medi-input">
                            <div className="medi-values">
                                <p className="medi-title">Trama</p>
                                <input
                                    placeholder="comment"
                                    onChange={event => this.setState({ comment: event.target.value })}
                                />
                                <div className="">
                                    <button className="btn-add-med" onClick={event => this.addTrama(event)} >+</button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div>
                        <h2>Medikamente Aufzeichnung</h2>
                        {medication
                            .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
                            .map((med) => {
                                return (
                                    <div className="medi-list-item" key={med.id}>
                                        <div>
                                            <p>{med.time.toString()}</p>
                                            <p>{med.title} - {med.comment}</p>
                                        </div>
                                        <div className="btn-box">
                                            <button className=""
                                                onClick={() => { this.deleteBloodPressure(med.id); }}
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
