import React, { useState } from "react";
import classes from "../AdminCss/AddCourse.module.css";
import app from "../../../firebase.js";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from "@firebase/auth";

function AddCourse() {
  const [formValues, setFormValues] = useState([
    { course: "", subject: "", subjectcode: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { course: "", subject: "", subjectcode: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    try {
      const db = getDatabase(app);
      for (const ele of formValues) {
        if (
          ele.course.trim().length === 0 ||
          ele.subjectcode.trim().length === 0 ||
          ele.subject.trim().length === 0
        ) {
          throw new Error("BOX CANNOAT REMAIN EMPTY");
        }
        console.log(ele.course);
        set(ref(db, `SUBJECT/${ele.course}/${ele.subjectcode}/`), {
          value: ele.subjectcode,
          label: ele.subject,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.form_input}>
        <form onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className={classes.form_inline} key={index}>
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={element.name}
                onChange={(e) => handleChange(index, e)}
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={element.email}
                onChange={(e) => handleChange(index, e)}
              />
              <label>Subject Code</label>
              <input
                type="text"
                name="subjectcode"
                value={element.email}
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <button
                  type="button"
                  className={classes.remove}
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <div className={classes.button_section}>
            <button
              className={classes.button}
              type="button"
              onClick={() => addFormFields()}
            >
              Add
            </button>
            <button className={classes.submit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
