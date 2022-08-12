import React, {useCallback,useState,useEffect} from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainNavigation from "./Component/Navigation/MainNavigation";
import RegisterNewStudent from "./Component/Admin/RegisterNewStudent";
import AddStudentResult from "./Component/Admin/AddStudentResult";
import AddCourse from "./Component/Admin/AddCourse";
import Home from "./Component/Home";
import {AuthContext} from "./Component/auth-context";
import Student from "./Component/Student/StudentJs/Student";
function App() {

    const [Token,setToken]=useState();
    const [userId,setUserId]=useState();
    const [name,setName]=useState();
    const [role, setRole] = useState();

    const login = useCallback((token,userid,name,role) => {
        setToken(token);
        setUserId(userid);
        setName(name);
        setRole(role);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId:userid,
                Token:token,
                userName: name,
                role: role,
            })
        )
    },[] );

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(()=>{
        const storeData = JSON.parse(localStorage.getItem("userData"));
        if(storeData && storeData.Token){
            login(storeData.Token,storeData.userId,storeData.userName, storeData.role);
        }
    },[login]);

  return (
      <AuthContext.Provider value={{
          isLoggedIn:!!Token,
          userId:userId,
          userName:name,
          role:role,
          login:login,
          logout:logout,
      }}>
        <MainNavigation/>
        <Router>
            <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/addstudent" element={<RegisterNewStudent/>} />
                    <Route path="/addresult" element={<AddStudentResult/>} />
                    <Route path="/addcourse" element={<AddCourse/>} />
                    <Route path="/result" element={<Student/>} />
            </Routes>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
