import React, {useContext, useState} from "react";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {getAuth, GoogleAuthProvider, signInWithPopup ,getAdditionalUserInfo} from "firebase/auth";
import ModalView from "../Model/ModalView";
import {AuthContext} from "../auth-context";


function MainNavigation(){

    const Authc =useContext(AuthContext);

    const [errMessage,setErrMessage] = useState();

    const login = (e) => {
        const role = e.target.id;
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = user.accessToken;
                const name = user.displayName;
                const email = user.email;
                const userid = user.uid;
                const isNewUser = getAdditionalUserInfo(result).isNewUser;

                if(isNewUser){
                    auth.currentUser.delete();
                    throw new Error("USER IS INVALID");
                }

                Authc.login(token, userid, name, role);

            }).catch((error) => {
            if(error.message === "USER IS INVALID")setErrMessage(error.message);
            else setErrMessage("AUTHENTICATION FAILED")
        });
    }

    const onClear = () =>{
        setErrMessage(null);
    }

         return(
             <div className="mainNav">
                 {errMessage ? <ModalView message={errMessage} clear={onClear}/> : <></>}
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">SUVIDHA</Navbar.Brand>
                    { Authc.isLoggedIn &&  Authc.role === "admin" && <Nav className="me-auto">
                        <Nav.Link href="/addstudent">Add Student</Nav.Link>
                        <Nav.Link href="/addresult">Add Result</Nav.Link>
                        <Nav.Link href="/addcourse">Add Course</Nav.Link>
                    </Nav> }
                    { Authc.isLoggedIn && Authc.role === "student" && <Nav className="me-auto">
                        <Nav.Link href="/result">Result</Nav.Link>
                    </Nav> }
                    {!Authc.isLoggedIn &&  <Nav>
                        <NavDropdown title="LOGIN" id="nav-dropdown">
                            <div onClick={login}><NavDropdown.Item eventKey="4" id="student">Login As Student</NavDropdown.Item></div>
                            <NavDropdown.Divider />
                            <div onClick={login}><NavDropdown.Item eventKey="5" id="admin">Login As Admin</NavDropdown.Item></div>
                        </NavDropdown>
                    </Nav>}
                    { Authc.isLoggedIn && <NavDropdown title="LOGOUT" id="nav-dropdown">
                        <div onClick={Authc.logout}><NavDropdown.Item eventKey="4" id="student">Logout</NavDropdown.Item></div>
                    </NavDropdown>}
                </Container>
            </Navbar>
             </div>
         );
}

export default MainNavigation;