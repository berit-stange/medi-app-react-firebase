import React from "react";
import { useState } from "react";
import { db } from './firebase-config';
import {
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import UserSettingsModal from './UserSettingsModal';


const UserSettingsElement = ({ settings }) => {

    const [editActive, setEditActive] = useState("false");
    const [id, setElementId] = useState("");
    const [title, setElementTitle] = useState("");
    const [unit, setElementUnit] = useState("");
    const [dose, setElementDose] = useState("");


    const selectMedi = () => {
        setEditActive(true);
        setElementTitle(settings.title);
        setElementDose(settings.dose);
        setElementUnit(settings.unit);
        console.log("selectMedi: " + settings.title);
    }

    const updateSettings = async (click, id) => {
        click.preventDefault();
        const settingsDoc = doc(db, "settings", id);
        await updateDoc(settingsDoc, {
            title: title,
            unit: unit,
            dose: dose
        });
        setEditActive(false);
    };

    const deleteSettings = async (id) => {
        const settingsDoc = doc(db, "settings", id);
        await deleteDoc(settingsDoc);
    };


    return (
        <div className="medi-values" >
            <p className="medi-title">{settings.title} - {settings.dose} {settings.unit}</p>

            <button onClick={() => selectMedi()} >
                <span className="material-icons-round">settings</span>
            </button>

            {
                editActive === true &&
                <UserSettingsModal
                    settings={settings}
                    setEditActive={setEditActive}
                    setElementTitle={setElementTitle}
                    title={title}
                    setElementId={setElementId}
                    id={id}
                    setElementDose={setElementDose}
                    dose={dose}
                    setElementUnit={setElementUnit}
                    unit={unit}
                    updateSettings={updateSettings}
                    deleteSettings={deleteSettings}
                />
            }

        </div >
    );

}

export default UserSettingsElement; 