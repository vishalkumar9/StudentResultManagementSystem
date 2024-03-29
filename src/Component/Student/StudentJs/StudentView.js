import {useContext, useState} from "react";
import CreateResultTable from "./CreateResultTable.js";
import Table from "react-bootstrap/Table";
import { getDatabase, ref, set, get, child } from "firebase/database";
import app from "../../../firebase.js";
import {AuthContext} from "../../auth-context";
import "../StudentCss/StudentView.css"

function StudentView(props) {

  const Authc = useContext(AuthContext);

  console.log(props.res);
  const keys = Object.keys(props.res[0]);
  const [ResultArray, setNewResultArray] = useState([]);
  const [flag, setFlag] = useState(false);
  const getData = (e, key) => {
    console.log(key);
    const Array = [];
    e.preventDefault();
    console.log(e.target.name);
    const db = ref(getDatabase(app));
    get(child(db, `${Authc.userId}/result/${e.target.name}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          Array.push(snapshot.val());
          setNewResultArray(Array);
        } else {
          alert("no data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="result_table">
      <Table stripped bordered hover size="sm" style={{color : "aliceblue"}}>
        <thead>
          <tr>
            <th>Semester</th>
            <th>View Result</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr>
              <td>{key}</td>
              <td>
                <button name={key} onClick={getData}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {console.log(ResultArray.length)}
      {ResultArray.length > 0 ? (
        <CreateResultTable ResultData={ResultArray} />
      ) : flag === true && ResultArray.length <= 0 ? (
        <div>
          <h1>Result Not Found</h1>
        </div>
      ) : null}
    </div>
  );
}
export default StudentView;
