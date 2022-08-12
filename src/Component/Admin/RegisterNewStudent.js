import { useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase.js";
import "bootstrap/dist/css/bootstrap.css";
import { FiPhone, FiUser } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import ModalView from "../Model/ModalView"
import Reg from "../../images/undraw_graduation_re_gthn.svg"
import './RegisterNewStudent.css'

function RegisterNewStudent() {
  let history = useNavigate();
  const [errMessage, setErrMessage] = useState(null);

  const [Newstudent, setNewStudent] = useState({
    name: "",
    fathername: "",
    mobileno: "",
    universityno: "",
    course: "",
    branch: "",
    sem: "",
    startdate: "",
    enddate: "",
    email: "",
    address: "",
  });
  const inputHandler = (e) => {
    setNewStudent({...Newstudent, [e.target.name]: e.target.value});
  };

  const sendData = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getDatabase(app);

    let originalUser = auth.currentUser;
    console.log(originalUser);

    createUserWithEmailAndPassword(auth, Newstudent.email, Newstudent.universityno).then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;
      console.log(user);
      set(ref(db, `${userId}/STUDENT_DETAILS`), {
        ...Newstudent,
      }).then((r) => {
      });
      set(ref(db, `${Newstudent.universityno}`),{
          uid: userId,
      }).then((r)=>{

      });
      auth.updateCurrentUser(originalUser).then((r) => {
      });
        history("/");
    }).catch((error) => {
        console.log(error.message);
        setErrMessage("Invalid Email or Password")
    })
  };

  if (errMessage) {
    return (
        <div>
          <ModalView message={errMessage}/>
        </div>
    );
  } else {
    return (
        <div className="reg">
          <h2>Registration</h2>
                   <img src={Reg}/>
                   <form>
                <div className="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                <FiUser/>
              </span>
                  <input
                      className="form-control"
                      aria-describedby="basic-addon1"
                      aria-label="Student Name"
                      name="name"
                      type="text"
                      onChange={inputHandler}
                      placeholder="Student Name"
                      value={Newstudent.name}
              ></input>
              <span class="input-group-text" id="basic-addon1">
            <FiUser/>
          </span>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Father Name"
                  name="fathername"
                  type="text"
                  placeholder="Father Name"
                  onChange={inputHandler}
                  value={Newstudent.fathername}
              ></input>
            </div>

            <div className="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={inputHandler}
                  value={Newstudent.email}
              ></input>
              <span class="input-group-text" id="basic-addon1">
            <FiPhone/>
          </span>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Mobile No"
                  name="mobileno"
                  type="text"
                  placeholder="Mobile No"
                  onChange={inputHandler}
                  value={Newstudent.mobileno}
              ></input>
            </div>

            <div className="input-group mb-3">
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Uniiversity No"
                  name="universityno"
                  type="text"
                  onChange={inputHandler}
                  placeholder="University Roll No"
                  value={Newstudent.universityno}
              ></input>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Course"
                  name="course"
                  type="text"
                  placeholder="Course"
                  onChange={inputHandler}
                  value={Newstudent.course}
              ></input>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Branch"
                  name="branch"
                  type="text"
                  placeholder="Branch"
                  onChange={inputHandler}
                  value={Newstudent.branch}
              ></input>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Semester"
                  name="sem"
                  type="text"
                  placeholder="Semester"
                  onChange={inputHandler}
                  value={Newstudent.sem}
              ></input>
            </div>
            <div className="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <FaHome/>
          </span>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  onChange={inputHandler}
                  value={Newstudent.address}
              ></input>
            </div>
            <div className="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            <BsCalendarDateFill/>
          </span>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="Start Date"
                  name="startdate"
                  type="text"
                  onChange={inputHandler}
                  placeholder="Start Date dd/mm/yyyy"
                  value={Newstudent.startdate}
              ></input>
              <span class="input-group-text" id="basic-addon1">
            <BsCalendarDateFill/>
          </span>
              <input
                  className="form-control"
                  aria-describedby="basic-addon1"
                  aria-label="End Date"
                  name="enddate"
                  type="text"
                  onChange={inputHandler}
                  placeholder="End date (dd/mm/yyyy)"
                  value={Newstudent.enddate}
              ></input>
            </div>
            <button type="submit" class="btn btn-dark" onClick={sendData}>
              Register
            </button>
          </form>
          </div>
    );
  }
}
export default RegisterNewStudent;
