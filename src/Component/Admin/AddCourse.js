import React, { useState } from "react";
import app from "../../firebase.js";
import { getDatabase, ref, set} from "firebase/database";
import "./AddCourse.css"

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
    <div className="course_div">
      <div className="course_subdiv">
        <form onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div key={index} className="course_insideform_div">
              <input
                type="text"
                name="course"
                className="course_input_box"
                value={element.name}
                placeholder="Course"
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                name="subject"
                className="course_input_box"
                value={element.email}
                placeholder="Subject"
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                name="subjectcode"
                className="course_input_box"
                value={element.email}
                placeholder="Subject Code"
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <button
                  type="button"
                  className="btn btn2"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <div className="two_btn">
            <button
              type="button"
              className="btn btn1"
              onClick={() => addFormFields()}
            >
              Add
            </button>
            <button type="submit" className="btn btn2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
