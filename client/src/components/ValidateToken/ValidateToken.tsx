import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ConnectContext } from "../../Context/socket-container";
import IUser from "../../Models/IUser";
import { ActionType } from "../../redux/action-type";
import SpinnerForVacations from "../Vacations/SpinnerForVacations";
import Vacations from "../Vacations/Vacations";

function ValidateToken() {                                    //register with "admin" User Name for site administrator creation
    let dispatch = useDispatch();
    let connect = useContext(ConnectContext);
    let [loadedComponent, setLoadedComponent] = useState(<SpinnerForVacations />);

    useEffect(() => {
        checkCurrentToken()
    }, [])


    let checkCurrentToken = async () => {
        let currentToken = localStorage.getItem('token');
        if (currentToken == null) {
            loginAsGuest()
        }
        else {
            try {
                let response = await axios.post("http://localhost:3001/users/usertype", { currentToken })
                let userLoggedInDetails = response.data.loggedInUserDetails;
                let userType = response.data.userType;
                connect(currentToken);
                axios.defaults.headers.common['Authorization'] = currentToken;
                updateCurrentUser(userLoggedInDetails, userType)
            }
            catch (error: any) {
                alert(error.message);
                localStorage.removeItem('token');
                loginAsGuest()
            }
        }
    }

    let loginAsGuest = () => {
        let userType = "guest";
        let guestDetails = {
            userId: 0,
            userName:"guest",
            userType: userType,
            isSiteLoggedin: 1
        }
        updateCurrentUser(guestDetails, userType)
    }


    let updateCurrentUser = (userDetails: IUser, userType: string) => {
        let currentUserDetails = {
            userId: userDetails.userId,
            userName: userDetails.userName,
            userType: userType,
            isSiteLoggedin: 1
        }
        dispatch({ type: ActionType.currentUserDetails, payload: { currentUserDetailsObject: currentUserDetails } });
        loadVacationsComponent()
    }


    let loadVacationsComponent = () => {
        setTimeout(() => {
            setLoadedComponent(<Vacations />)
        }, 2000)
    }


    return (
        <div className="validateToken">
            {loadedComponent}
        </div>
    )
}

export default ValidateToken;



