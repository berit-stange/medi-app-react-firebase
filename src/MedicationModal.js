import React from 'react';

const MedicationModal = ({
    medi,
    setEditActive,
    setElementTitle,
    title,
    setElementTime,
    time,
    unit, setElementUnit,
    dose,
    setElementDose,
    updateMedication,
    deleteMedication
}) => {

    return (

        <div className="modal">

            <div>
                <button className="modal-close"
                    onClick={() => { setEditActive(false); }}>
                    <span className="material-icons-round">
                        close
                    </span>
                </button>
            </div>

            <input
                type="text"
                value={title}
                onChange={(event) => { setElementTitle(event.target.value) }}
            />
            <input
                type="text"
                value={time}
                onChange={(event) => { setElementTime(event.target.value) }}
            />
            <input
                type="text"
                value={dose}
                onChange={(event) => { setElementDose(event.target.value) }}
            />
            <input
                type="text"
                value={unit}
                onChange={(event) => { setElementUnit(event.target.value) }}
            />

            <div className="modal-btn-box">
                <div>
                    <button onClick={() => { deleteMedication(medi.id); }} >
                        <span className="material-icons-round">
                            delete
                        </span>
                    </button>
                </div>
                <div>
                    <button onClick={(click) => { updateMedication(click, medi.id); }}>
                        <span className="material-icons-round">
                            update
                        </span>
                    </button>
                </div>
            </div>

        </div >


    );
}

export default MedicationModal;