import './Header.css'
import { ImExit } from "react-icons/im";
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/appState';
import { useNavigate } from 'react-router-dom';


function Header() {
    let currentUserDetails = useSelector((state: AppState) => state.currentUserDetails);
    let currentUserType = currentUserDetails.userType;
    let currentUserName = currentUserDetails.userName;
    let navigate = useNavigate()

    let onLogoutClick =  () => {
         navigate('/Logout')
    }

    return (
        <div className="header">
            <h5 className='user-hello-title'>Hello {currentUserName}!</h5>
            {(currentUserType == "admin" || currentUserType == "user") && (<ImExit onClick={onLogoutClick} className="logout-icon" title="Logout" />)}
        </div>
    )
}

export default Header