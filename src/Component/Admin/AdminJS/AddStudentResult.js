import React, { useEffect, useState, useRef } from "react";
import classes from "../AdminCss/AddStudentResult.module.css";
import SubjectResult from "./SubjectResult";
import { useHistory } from "react-router";
import { getDatabase, ref, set, get, child } from "firebase/database";
import app from "../../../firebase.js";

function AddStudentResult() {
  const [NewSubjectArray, setNewSubjectArray] = useState([]);
  const [NewUniversityRollNo, setNewUniversityRollNo] = useState("");
  const [Details, setNewDetails] = useState({
    sem: "",
  });
  const getData = (e) => {
    const array = [];
    e.preventDefault();
    const db = ref(getDatabase(app));
    console.log(NewUniversityRollNo);
    get(child(db, `${NewUniversityRollNo}/STUDENT_DETAILS`))
      .then((snapshot) => {
        if (snapshot.exists()) {
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
      .catch((err) => {
        console.log(err);
      });
  };
  let history = useHistory();
  var sem;
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
          `${NewUniversityRollNo}/result/sem${Details.sem}/${data.Type}/${data.Code}/`
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
    history.push("/");
  };
  return (
    <div className={classes.main}>
      <div className={classes.search_student}>
        <div className={classes.search_box}>
          <form onSubmit={getData}>
            <input
              name="universityrno"
              type="text"
              class={classes.input_search}
              placeholder="University Roll No"
              value={NewUniversityRollNo}
              onChange={(event) => setNewUniversityRollNo(event.target.value)}
            ></input>
            <button type="submit" class={classes.btn_search}>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className={classes.Display}>
        {console.log(NewSubjectArray)}
        {NewSubjectArray.length > 0 ? (
          <div className={classes.all_subject}>
            <SubjectResult
              subjectArray={NewSubjectArray}
              handle={handleSubmit}
              rollno={NewUniversityRollNo}
            />
            <button onClick={redirect} className={classes.AddResult_database}>
              CLOSE
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default AddStudentResult;
