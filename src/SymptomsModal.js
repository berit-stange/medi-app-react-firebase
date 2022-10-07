import React from 'react';

const SymptomsModal = ({
    symptom,
    setEditActive,
    setSymptomIntensity,
    intensity,
    description,
    setSymptomDescription,
    time,
    setSymptomTime,
    updateSymptom,
    deleteSymptom
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
                intensity={intensity}
                onChange={(event) => { setSymptomIntensity(event.target.value) }}
            />
            <input
                type="text"
                value={description}
                onChange={(event) => { setSymptomDescription(event.target.value) }}
            />
            <input
                type="text"
                value={time}
                onChange={(event) => { setSymptomTime(event.target.value) }}
            />

            <div className="modal-btn-box">
                <div>
                    <button onClick={() => { deleteSymptom(symptom.id); }} >
                        <span className="material-icons-round">
                            delete
                        </span>
                    </button>
                </div>
                <div>
                    <button onClick={(click) => { updateSymptom(click, symptom.id); }}>
                        <span className="material-icons-round">
                            update
                        </span>
                    </button>
                </div>
            </div>

        </div >


    );
}

export default SymptomsModal;