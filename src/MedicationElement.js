import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import MedicationModal from './MedicationModal';


const MedicationElement = ({ medi }) => {

    const [editActive, setEditActive] = useState("false");
    const [id, setElementId] = useState("");
    const [time, setElementTime] = useState("");
    const [title, setElementTitle] = useState("");
    const [unit, setElementUnit] = useState("");
    const [dose, setElementDose] = useState("");

    const deleteMedication = async (id) => {
        const medicationDoc = doc(db, "medication", id);
        await deleteDoc(medicationDoc);
    };

    const selectMedi = () => {
        setEditActive(true);
        setElementId(medi.id);
        setElementTitle(medi.title);
        setElementTime(medi.time);
        setElementDose(medi.dose);
        setElementUnit(medi.unit);
        // console.log("selectMedi: " + medi.title + " --- " + id);
    }

    const updateMedication = async (click, id) => {
        click.preventDefault();
        const medicationDoc = doc(db, "medication", id);
        await updateDoc(medicationDoc, {
            time: time,
            title: title,
            dose: dose,
            unit: unit
        });
        setEditActive(false);
        setElementTitle("");
        setElementId("");
    };


    return (
        <div key={medi.id} className="medi-list-item">


            <div>
                <p>{medi.time.toString()} - {medi.title} - {/* {medi.id} */} {medi.dose} {medi.unit}</p>
            </div>

            <div className="list-element-btn-box">
                {/* <button onClick={() => { deleteMedication(medi.id); }} >
                    <span className="material-icons-round">
                        delete
                    </span>
                </button> */}

                <button onClick={() => selectMedi()} >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>



            {
                editActive === true &&
                <MedicationModal
                    // key={medi.id}
                    medi={medi}
                    setEditActive={setEditActive}
                    setElementTitle={setElementTitle}
                    title={title}
                    setElementTime={setElementTime}
                    time={time}
                    setElementId={setElementId}
                    id={id}
                    setElementDose={setElementDose}
                    dose={dose}
                    setElementUnit={setElementUnit}
                    unit={unit}
                    updateMedication={updateMedication}
                    deleteMedication={deleteMedication}
                />
            }

        </div>
    );

}

export default MedicationElement;