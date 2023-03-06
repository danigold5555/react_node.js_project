import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import Layout from "../Layout/Layout";
import SpinnerForVacations from "../Vacations/SpinnerForVacations";

function Logout() {
    let [loadedComponent, setLoadedComponent] = useState(<SpinnerForVacations />);
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        onLogout()
    }, [])

    let onLogout = async () => {
        let userFollowedVacationsIds = [];
        let currentToken = localStorage.getItem('token');
        await axios.post("http://localhost:3001/users/logout", { currentToken });
        localStorage.removeItem('token');
        dispatch({ type: ActionType.userFollowedVacationsArray, payload: { userFollowedVacationsIds } });
        navigate('/')
        setLoadedComponent(<Layout />)
    }

    return (
        <div className="logout">
            {loadedComponent}
        </div>
    )
}

export default Logout
