import Table from "react-bootstrap/Table";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { useState } from "react";
import app from "../../../firebase.js";
import StudentView from "./StudentView.js";
import classes from "../StudentCss/Student.module.css";
function Student() {
  const [TotalSem, SetTotalSem] = useState([]);
  const [UniversityRollNo, setNewUniversityRollNo] = useState("");
  const getData = (e) => {
    const Array = [];
    e.preventDefault();
    const db = ref(getDatabase(app));
    get(child(db, `${UniversityRollNo}/result/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          Array.push(snapshot.val());
          SetTotalSem(Array);
        } else {
          alert("no data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var keys;
  if (TotalSem.length > 0) keys = Object.keys(TotalSem[0]);

  return (
    <div>
      <div className={classes.student_top}>
        <div className={classes.logo}>
          <h2>
            <span style={{ color: "aliceblue" }}>STUDENT PORTAL</span>
          </h2>
        </div>
        <div className={classes.sideTop}>
          <div className={classes.search_student}>
            <div className={classes.search_box}>
              <div className={classes.one}>
                <form onSubmit={getData}>
                  <input
                    name="universityrno"
                    type="text"
                    class={classes.input_search}
                    placeholder="University Roll No"
                    value={UniversityRollNo}
                    onChange={(event) =>
                      setNewUniversityRollNo(event.target.value)
                    }
                  ></input>
                  <button type="submit" class={classes.btn_search}>
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {TotalSem.length > 0 ? <StudentView res={TotalSem} /> : null}
    </div>
  );
}
export default Student;
