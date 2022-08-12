import { useState, useRef } from "react";
import Select from "react-select";
import './SubjectResult.css'

function SubjectResult(props) {
  const subjects = props.subjectArray;
  console.log(subjects);
  const type = [
    { label: "Mid Term", value: "Mid" },
    { label: "End Term", value: "End" },
  ];
  const Marks = useRef("");
  const [Subject, setSubject] = useState("");
  const [Code, setCode] = useState("");
  const [Type, setType] = useState("");

  const handleSelect = (event) => {
    setSubject(event.label);
    setCode(event.value);
  };

  const handleType = (event) => {
    setType(event.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const SubjectInfo = {
      Code: Code,
      Subject: Subject,
      Marks: Marks.current.value,
      Type: Type,
    };
    Marks.current.value = "";
    props.handle(SubjectInfo);
  };

  return (
    <div className="subject_result">
      <form onSubmit={handleSubmit} className="subjectResult_form">
        <Select
          options={subjects}
          onChange={handleSelect}
          placeholder="Subject"
        ></Select>
        <Select
          onChange={handleType}
          placeholder="Exam Type"
          options={type}
        ></Select>
        <div>
          <input
            type="text"
            ref={Marks}
            placeholder="Enter Marks"
            className="marks_Inputbox"
          ></input>
        </div>
        <button type="submit" className="btn ">
          submit
        </button>
      </form>
    </div>
  );
}
export default SubjectResult;
