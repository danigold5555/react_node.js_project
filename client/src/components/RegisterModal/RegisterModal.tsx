import { Button} from "react-bootstrap"
import Modal from 'react-bootstrap/Modal'
import './RegisterModal.css'
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import axios from "axios";

//register with "admin" User Name for site administrator creation

function RegisterModal() {
    let navigate = useNavigate();
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userName, setUserName] = useState("");      //register with "admin" User Name for site administrator creation
    let [password, setPassword] = useState("");
    let [changedNameStyle, setNameStyle] = useState("input-style");
    let [changedLastName, setLastNameStyle] = useState("input-style");
    let [changedUserNameStyle, setUserNameStyle] = useState("input-style");
    let [changedPasswordStyle, setPasswordStyle] = useState("input-style");

    let onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        setNameStyle("input-style");
    }

    let onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        setLastNameStyle("input-style");
    }

    let onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let lowerCasedUserName = event.target.value.toLowerCase();
        setUserName(lowerCasedUserName);
        setUserNameStyle("input-style");
    }

    let onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordStyle("input-style");
    }

    let onRegisterMissingFields = (() => {
        throw new Error("All Fields Must be Filled ");
    })

    let onCancelClick = (() => {
        navigate('/')
    })

    let onSaveClick = async () => {
        try {
            registrationValidations()
            let userRegistrationData = { firstName, lastName, userName, password };
            await axios.post("http://localhost:3001/users/register", userRegistrationData)
            alert("You Have Registered Successfully!");
            navigate('/LoginModal');
        }
        catch (error: any) {
            alert(error.message);
        }
    }

    let registrationValidations = (() => {
        if (firstName == "") {
            setNameStyle("red-input-validation");
            onRegisterMissingFields()
        }


        if (lastName == "") {
            setLastNameStyle("red-input-validation");
            onRegisterMissingFields()
        }

        if (userName == "") {
            setUserNameStyle("red-input-validation");
            onRegisterMissingFields()
        }

        if (password == "") {
            setPasswordStyle("red-input-validation");
            onRegisterMissingFields()
        }

        if (password.length < 8) {
            setPasswordStyle("red-input-validation");
            throw new Error("Password Must Contain at least 8 Characters")
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
                                <Modal.Title className="register-header">Please Register!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row-style">
                                    <label className="register-label-style">First Name:</label>
                                    <input className={changedNameStyle} type="text" name="" id="" onChange={onNameChanged} required maxLength={10} />
                                </div>
                                <div className="row-style">
                                    <label className="register-label-style">Last Name:</label>
                                    <input className={changedLastName} type="text" name="" id="" onChange={onLastNameChanged} required maxLength={10} />
                                </div>
                                <div className="row-style">
                                    <label className="register-label-style">User Name:</label>
                                    <input className={changedUserNameStyle} type="text" name="" id="" onChange={onUserNameChanged} required maxLength={10} />
                                </div>
                                <div className="row-style">
                                    <label className="register-label-style">Password:&nbsp;&nbsp;</label>
                                    <input className={changedPasswordStyle} type="password" name="" id="" onChange={onPasswordChanged} required maxLength={10} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={onCancelClick} variant="secondary">Cancel</Button>
                                <Button onClick={onSaveClick} variant="primary">Register</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default RegisterModal