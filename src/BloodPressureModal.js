import React from 'react';

const BloodPressureModal = ({
    bloodPressure,
    setEditActive,
    setBloodPressureValue1,
    value1,
    setBloodPressureValue2,
    value2,
    comment,
    setBloodPressureComment,
    time,
    setBloodPressureTime,
    updateBloodPressure,
    deleteBloodPressure
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
                value={value1}
                onChange={(event) => { setBloodPressureValue1(event.target.value) }}
            />
            <input
                type="text"
                value={value2}
                onChange={(event) => { setBloodPressureValue2(event.target.value) }}
            />
            <input
                type="text"
                value={comment}
                onChange={(event) => { setBloodPressureComment(event.target.value) }}
            />
            <input
                type="text"
                value={time}
                onChange={(event) => { setBloodPressureTime(event.target.value) }}
            />

            <div className="modal-btn-box">
                <div>
                    <button onClick={() => { deleteBloodPressure(bloodPressure.id); }} >
                        <span className="material-icons-round">
                            delete
                        </span>
                    </button>
                </div>
                <div>
                    <button onClick={(click) => { updateBloodPressure(click, bloodPressure.id); }}>
                        <span className="material-icons-round">
                            update
                        </span>
                    </button>
                </div>
            </div>

        </div >


    );
}

export default BloodPressureModal;