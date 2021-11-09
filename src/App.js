import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  // const [firstName, setNewName] = useState("");
  // const [lastName, setNewLastName] = useState("");
  const [title, setNewTitle] = useState("");
  const [body, setNewBody] = useState("");

  // const [users, setUsers] = useState([]);
  const [medication, setMedication] = useState([]);
  // const usersCollectionRef = collection(db, "users");
  const usersCollectionRef = collection(db, "medication");

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, { firstName: firstName, lastName: lastName });
  // };

  const createMedi = async () => {
    await addDoc(usersCollectionRef, { title: title, body: body });
  };

  const updateUser = async (id, lastName) => {
    const userDoc = doc(db, "users", id);
    const newFields = { lastName: lastName + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getUsers();
  // }, []);

  useEffect(() => {
    const getMedication = async () => {
      const data = await getDocs(usersCollectionRef);
      setMedication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMedication();
  }, []);


  return (
    <div>

      <div className="">
        <input
          placeholder="Medication..."
          onChange={(event) => {
            // setNewName(event.target.value);
          }}
        />
        <input
          // type="number"
          placeholder="Take at..."
          onChange={(event) => {
            // setNewLastName(event.target.value);
          }}
        />
        <button className="btn-add" onClick={createMedi}>+</button>
      </div>


      {medication.map((medication) => {
        return (
          <div className="container">
            {/* {" "} */}

            <p>Medication: {medication.title}</p>
            {/* <p>Last Name: {user.lastName}</p> */}

            <div>
              <button
                onClick={() => {
                  // updateUser(user.id, user.lastName);
                }}
              >
                {" "}
                +
              </button>

              <button
                onClick={() => {
                  // deleteUser(user.id);
                }}
              >
                {" "}
                -
              </button>
            </div>

          </div>
        );
      })}


    </div>
  );
}

export default App;
