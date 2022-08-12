import { getDatabase, ref, set, get, child } from "firebase/database";
import {useEffect, useState,useContext} from "react";
import app from "../../../firebase.js";
import StudentView from "./StudentView.js";
import{AuthContext} from "../../auth-context";

function Student() {
  const Authc = useContext(AuthContext);
  const [TotalSem, SetTotalSem] = useState([]);
  const [UniversityRollNo, setNewUniversityRollNo] = useState("");

    useEffect(()=>{
      const Array = [];
      const db = ref(getDatabase(app));
      get(child(db, `${Authc.userId}/result`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              Array.push(snapshot.val());
              SetTotalSem(Array);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },[Authc.userId]);


  return (
    <div>
      {TotalSem.length > 0 ? <StudentView res={TotalSem} /> : null}
    </div>
  );
}
export default Student;
