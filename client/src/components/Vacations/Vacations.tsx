import axios from "axios";
import { useState, useContext, useEffect } from "react";
import VacationsCard from "./VacationsCard/VacationsCard";
import { Row } from "react-bootstrap";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/appState";
import IVacations from "../../Models/IVacations";
import { ActionType } from "../../redux/action-type";
import { SocketContext } from "../../Context/socket-container";
import './vacations.css'

function Vacations() {                                       //register with "admin" User Name for site administrator creation
  let navigate = useNavigate();
  let currentUserDetails = useSelector((state: AppState) => state.currentUserDetails);
  let currentUserName = currentUserDetails.userName;
  let currentUserType = currentUserDetails.userType;
  let currentVacations = useSelector((state: AppState) => state.vacations);
  let dispatch = useDispatch();
  let socket = useContext(SocketContext);
  let [updatesPopUpLabelVisibility, setUpdatesPopUpLabelVisibility] = useState("updates-pop-up-button-style");
  let [updatedVacationDestination, setUpdatedVacationDestination] = useState("");
  let currentToken = localStorage.getItem('token');


  useEffect(() => {
    if (currentUserType == "user") {
      userFollowedVacations()
    }
    loadSiteVacations()
    activeSocketUpdates()
  }, [])





  let userFollowedVacations = async () => {
    let userFollowedVacationsIds = new Array();
    try {
      let response = await axios.post("http://localhost:3001/users/userfollowedvacations", { currentToken });
      let userFollowedVacationsArray = response.data;
      if (userFollowedVacationsArray.length > 0) {
        userFollowedVacationsArray.map((vacationId) => {
          userFollowedVacationsIds.push(vacationId.followedVacationId)
        })
        dispatch({ type: ActionType.userFollowedVacationsArray, payload: { userFollowedVacationsIds } });
      } 
    }
    catch (error: any) {
      alert(error.message);
    }
  }


  let loadSiteVacations = async () => {
    try {
      let response = await axios.get("http://localhost:3001/vacations");
      let serverVacations = response.data as IVacations[];
      dispatch({ type: ActionType.getAllVacations, payload: { vacations: [] } });
      dispatch({ type: ActionType.getAllVacations, payload: { vacations: serverVacations } });
    }
    catch (error: any) {
      alert(error.message);
    }
  }


  let activeSocketUpdates = () => {
    if (socket && currentUserName != "admin" && currentUserName !="guest" ) {
      socket.on("refresh-vacations", (vacationDestination) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setUpdatesPopUpLabelVisibility("updates-pop-up-button-style show")
        setUpdatedVacationDestination(vacationDestination)
        userFollowedVacations()
        loadSiteVacations()
        setTimeout(() => {
          setUpdatesPopUpLabelVisibility("updates-pop-up-button-style")
        }, 10000)
      })
    }
  }




  let onAddVacationClick = () => {
    navigate('/AddVacation')
  }

  let onStatisticsClick = () => {
    navigate('/VacationsStatistics')
  }

  return (
    <>
      <label className={updatesPopUpLabelVisibility}>{updatedVacationDestination} Vacation Was Just Updated!</label>
      {currentUserType == "admin" && (<BsFillFileEarmarkPlusFill title="Create a New Vacation" onClick={onAddVacationClick} className="addVacation-style" />)}
      {currentUserType == "admin" && (<GoGraph title="Vacations Followers Statistics" onClick={onStatisticsClick} className="addVacation-style" />)}
      <Row xs={1} md={3} lg={3} className="g-4">
        {currentVacations.map(vacation => (<VacationsCard key={vacation.id} vacation={vacation} />))}
      </Row>
    </>

  )
}


export default Vacations;



