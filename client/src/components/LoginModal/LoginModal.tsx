import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import '../RegisterModal/RegisterModal.css'

function LoginModal() {
    let navigate = useNavigate();
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [changedUserNameStyle, setUserNameStyle] = useState("input-style");
    let [changedPasswordStyle, setPasswordStyle] = useState("input-style");

    let onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let lowerCasedUserName = event.target.value.toLowerCase();
        setUserName(lowerCasedUserName);
        setUserNameStyle("input-style");
    }

    let onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordStyle("input-style");
    }

    function onLoginMissingFields() {
        throw new Error("All Fields are Required")
    }

    let onRegisterClick = () => {
        navigate('/RegisterModal');
    }


    let onCancelClick = () => {
        navigate('/');
    }

    let OnSaveClick = async () => {
        try {
            loginValidations()
            let userLoginData = { userName, password };
            let response = await axios.post("http://localhost:3001/users/login", userLoginData);
            let serverResponse = response.data.successfulLoginResponse;
            let token = 'Bearer ' + serverResponse;
            localStorage.setItem('token', token);
            navigate('/');
        }
        catch (error: any) {
            alert(error.message);
        }
    }

    let loginValidations = (() => {
        if (userName == "") {
            setUserNameStyle("red-input-validation");
            onLoginMissingFields();
        }

        if (password == "") {
            setPasswordStyle("red-input-validation");
            onLoginMissingFields();
        }

        if (password.length < 8) {
            setPasswordStyle("red-input-validation");
            throw new Error("Password Must Contain at least 8 Characters");
        }
    })

    return (
        <section className="layout">
            <header>
                <Header />
            </header>
            <main>
                <div className="registerModal">
                    <div className="modal-position">
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title className="register-header">Please Login!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row-style">
                                    <label className="register-label-style">User Name:</label>
                                    <input className={changedUserNameStyle} type="text" onChange={onUserNameChanged} required maxLength={10} />
                                </div>
                                <div className="row-style">
                                    <label className="register-label-style">Password:&nbsp;&nbsp;</label>
                                    <input className={changedPasswordStyle} type="password" onChange={onPasswordChanged} required maxLength={10} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={onCancelClick} variant="secondary">Cancel</Button>
                                <Button onClick={OnSaveClick} variant="primary">Login</Button>
                                <h5 className="register-label">Haven't Registered Yet? Please <span className="register-link" onClick={onRegisterClick}>Register!</span></h5>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
            </main>
        </section>
    )


}

export default LoginModal