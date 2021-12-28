import RegisterNewStudent from "./RegisterNewStudent";
import classes from "../AdminCss/AdminView.module.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AddCourse from "./AddCourse";
import AddStudentResult from "./AddStudentResult";
function AdminView() {
  return (
    <Router>
      <div className={classes.admin}>
        <div className={classes.admin_top}>
          <div className={classes.logo}>
            <h2>
              <span style={{ color: "aliceblue" }}>STUDENT PORTAL</span>
            </h2>
          </div>
          <div className={classes.sideTop}>
            <div className={classes.one}>
              <Link to="/Admin/Registration" style={{ textDecoration: "none" }}>
                <h3>
                  <span style={{ color: "aliceblue" }}>+STUDENT</span>
                </h3>
              </Link>
            </div>
            <div className={classes.one}>
              <Link to="/Admin/AddCourse" style={{ textDecoration: "none" }}>
                <h3>
                  <span style={{ color: "aliceblue" }}>+COURSE</span>
                </h3>
              </Link>
            </div>
            <div className={classes.one}>
              <Link
                to="/Admin/AddStudentResult"
                style={{ textDecoration: "none" }}
              >
                <h3>
                  <span style={{ color: "aliceblue" }}>+RESULT</span>
                </h3>
              </Link>
            </div>
            <div className={classes.one}>
              <Link
                to="/Logout"
                style={{ textDecoration: "none", color: "aliceblue" }}
              >
                <h3>
                  <span>LOGOUT</span>
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path="/Admin/Registration"
            component={RegisterNewStudent}
          ></Route>
          <Route exact path="/Admin/AddCourse" component={AddCourse}></Route>
          <Route
            exact
            path="/Admin/AddStudentResult"
            component={AddStudentResult}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}
export default AdminView;
