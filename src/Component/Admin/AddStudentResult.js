import React, {useContext, useState} from "react";
import SubjectResult from "./SubjectResult";
import { useNavigate } from "react-router";
import { getDatabase, ref, set, get, child } from "firebase/database";
import app from "../../firebase.js";
import {AuthContext} from "../auth-context";
import './AddStudentResult.css'

function AddStudentResult() {

  const Authc = useContext(AuthContext);
  const [NewSubjectArray, setNewSubjectArray] = useState([]);
  const [NewUniversityRollNo, setNewUniversityRollNo] = useState("");
  const [uid,setUid] = useState();
  const [Details, setNewDetails] = useState({
    sem: "",
  });
  const getData = (e) => {
    const array = [];
    e.preventDefault();
    const db = ref(getDatabase(app));
    console.log(NewUniversityRollNo);
    get(child(db ,`${NewUniversityRollNo}/uid`)).then((snapshot)=>{
      if(snapshot.exists()){
        setUid(snapshot.val());
        get(child(db, `${snapshot.val()}/STUDENT_DETAILS`))
            .then((snapshot) => {
              console.log(snapshot);
              console.log(snapshot.exists());
              console.log(snapshot.val());
              if (snapshot.exists()) {
                console.log(snapshot.val());
                setNewDetails({
                  sem: snapshot.val().sem,
                });
                get(child(db, `SUBJECT/${snapshot.val().course}`))
                    .then((snapshot) => {
                      if (snapshot.exists()) {
                        snapshot.forEach(function (childSnapshot) {
                          console.log(childSnapshot.val());
                          array.push(childSnapshot.val());
                        });
                        setNewSubjectArray(array);
                      } else {
                        alert("no data found");
                      }
                    })
                    .catch((err) => console.log(err));
              } else {
                alert("no data found");
              }
            })
      }
    }).catch((err) => {
        console.log(err);
      });
  };
  let history = useNavigate();
  // var sem;
  const handleSubmit = (data) => {
    console.log(data);
    try {
      if (
        data.Code.trim().length === 0 ||
        data.Type.trim().length === 0 ||
        data.Marks.trim().length === 0
      ) {
        throw new Error("please fill all the details");
      }
      const db = getDatabase(app);
      set(
        ref(
          db,
          `${uid}/result/sem${Details.sem}/${data.Type}/${data.Code}/`
        ),
        {
          Name: data.Subject,
          marks: data.Marks,
        }
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const redirect = () => {
    history("/");
  };
  return (
    <div className="details">
          <form onSubmit={getData} className="search_box">
            <input
              name="universityrno"
              type="text"
              placeholder="University Roll No"
              className="input_box"
              value={NewUniversityRollNo}
              onChange={(event) => setNewUniversityRollNo(event.target.value)}
            ></input>
            <button type="submit" className="btn">
              Search
            </button>
          </form>
      <div className="formAdd_result">
        {console.log(NewSubjectArray)}
        {NewSubjectArray.length > 0 ? (
          <div className="for_subjectresult">
            <SubjectResult
              subjectArray={NewSubjectArray}
              handle={handleSubmit}
              rollno={NewUniversityRollNo}
            />
            <button onClick={redirect} className="btn">
              CLOSE
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default AddStudentResult;
