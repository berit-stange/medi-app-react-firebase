import React from "react";
import { useState } from "react";
import { db } from "./firebase-config";
import {
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

const BloodPressureElement = () => {

    const [editActive, setEditActive] = useState("false");
    const [value1, setBloodPressureValue1] = useState("");
    const [value2, setBloodPressureValue2] = useState("");
    const [comment, setBloodPressureComment] = useState("");
    const [time, setBloodPressureTime] = useState("");

    const deleteBloodPressure = async (id) => {
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await deleteDoc(bloodPressureDoc);
    };

    const selectBloodPressure = ({ bloodPressure }) => {
        setEditActive(true);
        setBloodPressureValue1(bloodPressure.value1);
        setBloodPressureValue2(bloodPressure.value2);
        setBloodPressureComment(bloodPressure.comment);
        setBloodPressureTime(bloodPressure.time);
        console.log("selectMedi: " + bloodPressure.value1);
    };

    const updateBloodPressure = async (click, id) => {
        click.preventDefault();
        const bloodPressureDoc = doc(db, "bloodPressure", id);
        await updateDoc(bloodPressureDoc, {
            time: time,
            value2: value2,
            value1: value1,
            comment: comment
        });
        setEditActive(false);
    };

    return (
        <div key={bloodPressure.id}>

        </div>
    );
}